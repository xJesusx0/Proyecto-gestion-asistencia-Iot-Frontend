document.addEventListener('DOMContentLoaded',() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    console.log(userId)
    getUserData(userId)
});

const getUserData = (userId) => {
    const url = `${config.baseUrl}/admin/get-user-data?id=${userId}`;
    console.log(url);
    request('GET',url)
    .then(response => {
        console.log(response);
    })
}