window.addEventListener('pageshow', (event) =>{
    const route = window.location.pathname.split('/').pop()
    const url = `${config.baseUrl}/auth/validate-role?url=${route}`
    request('GET',url)
    .then(response =>{
        console.log(response)
        if(!response['valid-role']){
            alert("estas intentando acceder con un rol invalido")
            localStorage.clear()
            window.location.href = 'login.html'
        }

        if(!response['valid-route']){
            alert("No tienes permitido el acceso a esta pagina")
            window.location.href = window.routes[userData.role][0]
        }
    })
});




