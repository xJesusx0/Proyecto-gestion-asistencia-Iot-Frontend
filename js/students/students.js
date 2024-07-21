const redirectToAttendancesList = (groupId) => {
  localStorage.setItem('groupData',groupId)
  window.location.href = 'history.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const url = `${config.baseUrl}/students/get-student-modules`;
  console.log(userData)

  document.getElementById('welcomeUser').innerHTML += ` ${userData['names']} 🌟`

  request('GET',url)
  .then(response => {
    console.log(response);

    const cardContainer = document.getElementById('cards-container');
    
    response.forEach(module => {
      const col = document.createElement('div');
      col.classList.add('col-md-4','mt-3'); // Ajusta el tamaño de las columnas según sea necesario

      const card = document.createElement('div');
      card.classList.add('card', 'h-100'); // 'h-100' para que las tarjetas tengan la misma altura

      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.setAttribute('src', '../img/textura.jpg');
      card.appendChild(img);

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = module['nombre'];
      cardBody.appendChild(cardTitle);

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = `ID del módulo: ${module['id_modulo']}`;
      cardBody.appendChild(cardText);

      const button = document.createElement('a');
      button.href = `history.html?group_id=${module.id_grupo}&module_id=${module.id_modulo}&period=${module.periodo}`;
      //button.href = '#'
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Ver historial';
      cardBody.appendChild(button);

      card.appendChild(cardBody);
      col.appendChild(card);
      cardContainer.appendChild(col);
  });
  })

})