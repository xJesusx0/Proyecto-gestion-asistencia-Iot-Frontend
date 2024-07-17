fetch(window.jsonRoutes.studentsData)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo leer el archivo JSON')
        }

        return response.json();
    })

    .then(data => {

        data = data['0']

        const userId = userData.userId;
        console.log(userData.username)

        console.log(userId);
        console.log(data);
        student = data[userId];

        console.log(student['name'])
        document.getElementById('btnDesplegable').innerHTML = student['name']
        document.getElementById('program-container').innerHTML = `Programa: ${student['program']}`
        document.getElementById('period-container').innerHTML = `Cuatrimestre: ${student['period']} `

        fetch(window.jsonRoutes.failsData)
            .then(response => {
                return response.json();
            })

            .then(failsData => {

                const studentFails = failsData[student.id];
                
                const select = document.getElementById('inasistencia');
                studentFails.forEach(fail => {
                    const optionElement = document.createElement('option');
                    optionElement.value = fail.group;
                    optionElement.textContent = `${fail.course}, ${fail.date}`;
                    select.appendChild(optionElement);
                });
            })



    })

// const opciones = [
//     { valor: 'matematicas', texto: 'Paginas web' },
//     { valor: 'ciencias', texto: 'Programacion modular' },
//     { valor: 'historia', texto: 'Proyecto integrador' },
//     { valor: 'lengua', texto: 'Competencias Digitales' }
// ];

// // Obtener el elemento select
// const select = document.getElementById('inasistencia');

// // Generar opciones dinámicamente
// opciones.forEach(opcion => {
//     const optionElement = document.createElement('option');
//     optionElement.value = opcion.valor;
//     optionElement.textContent = opcion.texto;
//     select.appendChild(optionElement);
// });



