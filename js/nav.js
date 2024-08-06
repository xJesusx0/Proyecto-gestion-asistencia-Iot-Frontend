document.addEventListener('DOMContentLoaded', () => {
    const role = userData.role;

    const adminNav = `
<nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
        <!-- Logo visible en la barra de navegación -->
        <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">

        <!-- Botón para desplegar el offcanvas -->
        <button class="navbar-toggler border border-black" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas desplegable -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <!-- Logo visible en el encabezado del offcanvas -->
                <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">
                <!-- Botón para cerrar el offcanvas con ícono de menú hamburguesa -->
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas" aria-label="Close">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="offcanvas-body">
                <!-- Lista de navegación dentro del offcanvas -->
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <a class="nav-link" href="administrators.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Inicio</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="upload-and-register.html">
                            <button class="btn btn-primary btn-lg" style="width: 350px;" type="button">Agregar usuarios via archivo CSV</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="users-list.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Ver lista de usuarios</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="create-group.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Crear un grupo</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="groups.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Ver grupos</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onclick="logout()" id="btnDesplegable">
                            <button class="btn btn-danger btn-lg px-1 py-2" style="width: 350px;" type="button">Cerrar sesión</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

`;

    const teacherNav = `
   <nav class="navbar bg-body-tertiary fixed-top">
    <div class="container-fluid">
        <!-- Logo visible en la barra de navegación -->
        <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">

        <!-- Botón para desplegar el offcanvas -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas desplegable -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <!-- Logo visible en el encabezado del offcanvas -->
                <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <!-- Lista de navegación dentro del offcanvas -->
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <a class="nav-link" href="teachers.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Inicio</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onclick="logout()" id="btnDesplegable">
                            <button class="btn btn-danger btn-lg px-1 py-2" style="width: 350px;" type="button">Cerrar sesión</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
 
    `


    const studentNav = `
<nav class="navbar bg-body-tertiary fixed-top mb-5">
    <div class="container-fluid">
        <!-- Logo visible en la barra de navegación -->
        <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">

        <!-- Botón para desplegar el offcanvas -->
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas desplegable -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <!-- Logo visible en el encabezado del offcanvas -->
                <img src="../img/logoiubLetras.png" style="width: 200px; height: 50px;">
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <!-- Lista de navegación dentro del offcanvas -->
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item">
                        <a class="nav-link" href="students.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Inicio</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="justificacion.html">
                            <button class="btn btn-primary btn-lg px-1 py-2" style="width: 350px;" type="button">Justificar falta</button>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onclick="logout()" id="btnDesplegable">
                            <button class="btn btn-danger btn-lg px-1 py-2" style="width: 350px;" type="button">Cerrar sesión</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>


`
    const navs = {
        'administrador': adminNav,
        'estudiante': studentNav,
        'profesor':teacherNav
    }
    const navContainer = document.getElementById('nav-container');
    fetch('../json/web-routes.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(role);
            const routes = data;
            const route = window.location.pathname.split('/').pop()
            const roleRoutes = (routes[role]);

            console.log(roleRoutes);
            console.log(route);

            if (roleRoutes.includes(route)) {
                navContainer.innerHTML = navs[role];
            }
        })

})