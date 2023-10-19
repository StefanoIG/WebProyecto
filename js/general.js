const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
  modeText.innerText = "Modo claro";
}else{
  modeText.innerText = "Modo oscuro";
  
}
});


// JavaScript para mostrar/ocultar la ventana modal
document.addEventListener("DOMContentLoaded", function() {
  const openModalButton = document.getElementById("open-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modal = document.getElementById("myModal");

  openModalButton.addEventListener("click", () => {
   
      modal.classList.remove("hide");
  });

  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hide");
  });

});

// JavaScript para mostrar/ocultar la ventana modal y cerrarla con la tecla "Escape"
document.addEventListener("DOMContentLoaded", function() {
  const openModalButton = document.getElementById("open-modal");
  const closeModalButton = document.getElementById("close-modal");
  const modal = document.getElementById("myModal");

  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
    
    // Agregar un evento de escucha para la tecla "Escape"
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        modal.style.display = "none";
      }
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});


function redirectToEmployeeInfo() {
  window.location.href = "empleado_info.html";
}


function redirectToEmployee() {
  window.location.href = "empleados.html";
}
function logoutWithAlert() {
  Swal.fire({
    title: 'Cerrar sesión',
    text: '¿Estás seguro de que deseas cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Redireccionar a index.html
      window.location.href = 'login.html';
    }
  });
}


//Validaciones

function validarCampo(input) {
  const valor = input.value.trim();
  if (valor === '') {
    Swal.fire({
      icon: 'error',
      title: 'Campo Inválido',
      text: 'Por favor, completa este campo.',
    });
    return false; // Agrega esta línea
  }
  return true; // Esto es opcional, dependiendo de cómo quieras usar la función
}


// Función para validar contraseñas
function verificarPass() {
  const regexPass = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
  const inputPass = document.getElementById("password");
  const resultadoPass = document.getElementById("resultadoPass");

  if (!regexPass.test(inputPass.value)) {
    resultadoPass.textContent = "La contraseña no es válida. Debe contener al menos un carácter en mayúscula, al menos un dígito y tener al menos 10 caracteres.";
    return false;
  }
  resultadoPass.textContent = "";
  return true;
}

// Función para verificar que las contraseñas coincidan
function comprobarPass() {
  const pass = document.getElementById("password").value;
  const confirmarPass = document.getElementById("confirmarPass").value;
  const mensajePass = document.getElementById("mensajePass");

  if (pass !== confirmarPass) {
    mensajePass.textContent = "Las contraseñas no coinciden.";
    return false;
  } else {
    mensajePass.textContent = "";
    return true;
  }
}

// Función para validar una dirección de correo electrónico
function validarCorreoElectronico() {
  const regexCorreoElectronico = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const inputCorreoElectronico = document.getElementById("inputCorreoRegistro");
  const resultadoCorreoElectronico = document.getElementById("resultadoCorreoElectronico");

  if (!regexCorreoElectronico.test(inputCorreoElectronico.value)) {
    resultadoCorreoElectronico.textContent = "La dirección de correo electrónico no es válida.";
    return false;
  } else {
    resultadoCorreoElectronico.textContent = "";
    return true;
  }
}

// Función para validar un número de teléfono
function validarNumeroTelefono() {
  const regexNumeroTelefono = /^\d{10}$/;
  const inputNumeroTelefono = document.getElementById("numeroCelular");
  const resultadoNumeroTelefono = document.getElementById("resultadoNumeroTelefono");

  if (!regexNumeroTelefono.test(inputNumeroTelefono.value.replace(/\D/g, ''))) {
    resultadoNumeroTelefono.textContent = "El número de teléfono no es válido. Debe contener 10 dígitos.";
    return false;
  } else {
    resultadoNumeroTelefono.textContent = "";
    return true;
  }
}

//Funcion para validar cedula
function validarCedula() {
  const cedula = document.getElementById("numeroCedula").value;
  const mensajecedula = document.getElementById("PCedula");
  
  if (cedula.length !== 10) {
      mensajecedula.textContent = "La cédula debe tener 10 dígitos.";
      return false;
  }

  if (!/^[0-9]+$/.test(cedula)) {
      mensajecedula.textContent = "La cédula debe contener solo números.";
      return false;
  }

  const prov = Number(cedula.substring(0, 2));
  if (prov < 1 || prov > 24) {
      mensajecedula.textContent = "El primer número de la cédula debe estar entre 1 y 24.";
      return false;
  }

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const verificador = Number(cedula[9]);

  let suma = 0;
  for (let i = 0; i < 9; i++) {
      let valor = Number(cedula[i]) * coeficientes[i];
      if (valor > 9) {
          valor -= 9;
      }
      suma += valor;
  }

  const total = (Math.ceil(suma / 10) * 10);
  const digitoVerificador = total - suma;

  if (digitoVerificador === 10) {
      if (verificador !== 0) {
          mensajecedula.textContent = "La cedula es invalida.";
          return false;
      }
  } else {
      if (verificador !== digitoVerificador) {
          mensajecedula.textContent = "La cedula es invalida.";
          return false;
      }
  }

  // Si llegamos a este punto, la cédula es válida
  mensajecedula.textContent = "";
  return true;
}

//Redirreciones

//rediccion a productividad
function redirigirAProductividad() {
  window.location.href = "productividad.html";
}

//redirrecion a jefe de areas
function redirigirAEmpleadosComoJefe() {
  window.location.href = "empleados.html";
  const select = document.getElementById("filtro_area"); 
  select.value = "Jefe_area";
}

//redirrecion a empleados
function redirigirAEmpleados() {
  window.location.href = "empleados.html";
}

//redirrecion a AreaSocial
function redirigirAAreaSocial() {
  window.location.href = "area_social.html";
}


