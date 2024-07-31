document.addEventListener('DOMContentLoaded', () => {
    getFails()
})

const sendJustification = () => {
    const failsContainer = document.getElementById('fails-container');
    const selectedValue = failsContainer.value;
    console.log(selectedValue)
}

const getFails = () => {
    const url = `${config.baseUrl}/students/get-student-fails`;

    request('GET',url)
    .then(response => {
        console.log(response)
        const failsContainer = document.getElementById('fails-container');
        response.forEach(fail => {
            const option = document.createElement('option');
            const uniqueValue = `${fail.id_estudiante},${fail.id_grupo},${fail.id_modulo},${fail.periodo},${fail.fecha}`;
            option.setAttribute('value', uniqueValue);

            option.textContent = `${fail.nombre} (${fail.fecha})`;
            
            failsContainer.appendChild(option);
        })

    })
}

const sendFile = () => {
    const url = `${config.baseUrl}/students/set-justification`
    const formData = new FormData();
    const fileField = document.getElementById('file');

    const failsContainer = document.getElementById('fails-container');
    const selectedValue = failsContainer.value;

    const textareaField = document.getElementById('message');
    
    formData.append('file', fileField.files[0]);
    formData.append('fail-id',selectedValue);
    formData.append('message',textareaField.value)
    
    const token = localStorage.getItem('access_token')

    fetch(url, {
        headers: {
        'Authorization': `Bearer ${token}`
    },
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data['response']){
            alert('Archivo subido correctamente')
            return;
        }

        alert(data['error'])
        console.log(data)
    })
    .catch(error => {
        alert(error.error);
    });
}