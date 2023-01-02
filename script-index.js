//----------------------------------------------------------------



//----------------------------------------------------------------
// !  PAGINA INDEX



/*---------------
 LISTA  E FORM
----------------*/

//preparo una chiave per lo storage
const STORAGE_KEY_TASK = '__to-do-list__';

//prendo gli elementi necessari
const taskList = document.querySelector('.to-do-list');
const activitiesField = document.querySelector('#activities-field');
const hourField = document.querySelector('#to-do-hour')
const typeField = document.querySelector('#type-field');
const descriptionField = document.querySelector('#description-field');
const form = document.querySelector('#form');

//prepariamo la lista che chiamo whatToDo
let whatToDo = [];

//controllo se c'erano elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY_TASK);
//se ne trovi...
if (prevList) {
    //utilizzo la lista precedente al posto di quella vuota
    whatToDo = JSON.parse(prevList);
    //rirenderizzo la lista
    renderList();
}


/*-------------------------------------------
 EVENTI DINAMICI PER RENDERE REATTIVO IL FORM
--------------------------------------------*/
//INTERCETTO L'INVIO DEL FORM
form.addEventListener('submit', function (event) {
    //blocco che la pagina si ricarichi (lo gestisco con JS)
    event.preventDefault();

    //raccolgo i dati dei campi
    const activity = activitiesField.value.trim();
    const hour = hourField.value.trim();
    const type = typeField.value.trim();
    const description = descriptionField.value.trim();

    //aggiungo un nuovo to do
    addToDo(activity, hour, type, description);

    //ripulisco il form
    form.reset();

    //chiudo il form
    closeForm();
})



/* funzione per aggiungere un to do */
function addToDo(activity, hour, type, description) {
    //creo un nuovo oggetto 
    const newToDo = {
        activity: activity,
        hour: hour,
        type: type,
        description: description,
        status: "pending"
    }
    //aggiungo l'oggetto alla lista
    whatToDo.push(newToDo);
    // ! aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY_TASK, JSON.stringify(whatToDo));
    //renderizzo su schermo la lista
    renderList()
}


//funzione per renderizzare la lista
function renderList() {
    //svuoto la lista non aggiornata
    taskList.innerHTML = '';

    //per tutti i to do
    for (let i = 0; i < whatToDo.length; i++) {
        //creo il codice per un singolo elemento della lista
        const todoElement = createListElement(i);
        //lo aggangio alla lista della pagina
        taskList.innerHTML += todoElement;
        //rendo cliccabili i bottoni
        setDeleteButtons();
    }
}


//funzione che crea un elemento della lista
function createListElement(i) {
    //recupero l'elemento
    const element = whatToDo[i];

    //se lo stato dell'oggetto è completed setto il valore di isCompleted su checked
    let isCompleted = element.status == "completed" ? "checked" : "";


    //restituisco il codice html di un elemento della lista
    return `
    <li class="list-element">
        <div class="box ${isCompleted}">
            <input onclick="updateStatus(this)" type="checkbox" id="${i}" ${isCompleted}>
            <div class="info">
                <h3>${element.activity}</h3>
                <div class="select-hour">
                    <select id="to-do-hour" title="Orario" aria-label="Seleziona un orario">
                        <option value="0">h: ${element.hour}:00</option>
                    </select>
                </div>
                <p>${element.description}</p>
            </div>
            <div class="info2 type">${element.type}</div>
            <button class="trash" data-index="${i}">
                <i class="bi bi-trash-fill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </i>
            </button>
        </div>
    </li>
    `
}




//funzione per barrare il box
function updateStatus(selectedCheck) {
    let taskCheck = selectedCheck.parentElement;
    if (selectedCheck.checked) {
        taskCheck.classList.add('checked');
        whatToDo[selectedCheck.id].status = "completed";
    } else {
        taskCheck.classList.remove('checked');
        whatToDo[selectedCheck.id].status = "pending";
    }
    localStorage.setItem("__to-do-list__", JSON.stringify(whatToDo));
}


//funzione per attivare i bottoni di cancellazione
function setDeleteButtons() {
    //Recuperare tutti i bottoni dei regali
    const deleteButtons = document.querySelectorAll('.trash')

    //per ogni bottone 
    for (let i = 0; i < deleteButtons.length; i++) {
        //recupero il singolo bottone
        const button = deleteButtons[i];
        //aggiungo eventlistner (il click)
        button.addEventListener('click', function () {
            //individuo l'index corrispondente
            const index1 = button.dataset.index;
            //rimuovo dalla lista il to do corrispondente
            removeToDo(index1);
        })
    }
}


//funzione per rimuovere il to do dalla lista
function removeToDo(index1) {
    //rimuovo il to do dall'array
    whatToDo.splice(index1, 1);
    console.log(whatToDo);
    //aggiorno il localStorage
    localStorage.setItem(STORAGE_KEY_TASK, JSON.stringify(whatToDo));
    //rirenderizzo la lista
    renderList();
}