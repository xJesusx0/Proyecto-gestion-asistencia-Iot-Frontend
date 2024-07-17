fetch('../../json/web-routes.json')
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data)
    window.routes = data;
})