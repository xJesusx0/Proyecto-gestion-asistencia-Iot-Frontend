document.addEventListener('DOMContentLoaded', () => {
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
});


const circleChart = (labels, values) => {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Cantidad de usuarios por rol',
            backgroundColor: ['blue', 'green', 'orange'],
            borderColor: 'black',
            borderWidth: 0.5,
            data: values
        }]
    };

    const chartConfig = {
        type: 'doughnut',
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