document.addEventListener('DOMContentLoaded', () => {
    usersRolesChart();
    weekdayAttendances();
    studentsByGroup();
    countGroupsByModule();
    countFailsByModule();
    countFails();
});
const getRandomColorWithTransparency = (alpha = 0.2) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
//        "get-count-groups-by-module",
//        "get-count-fails-by-module",
//        "count-justificated-and-no-justifiacted-fails"
const countFails = () => {
    const url = `${config.baseUrl}/admin/count-justificated-and-no-justifiacted-fails`;

    request('GET', url)
        .then(jsonData => {
            console.log(jsonData)
            console.log(jsonData[0])
            console.log(jsonData[0]['inasistencias_justificadas'])
            const labels = ['Justificadas', 'No justificadas']
            values = [jsonData[0]['inasistencias_justificadas'], jsonData[0]['inasistencias_no_justificadas']]
            const backgrounds = [getRandomColorWithTransparency(), getRandomColorWithTransparency()];

            circleChart(labels, values, 'count-fails', backgrounds, 'Total de inasistencias');
        })
}
const countFailsByModule = () => {
    const url = `${config.baseUrl}/admin/get-count-fails-by-module`;

    request('GET', url)
        .then(jsonData => {
            console.log(jsonData)
            const labels = jsonData.map(item => item.modulo);
            const values = jsonData.map(item => item.total_inasistencias);

            const backgrounds = [getRandomColorWithTransparency(), getRandomColorWithTransparency()];

            barChart(labels, values, 'fails-by-group', backgrounds, 'Total de inasistencias');
        })
}
const countGroupsByModule = () => {
    const url = `${config.baseUrl}/admin/get-count-groups-by-module`;

    request('GET', url)
        .then(jsonData => {
            console.log(jsonData)
            const labels = jsonData.map(item => item.modulo);
            const values = jsonData.map(item => item.total_grupos);

            const backgrounds = [getRandomColorWithTransparency(), getRandomColorWithTransparency()];

            barChart(labels, values, 'groups-by-module', backgrounds, 'Total de Grupos');
        })
}

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
                    getRandomColorWithTransparency(),
                    getRandomColorWithTransparency(),
                    getRandomColorWithTransparency(),
                    getRandomColorWithTransparency()
                ],
                'Cantidad de estudiantes'

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
                    getRandomColorWithTransparency(),
                    getRandomColorWithTransparency(),
                    getRandomColorWithTransparency()
                ],
                'Asistencias por dia de semana'
            )

        })
}

const usersRolesChart = () => {
    const url = `${config.baseUrl}/admin/get-count-roles`;
    console.log(url)
    request('GET', url)
        .then(response => {
            console.log(response)

            const estudiantes = response.estudiantes;
            const profesores = response.profesores;
            const administradores = response.administradores;

            const labels = ['Estudiantes', 'Profesores', 'Administradores'];
            const values = [estudiantes, profesores, administradores]

            const backgrounds = [
                getRandomColorWithTransparency(),
                getRandomColorWithTransparency(),
                getRandomColorWithTransparency(),
            ]

            circleChart(labels, values, 'users-roles', backgrounds, 'Cantidad de usuarios por rol')
        });
}

const barChart = (labels, values, id, backgrounds, label) => {
    const data = {
        labels: labels,
        datasets: [{
            label: label,
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
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text:label 
                }
            }
        }
    };
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, config);
};

const circleChart = (labels, values, id, backgrounds, text) => {
    const data = {
        labels: labels,
        datasets: [{
            label: text,
            backgroundColor: backgrounds,
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
                    text: text
                }
            }
        },
    };

    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, chartConfig);
}