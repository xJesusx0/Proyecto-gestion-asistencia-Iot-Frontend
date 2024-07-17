
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
        document.getElementById('student-name').innerHTML += student['name']
        document.getElementById('btnDesplegable').innerHTML = student['name']
        document.getElementById('program-container').innerHTML = `Programa: ${student['program']}`
        document.getElementById('period-container').innerHTML = `Cuatrimestre: ${student['period']} `

        fetch(window.jsonRoutes.attendancesData)

            .then(response => {
                return response.json()
            })

            .then(attendancesData => {
                const studentAttendances = attendancesData[student.id]
                console.log(studentAttendances)

                let groupId = localStorage.getItem('groupData')
                groupId = String(groupId)
                console.log(groupId)
                
                console.log(studentAttendances[groupId])

                const tableBody = document.getElementById('table-body')

                studentAttendances["SIN_G1"].forEach(attendance => {
                    const row = document.createElement('tr') 

                    const groupCell = document.createElement('td')
                    groupCell.textContent = groupId
                    row.appendChild(groupCell)

                    const courseCell = document.createElement('td')
                    courseCell.textContent = attendance.course
                    row.appendChild(courseCell)

                    const dateCell = document.createElement('td')
                    dateCell.textContent = attendance.date
                    row.appendChild(dateCell)

                    const typeCell = document.createElement('td')
                    typeCell.textContent = attendance.type
                    row.appendChild(typeCell)

                    tableBody.appendChild(row)
                });
            })



    })

