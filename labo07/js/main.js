let carnet_field = document.querySelector("#carnet_field");
let schedule_dropdown = document.querySelector("#schedule_field");
let lete_switch = document.querySelector("#late_switch");
let submit_btn = document.querySelector("#submit_btn");
let tbody = document.querySelector("#table_body");
let carnet_regex = new RegExp("[0-9]{8}$");
let student_list = [];
let serial = 0;

let printArray = () => {
  tbody.innerHTML = "";

  student_list.forEach(elem => {
    let new_row = document.createElement("tr");
    let dateTime = new Date()

    let celda = document.createElement("td");
    let btnEliminar = document.createElement("button");

    new_row.classList.add("table-active");
    new_row.innerHTML = `<td>${elem.carnet}</td>
    <td>${elem.horario}</td>
    <td>${dateTime.toLocaleString()}</td>
    <td>${elem.late}</td>`;

    /*
     *personalizando btn
     */

    btnEliminar.className = "btn btn-danger";
    btnEliminar.innerText = "Eliminar";
    btnEliminar.value = elem.id;

    btnEliminar.addEventListener("click", event => {
      let id_actual = event.target.value;

      student_list.forEach((elem, pos) => {
        if (id_actual == elem.id) {
          student_list.splice(pos, 1);
          printArray();
        }
      });
    });

    celda.appendChild(btnEliminar);
    new_row.appendChild(celda);
    tbody.appendChild(new_row);
  });
};

let add_student = (carnet, schedule, late) => {
    student_list.push({
        id: serial,
        carnet: carnet,
        horario: schedule,
        tarde: late
      });
      serial++;
};


let parseLateSwitch = (value) => {
  if (value) {
    return "Tardisimo";
  }
  return "A tiempo";
};

submit_btn.addEventListener("click", () => {
  let carnet = carnet_field.value;
  let schedule =schedule_dropdown.options[schedule_dropdown.selectedIndex].text;
  let late = parseLateSwitch(lete_switch.cheked);

  if (carnet_regex.test(carnet)) {
    add_student(carnet, schedule, late);
    printArray();
  } else {
    alert("el carnet no es valido");
  }
});

carnet_field.addEventListener("keyup", event => {
  let keyUp = event.kedCode;
  let carnet = carnet_field.value;
  if (keyUp == 13) {
    submit_btn.click();
  }

  if (carnet_regex.test(carnet)) {
    submit_btn.disabled = false;
  } else {
    submit_btn.disabled = true;
  }
});
