// console.log(route)
const route = window.location.pathname.split('/').pop()

if (route !== 'students-list.html') {
    localStorage.removeItem('groupData')
}