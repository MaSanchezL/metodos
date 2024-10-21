const tareas = [
  { id: 1, nombre: "Lavar la ropa", checked: false },
  { id: 2, nombre: "Cocinar", checked: false },
  { id: 3, nombre: "Limpiar la casa", checked: false },
];

const btn = document.querySelector("#agregar");
const lista = document.querySelector("#lista");

btn.addEventListener("click", () => {
  let value = document.querySelector("input").value;

  let nuevo_id = 1;
  if (tareas.length > 0) {
    let ultimo_id = tareas[tareas.length - 1].id;
    nuevo_id = ultimo_id + 1;
  }
  let nuevo_usuario = {
    id: nuevo_id,
    nombre: value,
    checked: false,
  };
  tareas.push(nuevo_usuario);
  actualizar();
});

const actualizar = () => {
  document.querySelector("#tablalista tbody").innerHTML = "";

  tareas.forEach((checked) => {
    construirItemHtml(checked);
  });

  construirTotalSeleccionados();
  construirTotal();
};

const construirItemHtml = (item) => {
  let table = document.querySelector("#tablalista tbody");
  let rowLength = table.rows.length;

  let row = table.insertRow(rowLength);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);

  cell1.innerHTML = item.id;
  cell2.innerHTML = item.nombre;
  cell3.innerHTML = `<input type='checkbox' onclick='toggleItem(${item.id})' ${
    item.checked ? "checked" : ""
  }>`;

  cell4.innerHTML = `<span onclick='eliminarItem(${item.id})' class="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>`;
};

const construirTotalSeleccionados = () => {
  let tareasChecked = tareas.filter((tarea) => tarea.checked == true);
  document.querySelector(
    "#checked"
  ).innerHTML = `Realizadas: <strong> ${tareasChecked.length} </strong>`;
};

const construirTotal = () => {
  document.querySelector(
    "#cantidad"
  ).innerHTML = `Total: <strong> ${tareas.length} </strong>`;
};

const eliminarItem = (id) => {
  let itemIndex = tareas.findIndex((tarea) => tarea.id === id);
  tareas.splice(itemIndex, 1);
  actualizar();
};

const agregarItem = (item) => {
  tareas.push(item);
  actualizar();
};

const toggleItem = (id) => {
  let itemIndex = tareas.findIndex((tarea) => tarea.id === id);

  if (itemIndex !== -1) {
    tareas[itemIndex].checked = !tareas[itemIndex].checked;
    actualizar();
  }
};

actualizar();
