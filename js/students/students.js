const redirectToAttendancesList = (groupId) => {
  localStorage.setItem('groupData',groupId)
  window.location.href = 'history.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const url = `${config.baseUrl}/students/get-student-modules`;
  console.log(userData)

  //}} document.getElementById('btnDesplegable').innerHTML = userData['names']

  document.getElementById('welcomeUser').innerHTML += ` ${userData['names']} 🌟`

  request('GET',url)
  .then(response => {
    console.log(response);

    const cardContainer = document.getElementById('cards-container');
    
    response.forEach(module => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.classList.add('img-fluid');
      img.setAttribute('src','../img/textura.jpg');
      card.appendChild(img);

      const cardTitle = document.createElement('div');
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = module['nombre'];
      card.appendChild(cardTitle);

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      cardBody.innerHTML = module['id_modulo']
      card.appendChild(cardBody)

      const button = document.createElement('input')
      button.setAttribute('type','button');
      button.setAttribute('value','Ver historial')
      button.classList.add('btn')
      button.classList.add('btn-primary')
      card.appendChild(button)

      cardContainer.appendChild(card)
    });
  })

})