console.log("El script info_empleado.js se está ejecutando.");

document.addEventListener("DOMContentLoaded", function () {
  const openAssignObjective = document.getElementById("Add_objective");
  const tasksList = document.getElementById("tasks-list");
  let taskToEdit = null; // Variable para almacenar la tarea que se está editando

  openAssignObjective.addEventListener("click", () => {
    Swal.fire({
      title: "",
      html: `
          <link rel="stylesheet" href="css/custom_styles.css">
          <script src="js/general.js"></script>
          <div class="form-container">
              <h2>Agregar Tarea u Objetivo</h2>
              <form class="task-form" id="task-form">
                  <div class="form-group">
                      <label for="title">Título:</label>
                      <input type="text" id="title" name="title" required onblur="validarCampo(this)">
                  </div>
                  <div class="form-group">
                      <label for="description">Descripción:</label>
                      <textarea id="description" name="description" required onblur="validarCampo(this)"></textarea>
                  </div>
                  <div class="form-group">
                      <label for="deadline">Fecha de Vencimiento:</label>
                      <input type="date" id="deadline" name="deadline" required>
                  </div>
                  <div class="form-group">
                      <label for="priority">Prioridad:</label>
                      <select id="priority" name="priority" required onblur="validarCampo(this)">
                          <option value="alta">Alta</option>
                          <option value="media">Media</option>
                          <option value="baja">Baja</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label for="instrucciones">Instrucciones (PDF):</label>
                      <input type="file" id="instrucciones" name="instrucciones" accept=".pdf" required>
                  </div>
              </form>
          </div>`,
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
      customClass: 'custom-modal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Recuperar los valores del formulario
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const deadline = document.getElementById("deadline").value;
        const priority = document.getElementById("priority").value;
        const instructions = document.getElementById("instrucciones").value; // No es posible obtener el valor de un campo de archivo

        // Validar que los campos requeridos no estén en blanco
        if (title.trim() === '' || description.trim() === '' || deadline === '' || priority === '' || instructions === '') {
          Swal.fire('Error', 'Por favor, completa todos los campos obligatorios.', 'error');
        } else if (new Date(deadline) < new Date()) {
          Swal.fire('Error', 'La fecha de vencimiento no puede estar en el pasado.', 'error');
        } else {
          // Crear una nueva tarjeta de tarea con un botón de edición
          const newTaskCard = document.createElement("li");
          newTaskCard.innerHTML = `
              <div class="task-card">
                  <div>
                      <p><strong>Título:</strong> ${title}</p>
                      <p><strong>Descripción:</strong> ${description}</p>
                      <p><strong>Fecha de Vencimiento:</strong> ${deadline}</p>
                      <p><strong>Prioridad:</strong> ${priority}</p>
                      <p><strong>Instrucciones:</strong> ${instructions}</p> <!-- Aquí debes mostrar el nombre del archivo seleccionado -->
                  </div>
                  <button class="edit-objective-btn">Editar Objetivos</button>
                  <button class="delete-objective-btn">Eliminar Objetivos</button>
              </div>
          `;
          tasksList.appendChild(newTaskCard);

          const deleteTaskButton = newTaskCard.querySelector(".delete-objective-btn");
          deleteTaskButton.addEventListener("click", () => {
            Swal.fire({
              title: '¿Estás seguro de borrar esta tarea?',
              text: 'Esta acción es irreversible.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, Bórralo'
            }).then((result) => {
              if (result.isConfirmed) {
                tasksList.removeChild(newTaskCard);
                Swal.fire(
                  'Eliminado',
                  'Tu tarea fue eliminada.',
                  'success'
                );
              }
            });
          });

          // Agregar un evento para editar la tarea
          const editTaskButton = newTaskCard.querySelector(".edit-objective-btn");
          editTaskButton.addEventListener("click", () => {
            taskToEdit = {
              title,
              description,
              deadline,
              priority,
              instructions,
            };

            // Abrir la alerta de edición con los campos prellenados
            Swal.fire({
              title: 'Editar Tarea u Objetivo',
              html: `
                  <link rel="stylesheet" href="css/custom_styles.css">
                  <div class="form-container">
                      <h2>Editar Tarea u Objetivo</h2>
                      <form class="task-form" id="task-form">
                          <div class="form-group">
                              <label for="title">Título:</label>
                              <input type="text" id="title" name="title" value="${taskToEdit.title}" required>
                          </div>
                          <div class="form-group">
                              <label for="description">Descripción:</label>
                              <textarea id="description" name="description" required>${taskToEdit.description}</textarea>
                          </div>
                          <div class="form-group">
                              <label for="deadline">Fecha de Vencimiento:</label>
                              <input type="date" id="deadline" name="deadline" value="${taskToEdit.deadline}" required>
                          </div>
                          <div class="form-group">
                              <label for="priority">Prioridad:</label>
                              <select id="priority" name="priority" required>
                                  <option value="alta">Alta</option>
                                  <option value="media">Media</option>
                                  <option value="baja">Baja</option>
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="instrucciones">Instrucciones (PDF):</label>
                              <input type="file" id="instrucciones" name="instrucciones" accept=".pdf" required>
                          </div>
                      </form>
                  </div>`,
              showCloseButton: true,
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Guardar',
              denyButtonText: 'No guardar',
              customClass: 'custom-modal',
            }).then((editResult) => {
              if (editResult.isConfirmed) {
                // Validar que los campos requeridos no estén en blanco en la edición
                const editedTitle = document.getElementById("title").value;
                const editedDescription = document.getElementById("description").value;
                const editedDeadline = document.getElementById("deadline").value;
                const editedPriority = document.getElementById("priority").value;
                const editedInstructions = document.getElementById("instrucciones").value;

                if (editedTitle.trim() === '' || editedDescription.trim() === '' || editedDeadline === '' || editedPriority === '' || editedInstructions === '') {
                  Swal.fire('Error', 'Por favor, completa todos los campos obligatorios en la edición.', 'error');
                } else if (new Date(editedDeadline) < new Date()) {
                  Swal.fire('Error', 'La fecha de vencimiento no puede estar en el pasado en la edición.', 'error');
                } else {
                  // Actualizar la tarea con los nuevos valores
                  // Puedes agregar la lógica necesaria aquí
                  Swal.fire('Guardado', '', 'success');
                }
              }
            });
          });

          Swal.fire('Guardado', '', 'success');
          // Aquí puedes agregar lógica para guardar los datos de la tarea
        }
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const editInfoButton = document.querySelector(".edit-info-btn");

  editInfoButton.addEventListener("click", () => {
      Swal.fire({
          title: 'Editar información del Empleado',
          html: `
              <link rel="stylesheet" href="custom_styles.css">
              <div class="employee-form">
                  <form class="employee-form">
                      <div class="form-group">
                          <label for="nombres">Nombres:</label>
                          <input type="text" id="nombres" name="nombres" required>
                      </div>
                      <div class="form-group">
                          <label for="apellidos">Apellidos:</label>
                          <input type="text" id="apellidos" name="apellidos" required>
                      </div>
                      <div class="form-group">
                          <label for="correo">Correo:</label>
                          <input type="email" id="correo" name="correo" required>
                      </div>
                      <div class="form-group">
                          <label for="direccion">Dirección:</label>
                          <input type="text" id="direccion" name="direccion" required>
                      </div>
                      <div class="form-group">
                          <label for="area">Área de Trabajo:</label>
                          <select id="filter-dropdown">
                              <option value="area" selected>Área</option>
                              <option value="nombre">Contabilidad</option>
                              <option value="nombre">TI</option>
                              <option value="nombre">Finanzas</option>
                              <option value="nombre">Mantenimiento</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="rol">Rol de Trabajo:</label>
                          <input type="text" id="rol" name="rol" required>
                      </div>
                      <div class="form-group">
                          <label for="contrato">Contrato (PDF):</label>
                          <input type="file" id="contrato" name="contrato" accept=".pdf" required>
                      </div>
                      <div class="form-group">
                          <input type="checkbox" id="confirmacion" name="confirmacion" required>
                          <label for="confirmacion">Confirmo que la información es auténtica.</label>
                      </div>
                  </form>
              </div>`,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
      }).then((result) => {
          if (result.isConfirmed) {
              // Aquí puedes procesar el formulario si todos los campos requeridos están completos
              const nombres = document.getElementById("nombres").value;
              const apellidos = document.getElementById("apellidos").value;
              const correo = document.getElementById("correo").value;
              const direccion = document.getElementById("direccion").value;
              const area = document.getElementById("filter-dropdown").value;
              const rol = document.getElementById("rol").value;
              const contrato = document.getElementById("contrato").value;
              const confirmacion = document.getElementById("confirmacion").checked;

              // Verifica que todos los campos requeridos estén completos
              if (nombres && apellidos && correo && direccion && area !== "area" && rol && contrato && confirmacion) {
                  // Aquí puedes procesar el formulario, por ejemplo, enviar los datos a un servidor.
                  Swal.fire('Formulario enviado', 'La información ha sido enviada correctamente', 'success');
              } else {
                  Swal.fire('Error', 'Por favor, complete todos los campos requeridos.', 'error');
              }
          }
      });
  });
});
