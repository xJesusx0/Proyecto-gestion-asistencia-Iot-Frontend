const logout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('selectedGroup')
    const url = `${config.baseUrl}/auth/logout`;
    request('POST',url)
    .then(response => {
        window.location.href = 'login.html'
    })
}