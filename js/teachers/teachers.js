document.addEventListener('DOMContentLoaded', () => {
    const url = `${config.baseUrl}/teachers/get-teacher-groups`;
    console.log(userData)
    document.getElementById('welcomeUser').innerHTML += ` ${userData['names']} 🌟`

    request('GET', url)
    .then(response => {
        console.log(response)
        const cardsContainer = document.getElementById('cards-container');

        response.forEach(group => {
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
                { label: 'Nombre', value: group.nombre },
                { label: 'ID del grupo', value: group.id_grupo },
                { label: 'Día de la semana', value: group.dia_semana },
                { label: 'Período', value: group.periodo }
            ];

            details.forEach(detail => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
                infoContainer.appendChild(listItem);
            });

            cardBody.appendChild(infoContainer);

            const button = document.createElement('a');
            button.href = `group-info.html?group_id=${group.id_grupo}&module_id=${group.id_modulo}&period=${group.periodo}`;
            button.classList.add('btn', 'btn-primary','me-4');
            button.textContent = 'Ver más información del grupo';
            cardBody.appendChild(button);

            const attendancesButton = document.createElement('a');
            attendancesButton.href = `set-attendance.html?group_id=${group.id_grupo}&module_id=${group.id_modulo}&period=${group.periodo}`;
            attendancesButton.classList.add('btn', 'btn-primary','me-4');
            attendancesButton.textContent = 'Gestionar asistencias';
            cardBody.appendChild(attendancesButton);

            const justificationsButton = document.createElement('a');
            justificationsButton.href = `fails.html?group_id=${group.id_grupo}&module_id=${group.id_modulo}&period=${group.periodo}`;
            justificationsButton.classList.add('btn', 'btn-primary');
            justificationsButton.textContent = 'Ver justificaciones';
            cardBody.appendChild(justificationsButton);

            card.appendChild(cardBody);

            cardsContainer.appendChild(card);
        });

    })
})