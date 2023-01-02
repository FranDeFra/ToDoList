//----------------------------------------------------------------



//----------------------------------------------------------------
// !  PAGINA TTAVELS



/*---------------
 LISTA  E FORM
----------------*/

//preparo una chiave per lo storage
const STORAGE_KEY_TRAVEL=  '__travels-list__';

//prendo gli elementi necessari
const travelsList = document.querySelector('.travels-list');
const nationField = document.querySelector('#nation-field');
const distanceField = document.querySelector('#distance-field');
const cityField =document.querySelector('#city-field');
const descriptionField = document.querySelector('#description-field');
const form = document.querySelector('#form');

//prepariamo la lista che chiamo travels
let travels = [];

//controllo se c'erano elementi salvati nello storage
const prevList=localStorage.getItem(STORAGE_KEY_TRAVEL);
//se ne trovi...
if(prevList){
    //utilizzo la lista precedente al posto di quella vuota
    travels=JSON.parse(prevList);
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
    const nation = nationField.value.trim();
    const distance = distanceField.value.trim();
    const city = cityField.value.trim();
    const description = descriptionField.value.trim();

    //aggiungo un nuovo film
    addTravel(nation, distance, city, description);

    //ripulisco il form
    form.reset();

    //chiudo il form
    closeForm();
})



/* funzione per aggiungere un travel */
function addTravel(nation, distance, city, description) {
    //creo un nuovo oggetto 
    const newTravel = {
        nation: nation,
        distance: Number(distance),
        city: city,
        description: description,
        status: "pending"
    }
    //aggiungo l'oggetto alla lista
    travels.push(newTravel);
    // ! aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY_TRAVEL, JSON.stringify(travels));
    //renderizzo su schermo la lista
    renderList()
}


//funzione per renderizzare la lista
function renderList() {
    //svuoto la lista non aggiornata
    travelsList.innerHTML = '';

    //per tutti i film
    for (let i = 0; i < travels.length; i++) {
        //creo il codice per un singolo elemento della lista
        const travelElement = createListElement(i);
        //lo aggangio alla lista della pagina
        travelsList.innerHTML += travelElement;
        //rendo cliccabili i bottoni
        setDeleteButtons();
    }
}


//funzione che crea un elemento della lista
function createListElement(i) {
    //recupero l'elemento
    const element = travels[i];

    //se lo stato dell'oggetto è completed setto il valore di isCompleted su checked
    let isCompleted = element.status == "completed" ? "checked" : "";

    //restituisco il codice html di un elemento della lista
    return `
    <li class="list-element">
        <div class="box ${isCompleted}">
            <input onclick="updateStatus(this)" type="checkbox" id="${i}" ${isCompleted}>
            <div class="info">
                <h3 id="h3">${element.nation}</h3>
                <div class="city">
                    <p>${element.city}</p>
                </div>
                <p>${element.description}</p>
            </div>
            <div class="info2 distance">${element.distance}km</div>
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
function updateStatus(selectedCheck){
    let taskCheck=selectedCheck.parentElement;
    if(selectedCheck.checked){
        taskCheck.classList.add('checked');
        whatToDo[selectedCheck.id].status="completed";
    }else{
        taskCheck.classList.remove('checked');
        whatToDo[selectedCheck.id].status="pending";
    }
    localStorage.setItem("__travels-list__", JSON.stringify(travels));
}




//funzione per attivare i bottoni di cancellazione
function setDeleteButtons() {
    //Recuperare tutti i bottoni delle liste
    const deleteButtons = document.querySelectorAll('.trash')

    //per ogni bottone 
    for (let i = 0; i < deleteButtons.length; i++) {
        //recupero il singolo bottone
        const button = deleteButtons[i];
        //aggiungo eventlistner (il click)
        button.addEventListener('click', function () {
            //individuo l'index corrispondente
            const index = button.dataset.index;
            //rimuovo dalla lista il film corrispondente
            removeFilm(index);
        })
    }
}


//funzione per rimuovere il film dalla lista
function removeFilm(index) {
    //rimuovo il film dall'array
    travels.splice(index, 1);
    console.log(travels);
    //aggiorno il localStorage
    localStorage.setItem(STORAGE_KEY_TRAVEL, JSON.stringify(travels));
    //rirenderizzo la lista
    renderList();
}