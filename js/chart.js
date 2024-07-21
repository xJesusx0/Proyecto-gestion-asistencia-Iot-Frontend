document.addEventListener('DOMContentLoaded', () => {
    usersRolesChart();
    weekdayAttendances();
    studentsByGroup()
});
const studentsByGroup = () => {
    const url = `${config.baseUrl}/admin/count-students-by-group`;
    request('GET', url)
        .then(response => {
            console.log(response)
            console.log(response)
            var labels = [];
            var values = [];
            response.forEach(element => {
                labels.push(element['id_grupo']);
                values.push(element['cantidad_estudiante'])
            })

            console.log(labels);
            console.log(values);
            barChart(labels,
                values,
                'students-group',
                [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],

            )
        })
}

const weekdayAttendances = () => {
    const url = `${config.baseUrl}/admin/get-weekday-attendances`
    request('GET', url)
        .then(response => {
            console.log(response)
            var labels = [];
            var values = [];
            var totalAttendances = 0;
            response.forEach(element => {
                labels.push(element['dia_semana']);
                values.push(element['cantidad_asistencias'])
                totalAttendances += element['cantidad_asistencias']
            })

            console.log(labels);
            console.log(values);
            barChart(labels,
                values,
                'weekday-attendances',
                [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],

            )

            barChart(['cantidad total de asistencias'],
                [totalAttendances],
                'total-attendances',
                'rgba(153, 102, 255, 0.2)'
            )
        })
}

const barChart = (labels, values, id, backgrounds) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Asistencias',
            data: values,
            backgroundColor: backgrounds,
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, config);
};

const usersRolesChart = () => {
    const url = `${config.baseUrl}/admin/get-count-roles`;
    console.log(url)
    request('GET', url)
        .then(response => {
            console.log(response)

            const estudiantes = response.estudiantes;
            const profesores = response.profesores;
            const administradores = response.administradores;
            const total = response.usuarios;

            const labels = ['Estudiantes', 'Profesores', 'Administradores'];
            const values = [estudiantes, profesores, administradores]

            document.getElementById('total-users').innerHTML += total

            circleChart(labels, values)
        });
}

const circleChart = (labels, values) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Cantidad de usuarios por rol',
            backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192,1)'],
            borderColor: 'white',
            borderWidth: 0.5,
            data: values
        }]
    };

    const chartConfig = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Cantidad de usuarios por rol'
                }
            }
        },
    };

    var ctx = document.getElementById('users-roles').getContext('2d');
    var myChart = new Chart(ctx, chartConfig);
}