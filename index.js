import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: databaseURL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsement")

const publishBtn = document.querySelector("#publish-btn")
const endorsementEl = document.querySelector("#endorsement-el")
const endorsementsEl = document.querySelector("#endorsements-el")

publishBtn.addEventListener("click", function(){
    let inputVal = endorsementEl.value
    push(endorsementInDB, inputVal)
    
    clearEndorsementInputEl()
})

onValue(endorsementInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
        
        clearEndorsementsListEl()

        for (let i = 0; i < endorsementArray.length; i++) {
            let currentEndorsement = endorsementArray[i]
            
            appendEndorsementToListEl(currentEndorsement)
        }    
    } else {
        endorsementsEl.innerHTML = "No items here... yet"
    }
})

function clearEndorsementInputEl() {
    endorsementEl.value = ""
}

function clearEndorsementsListEl() {
    endorsementsEl.innerHTML = ""
}

function appendEndorsementToListEl(endorsement) {
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]
    
    let newEl = document.createElement("div")
    newEl.classList.add("endorsement")
    
    let p = document.createElement("p")
    p.textContent = endorsementValue
    
    newEl.appendChild(p)
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfEndorsementInDB = ref(database, `endorsement/${endorsementID}`)
        
        remove(exactLocationOfEndorsementInDB)
    })
    
    endorsementsEl.append(newEl)
}
