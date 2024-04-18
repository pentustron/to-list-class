let tasks = []; // Declara una variable tasks que almacenará las tareas por hacer
let completedTasks = []; // Declara una variable completedTasks que almacenará las tareas completadas

function addTask() { // Define una función addTask para agregar una nueva tarea
  const taskInput = document.getElementById('taskInput'); // Obtiene el elemento de entrada de texto para la nueva tarea
  const task = taskInput.value.trim(); // Obtiene el valor del input y elimina los espacios en blanco al principio y al final

  if (task === '') { // Verifica si el valor de la tarea está vacío
    alert('Por favor, ingresa una tarea.'); // Muestra una alerta si la tarea está vacía
    return; // Sale de la función sin hacer nada más
  }

  if (tasks.includes(task) || completedTasks.includes(task)) { // Verifica si la tarea ya está en la lista de tareas por hacer o en la lista de tareas completadas
    alert('Esta tarea ya está en la lista.'); // Muestra una alerta si la tarea ya está en la lista
    return; // Sale de la función sin hacer nada más
  }

  tasks.push(task); // Agrega la tarea al arreglo de tareas por hacer
  renderTasks(); // Llama a la función para volver a renderizar las tareas
  taskInput.value = ''; // Borra el contenido del input de la nueva tarea después de agregarla
}

function removeTask(index) { // Define una función para eliminar una tarea específica
  const task = tasks.splice(index, 1)[0]; // Elimina la tarea del arreglo de tareas por hacer y la almacena en una variable
  completedTasks.push(task); // Agrega la tarea eliminada al arreglo de tareas completadas
  renderTasks(); // Llama a la función para volver a renderizar las tareas
}

function toggleTask(index) { // Define una función para cambiar el estado de completado de una tarea
  const taskElement = document.getElementById(`task-${index}`); // Obtiene el elemento de la tarea específica
  taskElement.classList.toggle('completed'); // Alterna la clase 'completed' en el elemento de la tarea para mostrar u ocultar su estado de completado
}

function removeAllCompleted() { // Define una función para eliminar todas las tareas completadas
  completedTasks = []; // Vacía el arreglo de tareas completadas
  renderTasks(); // Llama a la función para volver a renderizar las tareas
}

function renderTasks() { // Define una función para renderizar las tareas en la interfaz de usuario
  const taskList = document.getElementById('taskList'); // Obtiene el contenedor de la lista de tareas por hacer
  const completedTaskList = document.getElementById('completedTaskList'); // Obtiene el contenedor de la lista de tareas completadas
  taskList.innerHTML = ''; // Borra el contenido actual del contenedor de la lista de tareas por hacer
  completedTaskList.innerHTML = ''; // Borra el contenido actual del contenedor de la lista de tareas completadas

  tasks.forEach((task, index) => { // Itera sobre el arreglo de tareas por hacer
    const taskElement = createTaskElement(task, index); // Crea un elemento de tarea para cada tarea por hacer
    taskList.appendChild(taskElement); // Agrega el elemento de tarea al contenedor de la lista de tareas por hacer
  });

  completedTasks.forEach((task, index) => { // Itera sobre el arreglo de tareas completadas
    const taskElement = createTaskElement(task, index, true); // Crea un elemento de tarea para cada tarea completada
    completedTaskList.appendChild(taskElement); // Agrega el elemento de tarea al contenedor de la lista de tareas completadas
  });
}

function createTaskElement(task, index, completed = false) { // Define una función para crear un elemento de tarea
  const taskElement = document.createElement('div'); // Crea un elemento div para la tarea
  taskElement.classList.add('task'); // Agrega la clase 'task' al elemento de la tarea
  taskElement.id = `task-${index}`; // Establece el id del elemento de la tarea

  const checkbox = document.createElement('input'); // Crea un elemento input para el checkbox
  checkbox.type = 'checkbox'; // Establece el tipo de input como checkbox
  checkbox.checked = completed; // Marca el checkbox como completado si la tarea ya está completada
  checkbox.addEventListener('change', () => toggleTask(index)); // Agrega un evento change al checkbox para cambiar el estado de completado de la tarea

  const label = document.createElement('label'); // Crea un elemento label para mostrar el texto de la tarea
  label.textContent = task; // Establece el texto de la tarea en el label

  const removeButton = document.createElement('button'); // Crea un elemento button para eliminar la tarea
  removeButton.textContent = 'Eliminar'; // Establece el texto del botón como 'Eliminar'
  removeButton.addEventListener('click', () => { // Agrega un evento click al botón para eliminar la tarea
    if (completed) { // Verifica si la tarea está completada
      completedTasks.splice(index, 1); // Elimina la tarea completada del arreglo de tareas completadas
    } else { // Si la tarea no está completada
      removeTask(index); // Llama a la función para eliminar la tarea por hacer
    }
    renderTasks(); // Llama a la función para volver a renderizar las tareas después de eliminar la tarea
  });

  taskElement.appendChild(checkbox); // Agrega el checkbox al elemento de la tarea
  taskElement.appendChild(label); // Agrega el label al elemento de la tarea
  taskElement.appendChild(removeButton); // Agrega el botón de eliminar al elemento de la tarea

  return taskElement; // Devuelve el elemento de la tarea creado
}

renderTasks(); // Llamada inicial para mostrar las tareas al cargar la página
