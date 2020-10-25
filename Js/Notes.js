showNotes();
let addBtn = document.getElementById('addBtn');

// Add the note to local storage on click of "Add" button
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = {};
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj[addTitle.value] = addTxt.value;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
});

//creating a new div with added note 
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    for(let title in notesObj) {
        html += `
            <div class="add-notes noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <hr>
                        <p class="card-text"> ${notesObj[title]}</p>
                        <hr>
                        <button id="${title}"onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete Note</button>
                    </div>
                </div>`;
    }
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `No notes yet. Add notes from above`;
    }

}

//deleting a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = {};
    } else {
        notesObj = JSON.parse(notes);
    }
    delete notesObj[index];
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// shortlist notes by keyword
let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputval)||cardTitle.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});