
const sendFile = () => {
    const url = `${config.baseUrl}/students/set-justification`
    const formData = new FormData();
    const fileField = document.getElementById('file');

    formData.append('file', fileField.files[0]);

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