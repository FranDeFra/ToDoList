
/*--------------------
  CALENDARIO
  -------------------*/


/* prendo gli elementi che mi servono */

const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");


/* calcolo per ottener nuova data, 
mese e anno corrente*/
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

/* creo un array contenente i mesi*/
const months = ["Jan", " Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];

/* inserisco data e giorni 
correnti nel calendario*/
const renderCalendar = () => {

    /* rendo i giorni dinamici */

    //per ottenere il primo giorno 
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    //per ottenere l'ultima data del mese
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    //per ottenere l'ultimo giorno del mese
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    //per ottenere l'ultimo giorno del mese successivo
    let lastDatofLastMonth = new Date(currYear, currMonth, 0).getDate();
    //con un ciclo creo i giorni del mese
    let liTag = "";

    //creo i giorni del mese precedente
    for (let i = firstDayofMonth; i > 0; i--) {
        /*metto i giorni del mese precedente
        creati con il ciclo nel calendario*/
        liTag += `<li class=inactive>${lastDatofLastMonth - i + 1}</li>`;
    }

    //creo i giorni del mese corrente
    for (let i = 1; i <= lastDateofMonth; i++) {
        //evidenzio il giorno corrente
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        /*metto i giorni creati 
        con il ciclo nel calendario*/
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    //creo i giorni del mese successivo
    for (let i = lastDayofMonth; i < 6; i++) {
        /*metto i giorni del mese successivo 
        creati con il ciclo nel calendario*/
        liTag += `<li class=inactive>${i - lastDayofMonth + 1}</li>`;
    }

    /* -------------Giorni dinamici fine------*/

    //inserisco la data corrente nell'header 
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    //inserisco i giorni del mese
    daysTag.innerHTML = liTag;
}
renderCalendar();

//rendo dinamiche le icone di precedente e successivo
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        //restituisco i mesi precedenti e successivi
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        //se l'anno finisce
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    })

})
//----------------------------------------------------------



//---------------------------------------------------------------------
/*---------------------
   MODALE
--------------------*/

/* prendo gli elementi che mi servono */
const menu = document.querySelector('#menu-button');
const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector('.close-modal');
/*---------------
 Eventi dinamici
---------------*/

//apro la modale
menu.addEventListener('click', function () {
    openModal();
})

//chiudo la modale
closeModalButton.addEventListener('click', function () {
    closeModal();
})


/*--------------
Funzioni
---------------*/

//funzione per aprire modale
function openModal() {
    modal.classList.remove('modal-hidden');
}

//funzione per chiudere modale
function closeModal() {
    modal.classList.add('modal-hidden');
}



/*-----------------------
  APERTURA E CHIUSURA FORM
-------------------------*/

/*prendo gli elementi necessari*/
const addFormButton = document.querySelector('.add-form');
const closeFormButton = document.querySelector('.close-form');
const listForm = document.querySelector('#list-form');

/*---------------
 Eventi dinamici
---------------*/

//apro il form
addFormButton.addEventListener('click', function () {
    openForm();
})

//chiudo il form
closeFormButton.addEventListener('click', function () {
    closeForm();
})

//funzione per aprire form
function openForm() {
    listForm.classList.remove('form-hidden');
}

//funzione per chiudere form
function closeForm() {
    listForm.classList.add('form-hidden');
}