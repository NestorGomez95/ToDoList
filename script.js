const date = document.querySelector('#date')
const List = document.querySelector('#List')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const linethrough = 'line-through'
let id
let LIST

//date creation

const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('en-CA', {weekday: 'long', month:'short', day:'numeric'})

//function add-task

function addtask (task, id, Done, Erased) {
    
    if (Erased) {return}
    
    const DONE = Done? check : uncheck
    const LINE = Done? linethrough : ''
   
    const element = ` <li id="element">
                      <i class="fa ${DONE}" data="Done" id="${id}"></i>
                      <p class="text ${LINE}"> ${task}</p>
                      <i class="fa-solid fa-trash-can" data="Erased" id="${id}"></i>

                      </li>  
                     `

    List.insertAdjacentHTML("beforeend", element)
}

//function of taskDone

function TaskDone(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(linethrough)
    LIST[element.id].Done = LIST[element.id].Done ? false: true

}

//function Erased task

function TaskErased(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].Erased = true
    console.log(LIST)
}

botonEnter.addEventListener('click', ()=> {
    const task = input.value
    if (task) {
        addtask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            Done: false,
            Erased: false

        })
    
        localStorage.setItem('Todo', JSON.stringify(LIST))
        id++
        input.value=''
    }
})

document.addEventListener('keyup', function(event){
    if (event.key=='Enter'){
        const task = input.value
        if (task){
            addtask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            Done: false,
            Erased: false
    
        })
        
        localStorage.setItem('Todo', JSON.stringify(LIST))
        input.value=''
        id++
        console.log(LIST)
        }
    }
})

List.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData =='Done'){
        TaskDone(element)
    }
    else if (elementData=='Erased'){
        TaskErased(element)
    }
    localStorage.setItem('Todo', JSON.stringify(LIST))
})


//local storage get item

let data = localStorage.getItem('Todo')
if (data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
} else {
    LIST = []
    id = 0
}

function loadList(DATA) {
    DATA.forEach(function(i){
        addtask(i.name,i.id,i.Done,i.Erased)
    })
}