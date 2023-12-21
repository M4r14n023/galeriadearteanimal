// function login() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Aquí puedes hacer una solicitud AJAX al servidor Flask para manejar el inicio de sesión.
//     // Por ahora, solo mostraré un mensaje de error si el usuario intenta ingresar 'demo'/'password'.
//     if (username === 'demo' && password === 'password') {
//         // Redirigir al índice después de un inicio de sesión exitoso
//         window.location.href = '{{ url_for("index") }}';
//     } else {
//         document.getElementById('error-message').textContent = 'Usuario o contraseña incorrectos.';
//     }
// }

function login() {
    // Obtener los valores del formulario
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
  // Verificar las credenciales de administrador
  if (email === 'admin@gmail.com' && password === '1234') {
    Swal.fire({
      title: 'Bienvenido',
      text: 'Has entrado como Administrador',
      icon: 'success',
    }).then((result) => {
      // Redirigir a animales.html después de cerrar la alerta
      if (result.isConfirmed) {
        window.location.href = './animales.html';
      }
    });
    } else {
      // Credenciales incorrectas, mostrar un mensaje de error o realizar otras acciones
      alert('Inténtalo de nuevo.');
    }
  }
  