document.addEventListener('DOMContentLoaded',() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');

    console.log(userId)
    const url = `${config.baseUrl}/admin/get-user-data?id=${userId}`;

    request('GET',url)
    .then(response => {
        console.log(response);
        displayUserData(response['user_info'][0])
        displayRoles(response['user_roles'])
        displayGroups(response['groups'])
    })
});

const updateValues = () => {
    const id = document.getElementById('id-text').textContent;

    const newNames = document.getElementById('nombres').value;
    const newLastNames = document.getElementById('apellidos').value;
    const newMail = document.getElementById('correo').value;
    const newPhone = document.getElementById('telefono').value;

    if (!newNames || !newLastNames || !newMail || !newPhone) {
        alert('Todos los campos deben ser completados.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newMail)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(newPhone)) {
        alert('Por favor, ingresa un número de teléfono válido (10 dígitos).');
        return;
    }

    const data = {
        'id': id,
        'nombres': newNames,
        'apellidos': newLastNames,
        'correo': newMail,
        'telefono': newPhone,
    };

    const url = `${config.baseUrl}/admin/update-user`
    request('PUT',url,data)
    .then(response => {
        if (response.success){
            alert(response.success)
            location.reload()
            return;
        }
        alert(response.error)
    })
}

const displayUserData = (data) =>{
    document.getElementById('id-text').innerHTML += data.id_usuario
    document.getElementById('nombres').value = data.nombres;
    document.getElementById('apellidos').value = data.apellidos;
    document.getElementById('correo').value = data.correo;
    document.getElementById('telefono').value = data.numero_telefonico;
}

const displayRoles = (roles) => {
    const rolesContainer = document.getElementById('roles');

    roles.forEach(rol => {
        rolesContainer.innerHTML += `
        <strong>Rol:</strong> ${rol.nombre}<br>
    `
    })
}

const displayGroups = (groups) => {
    const groupContainer = document.getElementById('groups-container')
    groups.forEach(group => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        card.appendChild(cardHeader);

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = 'Información del grupo';
        cardHeader.appendChild(cardTitle);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const infoContainer = document.createElement('ul');
        infoContainer.classList.add('list-unstyled');

        const details = [
            { label: 'ID del grupo', value: group.id_grupo },
            { label: 'Día de la semana', value: group.dia_semana },
            { label: 'Período', value: group.periodo },
            { label: 'ID del modulo', value: group.id_modulo}
        ];

        details.forEach(detail => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
            infoContainer.appendChild(listItem);
        });

        cardBody.appendChild(infoContainer);

        card.appendChild(cardBody);

        groupContainer.appendChild(card);
    });
}