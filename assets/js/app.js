const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

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

//LoadList Function
loadList = array => {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
};

// Get Items From LocalStorage
let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); //load the list to the user interface
}
else
{
    LIST = [];
    id = 0;
}

// clear data from localstorage
clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//Complete Todo Function
completeToDo = element => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    //Same as =>  LIST[element.id].done = LIST[element.id].done ? false : true;
    LIST[element.id].done = !LIST[element.id].done;
};

//Remove Todo Function
removeToDo = element => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
};

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
            //Add Item to the LocalStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

//When clicked in checkbox or delete
list.addEventListener("click", event => {
    const element = event.target; //Return the cliked element inside list
    const elementAction = element.attributes.action.value; // Return complete or delete

    if(elementAction === "complete")
    {
        completeToDo(element);
    }
    else if(elementAction === "delete")
    {
        removeToDo(element);
    }
    //Add Item to the LocalStorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
