document.addEventListener('DOMContentLoaded', () => {
    const url = `${config.baseUrl}/teachers/get-teacher-groups`;
    console.log(userData)
    document.getElementById('welcomeUser').innerHTML += ` ${userData['names']} 🌟`

    request('GET',url)
    .then(response => {
        console.log(response)

        response.forEach(group => {
            console.log(group)
        })
        
    })
})