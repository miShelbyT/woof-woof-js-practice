// DOM ELEMENTS
const dogBar = document.querySelector("#dog-bar")
const dogDiv = document.querySelector("#dog-info")
const dogSpan = document.createElement("span")
const dogContainer = document.querySelector("#dog-summary-container")
const dogInfo = document.querySelector("#dog-info")
const filterButton = document.querySelector("#good-dog-filter")

// UPDATE-FETCH
const goodDogFetch = (id, updatedDog) => {
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ isGoodDog: updatedDog }),
  })
    .then(response => response.json())
    .then(updatedPup => {
      renderOnePup(updatedPup)
    })
}

// RENDERS

const renderPupSpan = (puppy) => {
  const dogSpan = document.createElement("span")
  dogSpan.textContent = puppy.name
  dogSpan.dataset.id = puppy.id
  dogBar.append(dogSpan)
}

const renderOnePup = (puppy) => {
  dogDiv.innerHTML = ""
  dogDiv.dataset.id = puppy.id
  if (puppy.isGoodDog === true) {
    puppy.isGoodDog = "Good Dog"
  }
  else {
    puppy.isGoodDog = "Bad Dog"
  }
  dogDiv.innerHTML = `<img src=${puppy.image}>
  <h2>${puppy.name}</h2>
  <button>${puppy.isGoodDog}</button>
  `
}

// needed to create dogSpan variable in global scope and local scope so addPupToPage could access. If it was only globally scoped I was able to get only 1 dog span to render. oops.

// EVENT HANDLERS
const addPupToPage = (event) => {
  if (event.target.matches("span")) {
    const id = event.target.dataset.id
    fetch(`http://localhost:3000/pups/${id}`)
      .then(response => response.json())
      .then(pupper => renderOnePup(pupper))
  }
}

const changePupLikes = (event) => {
  if (event.target.matches("button")) {
    const div = event.target.closest("div")
    const id = div.dataset.id
    const goodButton = document.querySelector("#dog-info button")

    if (goodButton.textContent === "Bad Dog") {
      goodButton.textContent = "Good Dog"
      let updatedDog = true
      goodDogFetch(id, updatedDog)
    }
    else if (goodButton.textContent === "Good Dog") {
      goodButton.textContent = "Bad Dog"
      let updatedDog = false
      goodDogFetch(id, updatedDog)
    }
  }
}

const filterPups = (event) => {
  if (filterButton.textContent === "Filter good dogs: OFF") {
    filterButton.textContent = "Filter good dogs: ON"
    dogBar.textContent = ""
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
      .then(pupsArray => {
        pupsArray.forEach(pupObj => {
          if (pupObj.isGoodDog === true) {
            let goodDog = pupObj
            console.log(goodDog)
            renderPupSpan(goodDog)
          }
        })
      })
  }
  else if (filterButton.textContent === "Filter good dogs: ON") {
    filterButton.textContent = "Filter good dogs: OFF"
    dogBar.textContent = ""
    initializePups()
  }
}

// EVENTLISTENERS

dogBar.addEventListener("click", addPupToPage)
dogInfo.addEventListener("click", changePupLikes)
filterButton.addEventListener("click", filterPups)

// INITIALIZE

const initializePups = () => {
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pupsArray => {
      pupsArray.forEach(pupObj => {
        renderPupSpan(pupObj)
      })
    })
}

initializePups()

// initially thought I'd need to render all filtered pups to dog-info div. realized that this isn't in the deliverables but i liked the code, i very nearly had them filtered just the way I wanted them. So keeping the code!

// const renderOneFilterPup = (puppy) => {
//   const dogP = document.createElement("p")
//   dogP.dataset.id = puppy.id
//   if (puppy.isGoodDog === true) {
//     puppy.isGoodDog = "Good Dog"
//   }
//   else {
//     puppy.isGoodDog = "Bad Dog"
//   }
//   dogP.innerHTML = `<img src=${puppy.image}>
//   <h2>${puppy.name}</h2>
//   <button>${puppy.isGoodDog}</button>
//   `
//   dogDiv.append(dogP)
// }
