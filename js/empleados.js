document.addEventListener("DOMContentLoaded", function () {
    const openModalButton = document.getElementById("add-employee");

    openModalButton.addEventListener("click", () => {
        Swal.fire({
            title: 'Agregar Empleado',
            html: `
                <script src="js/general.js">  </script>

                <div class="form-group">
                <label for="nombres">Nombres:</label>
                <input type="text" id="nombres" name="nombres" required onblur="validarCampo(this)>
            </div>
            <div class="form-group">
                <label for="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" name="apellidos" required onblur="validarCampo(this)>
            </div>
            <div class="form-group">
                <label for="correo">Correo:</label>
                <input type="email" id="inputCorreoRegistro" name="correo" required oninput="validarCorreoElectronico()">
                <p id="resultadoCorreoElectronico"></p>

            </div>
            <div class="form-group">
                <label for="cedula">Cédula:</label>
                <input type="text" id="numeroCedula" name="cedula" required  oninput="validarCedula()">
                <p id="PCedula"></p>

            </div>
            <div class "form-group">
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" name="direccion" required onblur="validarCampo(this)>
            </div>
            <div class="form-group">
                <label for="area">Área de Trabajo:</label>
                <select id="filtro_area" required>
                    <option value="" selected disabled>Área</option>
                    <option value="Contabilidad">Contabilidad</option>
                    <option value="TI">TI</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                </select>
            </div>
            <div class="form-group">
                <label for="rol">Rol de Trabajo:</label>
                <input type="text" id="rol" name="rol" required>
            </div>
            <div class="form-group">
                <label for="numeroCelular">Número de celular:</label>
                <input type="text" id="numeroCelular" name="numeroCelular" required oninput="validarNumeroTelefono()" >
                <p id="resultadoNumeroTelefono"></p>

                </div>
            <div class="form-group">
                <label for="contrato">Contrato (PDF):</label>
                <input type="file" id="contrato" name="contrato" accept=".pdf" required>
            </div>
            <div class="form-group">
                <label for="foto">Foto:</label>
                <input type="file" id="foto" name "foto" accept="image/*" required>
            </div>
            <div class="form-group">
                <input type="checkbox" id="confirmacion" name="confirmacion" required>
                <label for="confirmacion">Confirmo que la información es correcta.</label>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
        customClass: 'custom-modal',
    }).then((result) => {
        if (result.isConfirmed) {
            // Comprobar si los campos de archivo están vacíos o nulos
            const contrato = document.getElementById("contrato");
            const foto = document.getElementById("foto");

            if (!contrato.files || contrato.files.length === 0 || !foto.files || foto.files.length === 0) {
                Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
            } else {
                Swal.fire('Guardado', '', 'success');
    
            }
        }
    });
});
});






  document.addEventListener("DOMContentLoaded", function() {
    const AreaFuncion = document.getElementById("employee_area");
    const Key = document.getElementById("filtro_area");

    Key.addEventListener("change", function() {
        switch (Key.value) {
            case "Contabilidad":
                AreaFuncion.textContent = "de contabilidad";
                break;
            case "TI":
                AreaFuncion.textContent = "de TI";
                break;
            case "Finanzas":
                AreaFuncion.textContent = "de Finanzas";
                break;
            case "Mantenimiento":
                AreaFuncion.textContent = "de Mantenimiento";
                break;
            case "Jefe_area":
                AreaFuncion.textContent = "de alto rango"
                break;
            default:
                AreaFuncion.textContent = "";
                break;
        }
    });
});

// JavaScript para mostrar/ocultar la ventana modal y cerrarla con la tecla "Escape"
document.addEventListener("DOMContentLoaded", function() {
    const closeModalButtonForm = document.getElementById("close-modal-form");
    const modalForm = document.getElementById("myModal_form");
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            modalForm.classList.add("hide_form")
              
        }
        closeModalButtonForm.addEventListener("click", () => {
            modalForm.classList.add("hide_form")
          });
    });
});



