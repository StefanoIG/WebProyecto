document.addEventListener("DOMContentLoaded", function () {
    const birthdays = ["2023-10-12", "2023-10-15", "2023-10-28"];
    const calendar = document.querySelector(".calendar");
    const currentMonthElement = document.getElementById("current-month");
    const daysLeftElement = document.getElementById("days-left");

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const updateCalendar = () => {
        // Actualiza el título con el mes actual
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        currentMonthElement.textContent = ` ${months[currentMonth]} del ${currentYear}`;


// Calcula los días restantes para el próximo cumpleaños
const today = new Date();
const upcomingBirthdays = birthdays
  .map(birthday => new Date(today.getFullYear(), parseInt(birthday.split("-")[1]) - 1, parseInt(birthday.split("-")[2])))
  .filter(birthdayDate => birthdayDate >= today);

if (upcomingBirthdays.length === 0) {
  // No hay cumpleaños futuros este año, usa el primer cumpleaños del próximo año.
  upcomingBirthdays.push(new Date(today.getFullYear() + 1, parseInt(birthdays[0].split("-")[1]) - 1, parseInt(birthdays[0].split("-")[2])));
}

const nextBirthday = upcomingBirthdays.sort((a, b) => a - b)[0];

const timeDifference = nextBirthday - today;
const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
daysLeftElement.textContent = daysLeft;


        // Limpia el calendario actual
        calendar.innerHTML = "";
        //genera el calendario
        const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let day = 1; day <= lastDay; day++) {
          const calendarDay = document.createElement("div");
          calendarDay.classList.add("calendar-day");
          calendarDay.textContent = day;
        
          // Verifica si el día es un cumpleaños y agrega el atributo "data-birthday"
          const formattedDate = `${currentYear}-${currentMonth + 1 < 10 ? '0' : ''}${currentMonth + 1}-${day < 10 ? '0' : ''}${day}`;
          if (birthdays.includes(formattedDate)) {
            calendarDay.setAttribute("data-birthday", formattedDate);
          }
        
          // Agrega el día al calendario
          calendar.appendChild(calendarDay);
        }
        

        // Agrega la funcionalidad de SweetAlert al hacer clic en un día de cumpleaños
        const birthdayElements = document.querySelectorAll(".calendar-day[data-birthday]");

        birthdayElements.forEach((element) => {
            element.addEventListener("click", () => {
                const birthdayDate = element.getAttribute("data-birthday");

                Swal.fire({
                    title: "¡Cumpleaños!",
                    text: "Alguien cumple años el " + birthdayDate,
                    icon: "info"
                });
            });
        });
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


document.getElementById("modify-discount").addEventListener("click", () => {
    Swal.fire({
      title: "Modificar Descuento",
      html: '<input type="text" id="new-discount" class="custom-input" placeholder="Ingrese un nuevo descuento">',
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const newDiscountInput = document.getElementById("new-discount");
        const newDiscount = newDiscountInput.value;
  
        // Utiliza una expresión regular para verificar si es un número
        const isNumber = /^\d+$/.test(newDiscount);
  
        if (isNumber) {
          // Convierte el valor a un número entero
          const discountValue = parseInt(newDiscount, 10);
  
          // Verifica si el número está dentro del rango permitido (0-4)
          if (discountValue >= 0 && discountValue <= 4) {
            // Mostrar una confirmación antes de guardar
            return Swal.fire({
              title: "¿Seguro que desea guardar este cambio?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí, guardar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                // Realiza la acción de guardar aquí (puedes agregar tu lógica para notificar a los empleados).
                // Actualiza el descuento en tiempo real en el elemento HTML
                const discountPercentageElement = document.getElementById("discount-percentage");
                discountPercentageElement.textContent = discountValue + "%";
                Swal.fire("¡Cambio guardado!", "El descuento de los salarios de los empleados ha sido notificado.", "success");
              }
            });
          } else {
            Swal.showValidationMessage("El descuento debe estar en el rango de 0 a 4.");
          }
        } else {
          Swal.showValidationMessage("Ingrese un valor numérico válido.");
        }
      },
    });
  });
  