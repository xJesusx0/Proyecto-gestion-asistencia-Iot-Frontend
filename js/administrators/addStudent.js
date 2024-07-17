const addStudent = (event) => {
    event.preventDefault();

    const selectedGroups = [];
    const checkboxes = document.querySelectorAll('#checkboxes-container input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedGroups.push(checkbox.value);
    });

    const username = document.getElementById('name-user').value;
    const password = document.getElementById('password-user').value;
    const documentId = document.getElementById('document-id').value;

    if (!username || !password || !documentId) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    console.log('Nombre de Usuario:', username);
    console.log('ID del Documento:', documentId);
    console.log('Grupos Seleccionados:', selectedGroups);

    let createdStudents = JSON.parse(localStorage.getItem('createdStudents')) || [];

    const student = {
        'name': username,
        'password': password,
        'id': documentId,
        'groups': selectedGroups,
        'role':'estudiante',
        'fails': 0
    };

    createdStudents.push(student);

    localStorage.setItem('createdStudents', JSON.stringify(createdStudents));

    alert('Usuario registrado correctamente')
};



fetch(window.jsonRoutes.coursesData)

    .then(response => {
        return response.json()
    })

    .then(coursesData => {
        const checkboxesContainer = document.getElementById('checkboxes-container')
        Object.values(coursesData.groups).forEach(group => {
            console.log(group);

            const checkboxContainer = document.createElement('div')
            checkboxContainer.classList.add('checkbox-container')

            const checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('name', group.groupId)
            checkbox.setAttribute('id', group.groupId)
            checkbox.setAttribute('value', group.groupId)
            checkboxContainer.appendChild(checkbox)

            const label = document.createElement('label')
            label.setAttribute('for', group.groupId)
            label.innerHTML = group.groupId
            checkboxContainer.appendChild(label)

            const br = document.createElement('br')
            checkboxesContainer.appendChild(br)

            checkboxesContainer.appendChild(checkboxContainer)

        });
    })

fetch(window.jsonRoutes.adminsData)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo leer el archivo JSON')
        }

        return response.json()
    })

    .then(data => {
        const admin = data[userData.userId]

        console.log(admin['name'])
        document.getElementById('btnDesplegable').innerHTML = admin['name']
        document.getElementById('welcomeUser').innerHTML += ` ${admin['name']} 🌟`


    })