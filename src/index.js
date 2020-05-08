document.addEventListener("DOMContentLoaded", init)

function init(e){
    fetchDogs()
}

function fetchDogs() {
    return fetch('http://localhost:3000/pups')
           .then(resp => resp.json())
           .then(data => addDogsToBar(data))
} 

function changeDogFilter(e) {
    let filterButton = document.getElementById(`${e.target.id}`)
    if (filterButton.innerText == "Filter good dogs: OFF") {
    fetchDogs()
    filterButton.innerText = `Filter good dogs: ON`
    } else {
        fetchDogs()
        filterButton.innerText = 'Filter good dogs: OFF'
    }
}


function addDogsToBar(dogs) {
    let div = document.getElementById('dog-bar')
    div.innerHTML = ``
    let filterButton = document.getElementById('good-dog-filter')
    filterButton.addEventListener('click', changeDogFilter)
    console.log(filterButton.innerText)
    if (filterButton.innerText == "Filter good dogs: OFF") {
    dogs.forEach(dog => {
        let span = document.createElement('span')
        span.innerText = `${dog.name}`
        span.dataset.id = dog.id
        span.addEventListener('click', onDogSpanClick)
        div.appendChild(span)
    })} else {
        let goodDogs = []
        dogs.forEach(dog => {
            if (dog.isGoodDog == true) {
                goodDogs.push(dog)
            }
        })
        goodDogs.forEach(dog => {
            let span = document.createElement('span')
            span.innerText = `${dog.name}`
            span.dataset.id = dog.id
            span.addEventListener('click', onDogSpanClick)
            div.appendChild(span)
        })
    }
}

function onDogSpanClick(e) {
    fetchSingleDog(e.target.dataset.id)
}

function fetchSingleDog(dogID) {
    return fetch(`http://localhost:3000/pups/${dogID}`)
           .then(resp => resp.json())
           .then(data => showDogInfo(data))
}

function showDogInfo(dog) {
    let div = document.getElementById('dog-info')
    div.innerHTML = ""
    let img = document.createElement('img')
    img.src = `${dog.image}`
    img.alt = 'Dog Picture'
    let h2 = document.createElement('h2')
    h2.innerText = `${dog.name}`
    let button = document.createElement('button')
    button.id = `${dog.id}`
    button.className = `dog-button`
    if (dog.isGoodDog == true) {
        button.innerText = 'Good Dog!'
    } else {
        button.innerText = 'Bad Dog!'
    }
    button.addEventListener('click', onDogBehaviorButtonClick)
    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(button)
}

function onDogBehaviorButtonClick(e) {
    let dogObj = {}
    let dogStatus = e.target.innerText 
    let div = document.getElementById('dog-info')
    let button = div.getElementsByClassName('dog-button')[0]
    let h2 = e.target.parentNode.querySelector('h2')
    let pic = e.target.parentNode.querySelector('img')
    
    let id = parseInt(button.id, 10)
    let name = h2.innerText.toString()
    let image = pic.src.toString() 

    if (dogStatus == 'Bad Dog!') {
        let status = true
        dogObj = {
            id: id,
            name: name,
            isGoodDog: status,
            image: image
        }
        patchDog(id, dogObj)
        button.innerText = 'Good Dog!'
    } else {
        let status = false
        dogObj = {
            id: id,
            name: name,
            isGoodDog: status,
            image: image
        }
        patchDog(id, dogObj)
        button.innerText = 'Bad Dog!'
    }
}

function patchDog(dogID, dogObj) {
    return fetch(`http://localhost:3000/pups/${dogID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dogObj), 
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}