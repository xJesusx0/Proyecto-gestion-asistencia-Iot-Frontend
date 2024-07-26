const logout = () => {
    const url = `${config.baseUrl}/auth/logout`;
    request('POST',url)
    .then(response => {
        localStorage.clear();
        window.location.href = 'login.html'
    })
}