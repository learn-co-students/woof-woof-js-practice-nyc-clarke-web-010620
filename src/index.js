
window.addEventListener('DOMContentLoaded', (event) => {
let dogDiv = document.querySelector("#dog-info")
let dogBar = document.querySelector("#dog-bar")
let eachDog = document.querySelectorAll("#each-dog")    
    fetch('http://localhost:3000/pups')
    .then((response) => {
      return response.json();
    })
    .then((dogs) => {
      listDogs(dogs)
    //   dogInfo(dogs)
    });

    function listDogs(dogs){
        dogs.forEach(dog => {
            
            console.log(dogBar)
        let eachDog = document.createElement("span")
        eachDog.id = dog.id
        eachDog.className = "each-dog"
            eachDog.innerHTML = dog.name
            dogBar.append(eachDog)
        });
        
    }


dogBar.addEventListener("click", event =>{
    if (event.target.className === "each-dog") {
        
    
    fetch(`http://localhost:3000/pups/${event.target.id}`)
    .then((response) => {
        return response.json();
      })
      .then((dog) => {
        dogDiv.innerHTML =  `<img src=${dog.image}>
         <h2>${dog.name}</h2>
         `
        let button = document.createElement("button")
        button.id = dog.isGoodDog
        button.dataset.id = dog.id
        button.className = "dog-status"
        console.log()
        if (dog.isGoodDog === true) {
        button.innerText = "Good Dog!"
        }else{
        button.innerText = "Bad Dog!"
        }
        dogDiv.append(button)
      });
    }

dogDiv.addEventListener("click", event =>{

  if (event.target.className) {
let dogStatus = event.target.id

event.target.id === false ? event.target.id = true : event.target.id = false
// console.log(dogStatus)

// event.target.id == "false" ? event.target.innerText = "Bad Dog!" : event.target.innerText = "Good Dog!"

// console.log(dogStaus)

const data = { isGoodDog: dogStatus };

fetch(`http://localhost:3000/pups/${event.target.dataset.id}`, {
  method: 'PATCH', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => response.json())
.then((data) => {
    event.target.id === false ? event.target.innerText = "Bad Dog!" : event.target.innerText = "Good Dog!"

//  event.target.id == "false" ? event.target.id = true : event.target.id = false
}) //end of fetch
}
})//event listener

})




    // let dogDiv = document.querySelector("#dog-info")
    // console.log(dogInfo)   
    // dogDiv = document.createElement("div")
    // dogDiv.innerHTML =  `<img src=${dogs.image}>
    // <h2>${dogs.image}</h2>
    // <button>${dogs.isGoodDog}</button>`
    // // eventlistener for click
    // dogInfo.append(dogDiv)
    
    
// }
// function dogInfo(data) {
    // let dogInfo = document.querySelector("#dog-info")
});//dom loaded