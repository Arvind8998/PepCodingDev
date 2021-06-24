let body = document.querySelector("body")
body.spellcheck = false

let menuBarTags = document.querySelectorAll(".menu-bar p")
let columnTags = document.querySelector(".column-tags")
let rowNumbers = document.querySelector(".row-numbers")
let grid = document.querySelector(".grid")
let formulaAddressInput = document.querySelector("#select-cell")
let prevSelectedCell = null

grid.addEventListener("click",(e)=>{
  if(e.target.classList.contains("cell")){
    if(prevSelectedCell){
      prevSelectedCell.classList.remove("grid-selected-cell")
    }
    let clickedCell = e.target;
    prevSelectedCell = clickedCell
    clickedCell.classList.add("grid-selected-cell");
    formulaAddressInput.vaue = clickedCell.getAttribute("data-address")
  }
})

for (let i = 1; i <= 100; i++) {
  let div = document.createElement("div")
  div.classList.add("row-number-cell")
  div.innerText = i
  rowNumbers.append(div)
}

for (let i = 0; i < 26; i++) {
  let div = document.createElement("div")
  div.classList.add("column-tag-cell")
  div.innerText = String.fromCharCode(65 + i)
  columnTags.append(div)
}

for (let i = 0; i < 100; i++) {
  let row = document.createElement("div")
  row.classList.add("row")
  for (let j = 1; j <= 26; j++) {
    let cell = document.createElement("div")
    cell.classList.add("cell")
    cell.contentEditable = true
    cell.setAttribute('data-address', String.fromCharCode(65 +i) + j)
    row.append(cell)
  }
  grid.append(row)
}

for (let i = 0; i < menuBarTags.length; i++) {
  menuBarTags[i].addEventListener("click", () => {
    if (menuBarTags[i].classList.contains("menu-bar-option-selected")) {
      menuBarTags[i].classList.remove("menu-bar-option-selected")
    } else {
      for (let j = 0; j < menuBarTags.length; j++) {
        menuBarTags[j].classList.remove("menu-bar-option-selected")
      }
      menuBarTags[i].classList.add("menu-bar-option-selected")
    }
  })
}
