const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST = [];
let id = 0;

//Show today date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = "Le " + today.toLocaleDateString("fr-FR", options);

//Add Todo Function
addToDo = (toDo, id, done, trash) => {

    if(trash) return;

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
        <i class="fa ${DONE} co" action="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" action="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
};

//Complete Todo Function => TODO

// Add an item with enter key
document.addEventListener("keyup", event => {
    if(event.keyCode === 13) {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id:id,
                done:false,
                trash:false
            });
            id++;
        }
        input.value = "";
    }
});

//addToDo("Test", 1, false, true);