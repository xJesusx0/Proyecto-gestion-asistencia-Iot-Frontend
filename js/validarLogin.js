window.addEventListener('pageshow', (event) => {

    const localData = localStorage.getItem('userData');
    if (!localData){
        alert('Sesion invalida, inicia sesion nuevamente')
        window.location.href = 'login.html';
    }
        const url = `${config.baseUrl}/auth/validate-login`
        request('GET',url)
        .then(response => {  

            let loggedIn = response['response'];
            console.log(loggedIn)
            if (loggedIn !== true) {
                localStorage.removeItem('userData');
                window.location.href = 'login.html';
            }
            console.log(loggedIn)
        })
        .catch(error =>{
            console.log(error)
            alert('Ha ocurrido un error con el web token');
            localStorage.clear();
            window.location.href = 'login.html';

        })
});



