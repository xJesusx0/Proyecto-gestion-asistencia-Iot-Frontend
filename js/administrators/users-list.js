document.addEventListener('DOMContentLoaded',() => {
    getUsers();
})

const redirectToUserInfo = (userId) =>{
    window.location.href = `user-info.html?id=${userId}`;
}

const getUsers = () =>{
    const url = `${config.baseUrl}/admin/get-users`;
    request('GET',url)
    .then(response => {
        console.log(response)

        const table = document.getElementById('table-body');

        response.forEach(user => {
            console.log(user);
            const tableRow = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.innerHTML = user.id_usuario;
            tableRow.appendChild(idCell);

            const namesCell = document.createElement('td');
            namesCell.innerHTML = user.nombres;
            tableRow.appendChild(namesCell);

            const lastnamesCell = document.createElement('td');
            lastnamesCell.innerHTML = user.apellidos;
            tableRow.appendChild(lastnamesCell);

            const emailCell = document.createElement('td');
            emailCell.innerHTML = user.correo;
            tableRow.appendChild(emailCell);

            const numberCell = document.createElement('td');
            numberCell.innerHTML = user.numero_telefonico;
            tableRow.appendChild(numberCell);

            const actionsCell = document.createElement('td');

            const viewButton = document.createElement('button');
            viewButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg> ver'
            viewButton.classList.add('btn');
            viewButton.classList.add('btn-primary');
            viewButton.setAttribute('onclick',`redirectToUserInfo('${user.id_usuario}')`)
            actionsCell.appendChild(viewButton);

            tableRow.appendChild(actionsCell)
            table.appendChild(tableRow);
        });
    });
}