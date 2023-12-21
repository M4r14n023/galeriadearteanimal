document.getElementById("header").innerHTML=` <nav
class="navbar navbar-expand-sm navbar-light bg-light"
>
<div class="container">
    <a class="navbar-brand" href="../index.html">Galeria de Arte Animal</a>
    <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav me-auto mt-2 mt-lg-0">

            <li class="nav-item">
                <a class="nav-link" href="animales.html">Acceso Administrador</a>
            </li>
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    >Edicion de Fotografia</a
                >
                <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownId"
                >
                    <a class="dropdown-item" href="artistas.html"
                        >Galeria Artistas</a
                    >
                    <a class="dropdown-item" href="fotos.html"
                        >Galeria Fotografica</a
                    >
                </div>
            </li>
        </ul>

    </div>
</div>
</nav>
`

document.getElementById("footer").innerHTML= `        <p>&copy; 2023 Mariano Lumbreras - Todos los derechos reservados</p>
<p>¡Gracias por visitar Galeria de Arte Animal!</p>`