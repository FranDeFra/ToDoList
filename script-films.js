//----------------------------------------------------------------



//----------------------------------------------------------------
// !  PAGINA FILM



/*---------------
 LISTA  E FORM
----------------*/

//preparo una chiave per lo storage
const STORAGE_KEY_FILM=  '__films-list__';

//prendo gli elementi necessari
const filmsList = document.querySelector('.films-list');
const titleField = document.querySelector('#title-field');
const durationField = document.querySelector('#duration-field');
const directorField =document.querySelector('#director-field');
const descriptionField = document.querySelector('#description-field');
const form = document.querySelector('#form');

//prepariamo la lista che chiamo films
let films = [];

//controllo se c'erano elementi salvati nello storage
const prevList=localStorage.getItem(STORAGE_KEY_FILM);
//se ne trovi...
if(prevList){
    //utilizzo la lista precedente al posto di quella vuota
    films=JSON.parse(prevList);
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
    const title = titleField.value.trim();
    const duration = durationField.value.trim();
    const director = directorField.value.trim();
    const description = descriptionField.value.trim();

    //aggiungo un nuovo film
    addFilm(title, duration, director, description);

    //ripulisco il form
    form.reset();

    //chiudo il form
    closeForm();
})



/* funzione per aggiungere un film */
function addFilm(title, duration, director, description) {
    //creo un nuovo oggetto 
    const newFilm = {
        title: title,
        duration: Number(duration),
        director: director,
        description: description,
        status: "pending"
    }
    //aggiungo l'oggetto alla lista
    films.push(newFilm);
    // ! aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY_FILM, JSON.stringify(films));
    //renderizzo su schermo la lista
    renderList()
}


//funzione per renderizzare la lista
function renderList() {
    //svuoto la lista non aggiornata
    filmsList.innerHTML = '';

    //per tutti i film
    for (let i = 0; i < films.length; i++) {
        //creo il codice per un singolo elemento della lista
        const filmElement = createListElement(i);
        //lo aggangio alla lista della pagina
        filmsList.innerHTML += filmElement;
        //rendo cliccabili i bottoni
        setDeleteButtons();
    }
}


//funzione che crea un elemento della lista
function createListElement(i) {
    //recupero l'elemento
    const element = films[i];

    //se lo stato dell'oggetto è completed setto il valore di isCompleted su checked
    let isCompleted = element.status == "completed" ? "checked" : "";


    //restituisco il codice html di un elemento della lista
    return `
    <li class="list-element">
        <div class="box ${isCompleted}">
            <input onclick="updateStatus(this)" type="checkbox" id="${i}" ${isCompleted}>
            <div class="info">
                <h3 id="h3">${element.title}</h3>
            <div class="director">
                <p>${element.director}</p>
            </div>
            <p>${element.description}</p>
            </div>
            <div class="info2 duration">${element.duration}h</div>
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
        films[selectedCheck.id].status="completed";
    }else{
        taskCheck.classList.remove('checked');
        films[selectedCheck.id].status="pending";
    }
    localStorage.setItem("__films-list__", JSON.stringify(films));
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
    films.splice(index, 1);
    console.log(films);
    //aggiorno il localStorage
    localStorage.setItem(STORAGE_KEY_FILM, JSON.stringify(films));
    //rirenderizzo la lista
    renderList();
}