const getGroupInfo = (groupId, courseId) => {
    return fetch(window.jsonRoutes.coursesData)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo leer el archivo JSON de cursos');
            }
            return response.json();
        })
        .then(data => {
            const groups = data.groups;
            const group = groups[groupId];

            const courses = data.courses;
            const course = courses[courseId];

            // console.log(group);
            // console.log(course);
            // console.log(group['students']);

            return { group, course };
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const groupData = localStorage.getItem('groupData');
    const groupId = JSON.parse(groupData);

    getGroupInfo(groupId.groupId, groupId.courseId)
        .then(({ group, course }) => {
            const teacher = userData;
            // console.log(group, course);

            // document.getElementById('welcomeUser').innerHTML += ` ${teacher.username} 🌟`;
            document.getElementById('btnDesplegable').innerHTML = teacher.username
            document.getElementById('course-container').innerHTML += course.courseName
            document.getElementById('group-container').innerHTML += group.groupId

            const usersTableBody = document.getElementById('usersTableBody')

            console.log(group)

            group.students.forEach(student => {
                const row = document.createElement('tr')

                const nameCell = document.createElement('td')
                nameCell.textContent = student.name
                row.appendChild(nameCell)

                const failsCell = document.createElement('td')
                failsCell.textContent = student.fails
                row.appendChild(failsCell)

                const totalCell = document.createElement('td')
                totalCell.textContent = 10
                row.appendChild(totalCell)

                usersTableBody.appendChild(row)
            })


            const createdStudents = JSON.parse(localStorage.getItem('createdStudents')) || []

            if (createdStudents.length !== 0) {
                createdStudents.forEach(student => {

                    if (student.groups.includes(group.groupId)) {
                        const row = document.createElement('tr')

                        const nameCell = document.createElement('td')
                        nameCell.textContent = student.name
                        row.appendChild(nameCell)

                        const failsCell = document.createElement('td')
                        failsCell.textContent = student.fails
                        row.appendChild(failsCell)

                        const totalCell = document.createElement('td')
                        totalCell.textContent = 10
                        row.appendChild(totalCell)

                        usersTableBody.appendChild(row)

                    }

                })
            }

        })
});
