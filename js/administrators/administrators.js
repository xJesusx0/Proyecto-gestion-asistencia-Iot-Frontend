document.addEventListener('DOMContentLoaded',() =>{
  const welcomeMessage= document.getElementById('welcome');
  welcomeMessage.innerHTML += `${userData.names} ⭐`;
});