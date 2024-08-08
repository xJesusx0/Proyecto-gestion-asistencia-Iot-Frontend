const getUrlParams = () => {
    const url = new URL(window.location.href);

    const params = new URLSearchParams(url.search);

    const groupId = params.get('group_id');
    const moduleId = params.get('module_id');
    const period = params.get('period');

    const data = {
        'group_id':groupId,
        'module_id':moduleId,
        'period':period
    };

    return data;
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = getUrlParams();

    getStudents(urlParams.group_id,urlParams.module_id,urlParams.period);

    getAttendances(urlParams.group_id,urlParams.module_id,urlParams.period)
}); 


const getStudents = (groupId,moduleId,period) => {
    const url = `${config.baseUrl}/teachers/get-students-without-attendance-by-group?group_id=${groupId}&module_id=${moduleId}&period=${period}`
    request('GET',url)
    .then(response => {
        console.log(response)

        const container = document.getElementById('students-container');

        response.forEach(student => {
            const studentContainer = document.createElement('div');
            studentContainer.classList.add('student-item');
    
            const fullname = document.createElement('div');
            fullname.innerHTML = `${student.nombres} ${student.apellidos}`;
            studentContainer.appendChild(fullname);
    
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = student.id_estudiante; 
    
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.innerHTML = ' -Seleccionar';
    
            studentContainer.appendChild(checkbox);
            studentContainer.appendChild(label);
    
            container.appendChild(studentContainer);
        }); 
   });
}

const setAttendance = () =>{
    const selectedStudents = Array.from(document.querySelectorAll('.student-item input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);
    
    const urlParams = getUrlParams();
    const url = `${config.baseUrl}/teachers/set-group-attendance`
    const data = {
        'group_info':urlParams,
        'students':selectedStudents
    }
    request('POST',url,data)
    .then(response => {
        console.log(response) 
       alert('Operacion realizada correctamente')
       window.location.reload(); 
    }) 
}

const setFail = () => {
    console.log('Hola');

    const url = `${config.baseUrl}/teachers/set-group-fails`;
    const groupInfo = getUrlParams();
    
    const data = {
        'group_info':groupInfo
    }

    console.log(groupInfo) 
    request('POST',url,data)
    .then(response => {
        if(response.response == 'ok'){
            alert('Operacion realizada correctamente')
        }
        window.location.reload();
        console.log(response)
    })
}

const getReport = async () => {
    try {
        const groupInfo = getUrlParams(); 
        const url = `${config.baseUrl}/teachers/generate-report`;
        const token = localStorage.getItem('access_token');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupInfo)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const filename = 'report.csv'; 

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error fetching report:', error);
    }
};


const getAttendances = (groupId,moduleId,period) => {

    const _url = `${config.baseUrl}/teachers/get-day-attendances?group_id=${groupId}&module_id=${moduleId}&period=${period}`
    request('GET',_url)
    .then(response => {
        console.log(response)
        const tableBody = document.getElementById('table-body')
        response.forEach(attendance => {
            const row = document.createElement('tr')
    
            const idCell = document.createElement('td')
            idCell.textContent = attendance.id_estudiante
            row.appendChild(idCell)
    
            const nameCell = document.createElement('td')
            nameCell.textContent = attendance.nombres
            row.appendChild(nameCell)
    
            const lastnameCell = document.createElement('td')
            lastnameCell.textContent = attendance.apellidos
            row.appendChild(lastnameCell)
    
            const timeCell = document.createElement('td')
            timeCell.textContent = attendance.hora_llegada
            row.appendChild(timeCell)
    
            tableBody.appendChild(row)
        });
    })
}

