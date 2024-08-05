window.addEventListener('pageshow', function (event) {
  try {
    let storedData = localStorage.getItem('userData');
    let userData = JSON.parse(storedData);
    console.log(userData);

    if (userData && userData.loggedIn === 'true') {
      let role = userData.role;
      fetch('../json/web-routes.json')
      .then(response => {
          return response.json();
      })
      .then(data => {
          console.log(data)
          window.routes = data;
          window.location.href = window.routes[role][0];
      }) 
    }

    const loginForm = document.getElementById('login-form');
    loginForm.setAttribute('action', `${config.baseUrl}/auth/login`)

  } catch (error) {
    console.error('Error al recuperar datos de localStorage:', error);
  }
});

const confirmRole = () => {
  const selectedRole = document.querySelector('input[name="role"]:checked').value.toLowerCase();

  const userData = JSON.parse(localStorage.getItem('userData'));
  userData.role = selectedRole;

  localStorage.setItem('userData', JSON.stringify(userData));

  const url = `${config.baseUrl}/auth/set-role`
  const data = {
    'role': selectedRole
  }
  request('POST', url, data)
    .then(response => {
      if (response['error']) {
        alert('Ha ocurrido un error al iniciar sesion');
        return;
      }

      localStorage.setItem('access_token', response.access_token);

      alert(`Bienvenido de nuevo, ${userData.names} 👋`);
      window.location.href = window.routes[selectedRole][0];
    })
}

const validarLogin = () => {
  const username = document.getElementById("username").value.toLowerCase().trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const baseUrl = config.baseUrl;
  const url = `${baseUrl}/auth/login`;

  const data = {
    'username': username,
    'password': password,
  };

  request('POST', url, data)
    .then(data => {
      console.log(data);

      localStorage.setItem('access_token', data.access_token);

      if (data['error']) {
        alert(data['error']);
        return;
      }

      const roles = data['roles'];

      if (roles.length !== 1) {
        const rolesList = document.getElementById('roles-list');
        rolesList.innerHTML = '';
        roles.forEach(element => {
          const roleElement = document.createElement('input')
          roleElement.setAttribute('type', 'radio')
          roleElement.setAttribute('value', element['nombre']);
          roleElement.setAttribute('id', element['nombre']);

          roleElement.setAttribute('name', 'role')
          rolesList.appendChild(roleElement)

          const label = document.createElement('label')
          label.setAttribute('for', element['nombre'])
          label.textContent = element['nombre']
          rolesList.appendChild(label)
          rolesList.appendChild(document.createElement('br'));

        });

        showModal();

        const userData = {
          'names': data['user-data']['nombres'],
          'loggedIn': 'true',
          'userId': data['user-data']['id_usuario']
        };

        localStorage.setItem('userData', JSON.stringify(userData));

      } else {

        const role = roles[0]['nombre'].toLowerCase();
        const userData = {
          'names': data['user-data']['nombres'],
          'role': role,
          'loggedIn': 'true',
          'userId': data['user-data']['id_usuario']
        };

        alert(`Bienvenido de nuevo, ${userData.names} 👋`);

        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = window.routes[role][0];
      }

    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ha ocurrido un error al iniciar sesion.');
    });
};
