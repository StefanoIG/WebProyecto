document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector(".calendar");
    const currentMonthElement = document.getElementById("current-month");

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const updateCalendar = () => {
        // Actualiza el título con el mes actual
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        currentMonthElement.textContent = `${months[currentMonth]} del ${currentYear} `;

        // Limpia el calendario actual
        calendar.innerHTML = "";

        // Calcula el primer día y último día del mes
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Agrega celdas vacías para los días anteriores si el primer día no es domingo (0)
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("calendar-day", "empty");
            calendar.appendChild(emptyCell);
        }

        // Genera el calendario
        for (let day = 1; day <= lastDay; day++) {
            const calendarDay = document.createElement("div");
            calendarDay.classList.add("calendar-day");
            calendarDay.textContent = day;
            calendar.appendChild(calendarDay);
        }
    };

    // Inicializa el calendario
    updateCalendar();

    // Botón "Anterior"
    document.getElementById("prev-month").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    // Botón "Siguiente"
    document.getElementById("next-month").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Asigna un evento clic a los días del calendario
    const calendarDays = document.querySelectorAll(".calendar-day");
    calendarDays.forEach((day) => {
        day.addEventListener("click", () => {
            Swal.fire({
                title: 'No tienes reuniones agendadas',
                text: '¿Deseas agregar alguna?',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: '¿Tienes algo planeado para este día?',
                        text: 'Agrega los detalles a continuación:',
                        input: 'textarea',
                        inputPlaceholder: 'Escribe tu plan...',
                        showCancelButton: true,
                        confirmButtonText: 'Guardar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const plan = result.value;
                            if (plan) {
                                Swal.fire({
                                    title: 'Reunion guardada',
                                    text: `Plan para este día: ${plan}`,
                                    icon: 'success'
                                });
                            }
                        }
                    });
                }
            });
        });
    });
});





const requestVacationButton = document.getElementById("request-vacation");
const notificationsButton = document.getElementById("notifications");
const logoutButton = document.getElementById("logout");

// Maneja el clic en el botón de "Vacaciones"
requestVacationButton.addEventListener("click", () => {
    // Muestra un alert con la cantidad de días de vacaciones restantes
    Swal.fire({
        title: 'Vacaciones',
        text: 'Te quedan 10 días de vacaciones.',
        showCancelButton: true,
        confirmButtonText: 'Solicitar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Muestra un formulario para solicitar vacaciones
            Swal.fire({
                title: 'Solicitar Vacaciones',
                html: `
                    <link rel="stylesheet" href="css/custom_styles.css">
                    <script src="js/general.js">  </script>
                    <div class="form-group">
                        <label for="priority">Seleccione la razón:</label>
                        <select id="priority" name="priority" required>
                            <option value="alta">Acumuladas</option>
                            <option value="media">Por emergencia</option>
                            <option value="baja">Otros</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="start-date">Fecha de inicio:</label>
                        <input type="date" id="start-date" name="start-date" required>
                    </div>
                    <div class="form-group">
                        <label for="return-date">Fecha de vuelta:</label>
                        <input type="date" id="return-date" name="return-date" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Descripción:</label>
                        <textarea id="description" name="description" required></textarea>
                    </div>`,
                showCancelButton: true,
                confirmButtonText: 'Enviar solicitud',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    const priority = document.getElementById('priority').value;
                    const startDate = document.getElementById('start-date').value;
                    const returnDate = document.getElementById('return-date').value;
                    const description = document.getElementById('description').value;

                    if (priority && startDate && returnDate && description) {
                        // Aquí puedes enviar la solicitud de vacaciones, por ejemplo, a través de una solicitud AJAX.
                        Swal.fire('Solicitud enviada', `Vacaciones solicitadas para: Fecha de inicio: ${startDate}, Fecha de vuelta: ${returnDate}, Motivo: ${description}`, 'success');
                    } else {
                        Swal.fire('Campos incompletos', 'Por favor, complete todos los campos del formulario.', 'error');
                    }
                }
            });
        }
    });
});

// Obtiene la referencia al elemento donde se mostrarán las tareas completadas.
const completedTasksContainer = document.getElementById("completed-tasks");

function completeTask(taskDescription) {
    Swal.fire({
        title: 'Confirmar Completar Tarea',
        text: `¿Estás seguro de completar la tarea: "${taskDescription}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Encuentra la tarea que se completó
            const tasks = document.querySelectorAll('.task');
            tasks.forEach((task) => {
                const taskText = task.querySelector('p').textContent;
                if (taskText === taskDescription) {
                    // Agrega la clase "completed" en lugar de "hide" para estilizar la tarea como completada
                    task.classList.add('hide');

                    // Crea un nuevo elemento para la tarea completada
                    const completedTask = document.createElement("div");
                    completedTask.textContent = taskDescription;
                    completedTask.classList.add('task_finish');
                    
                    // Mueve la tarea completada a la sección de tareas completadas
                    const completedTasksContainer = document.getElementById("completed-tasks");
                    completedTasksContainer.appendChild(completedTask);
                    
                }
            });
        }
    });
}




// Asigna un evento clic a los botones "Completar" (debes ajustar el selector según tu estructura HTML).
const completeButtons = document.querySelectorAll(".complete-button");
completeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskDescription = button.previousElementSibling.textContent;
        completeTask(taskDescription);
    });
});




// Maneja el clic en el botón de "Notificaciones"
notificationsButton.addEventListener("click", () => {
  // Muestra una notificación de ejemplo
  Swal.fire('Notificaciones', 'Tienes 3 notificaciones nuevas.', 'info');
});

