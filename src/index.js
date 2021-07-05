document.addEventListener("DOMContentLoaded", function(){
    const dogBar = document.getElementById('dog-bar')
    const showContainer = document.getElementById('dog-summary-container')
    const filterButton = document.getElementById('good-dog-filter')
    const listDogs = function(dog){
        if(dog.isGoodDog === true || filterButton.innerText === 'Filter good dogs: OFF'){
            let dogButton = document.createElement('button')
            dogButton.innerText = dog.name
            dogButton.id = 'dog-bar'
            dogBar.append(dogButton)
            dogButton.addEventListener('click', () => {
                let showDog = document.createElement('div')
                showDog.id = 'dog-info'
                let buttonText
                if (dog.isGoodDog){
                    buttonText = 'Bad Dog'
                } else {
                    buttonText = 'Good Dog'
                }
                showDog.innerHTML =
                    `<img src = "${dog.image}"/>
                    <h2>${dog.name}</h2>
                    <button class= 'like-btn' data-id=${dog.id}>${buttonText}</button>`
                if (showContainer.childElementCount === 0){
                    showContainer.appendChild(showDog)
                } else {
                    showContainer.innerHTML = ''
                    showContainer.appendChild(showDog)
                }
                showDog.addEventListener('click', (e) => {
                    if (e.target.className === 'like-btn'){
                        e.preventDefault()
                        let goodDog
                        if (e.target.innerText === 'Bad Dog'){
                            goodDog = false
                            e.target.innerText = 'Good Dog'
                        } else {
                            goodDog = true
                            e.target.innerText = 'Bad Dog'
                        }
                        fetch(`http://localhost:3000/pups/${e.target.dataset.id}`,{
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json",
                                accept: "application/json"
                            },
                            body: JSON.stringify({'isGoodDog':goodDog})
                        })
                        dogBar.innerHTML = ''
                        fetch('http://localhost:3000/pups')
                            .then(resp => resp.json())
                            .then(pups => pups.forEach(dog => listDogs(dog)))
                    }
                })
            })
        }
    }
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(pups => pups.forEach(dog => listDogs(dog)))
    filterButton.addEventListener('click', () => {
        if(filterButton.innerText === 'Filter good dogs: OFF'){
            filterButton.innerText = 'Filter good dogs: ON'
        } else {
            filterButton.innerText = 'Filter good dogs: OFF'
        }
        dogBar.innerHTML = ''
        fetch('http://localhost:3000/pups')
            .then(resp => resp.json())
            .then(pups => pups.forEach(dog => listDogs(dog)))
    })
})