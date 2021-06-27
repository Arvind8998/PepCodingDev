let body = document.querySelector("body")
body.spellcheck = false

let menuBarTags = document.querySelectorAll(".menu-bar p")
let columnTags = document.querySelector(".column-tags")
let rowNumbers = document.querySelector(".row-numbers")
let grid = document.querySelector(".grid")
let container = document.querySelector(".container")

let formulaAddressInput = document.querySelector("#formula-cell")
let fragmentDiv = document.createElement("div")
let dataObj = {}

function removeFromUpstream(dependent, onWhichItIsDepending) {
  let newDownstream = []
  let oldDownstream = dataObj[onWhichItIsDepending].downstream
  newDownstream = oldDownstream.filter((el) => el !== dependent)
  dataObj[onWhichItIsDepending].downstream = newDownstream
}

function addToDownstream(tobeAdded, inWhichWeAreAdding) {
  //get downstream of the cell in which we have to add
  let reqDownstream = dataObj[inWhichWeAreAdding].downstream

  reqDownstream.push(tobeAdded)
}

function removeFromUpstream(dependent, onWhichItIsDepending) {
  let newDownstream = []

  let oldDownstream = dataObj[onWhichItIsDepending].downstream

  for (let i = 0; i < oldDownstream.length; i++) {
    if (oldDownstream[i] != dependent) newDownstream.push(oldDownstream[i])
  }
  dataObj[onWhichItIsDepending].downstream = newDownstream
}

function updateDownstreamElements(elementAddress) {
  //1- jis element ko update kr rhe hai unki upstream elements ki current value leao
  //unki upstream ke elements ka address use krke dataObj se unki value lao
  //unhe as key value pair store krdo valObj naam ke obj me
  let valObj = {}

  let currCellUpstream = dataObj[elementAddress].upstream

  for (let i = 0; i < currCellUpstream.length; i++) {
    let upstreamCellAddress = currCellUpstream[i]
    let upstreaCellValue = dataObj[upstreamCellAddress].value

    valObj[upstreamCellAddress] = upstreaCellValue
  }

  //2- jis element ko update kr rhe hai uska formula leao
  let currFormula = dataObj[elementAddress].formula
  //formula ko space ke basis pr split maro
  let forumlaArr = currFormula.split(" ")
  //split marne ke baad jo array mili uspr loop ara and formula me jo variable h(cells) unko unki value se replace krdo using valObj
  for (let j = 0; j < forumlaArr.length; j++) {
    if (valObj[forumlaArr[j]]) {
      forumlaArr[j] = valObj[forumlaArr[j]]
    }
  }

  //3- Create krlo wapis formula from the array by joining it
  currFormula = forumlaArr.join(" ")

  //4- evaluate the new value using eval function
  let newValue = eval(currFormula)

  //update the cell(jispr function call hua) in dataObj
  dataObj[elementAddress].value = newValue

  //5- Ui pr update krdo new value
  let cellOnUI = document.querySelector(`[data-address=${elementAddress}]`)
  cellOnUI.innerText = newValue

  //6- Downstream leke ao jis element ko update kra just abhi kuki uspr bhi kuch element depend kr sakte hai
  //unko bhi update krna padega
  let currCellDownstream = dataObj[elementAddress].downstream

  //check kro ki downstream me elements hai kya agr han to un sab pr yehi function call krdo jise wo bhi update hojai with new value
  if (currCellDownstream.length > 0) {
    for (let k = 0; k < currCellDownstream.length; k++) {
      updateDownstreamElements(currCellDownstream[k])
    }
  }
}


for (let i = 1; i <= 100; i++) {
  let div = document.createElement("div")
  div.classList.add("row-number-cell")
  div.innerText = i
  rowNumbers.append(div)
}

for (let i = 0; i < 26; i++) {
  let div = document.createElement("div")
  let resizeRight = document.createElement("div")
  resizeRight.classList.add("resizer", "resizer-r")
  div.classList.add("column-tag-cell")
  div.innerText = String.fromCharCode(65 + i)
  div.append(resizeRight)
  columnTags.append(div)
}

const ele = document.querySelectorAll(".column-tag-cell")
// The current position of mouse
let x = 0
let y = 0

// The dimension of the element
let w = 0
let h = 0

// Handle the mousedown event
// that's triggered when user drags the resizer
const mouseDownHandler = function (e) {
  // Get the current mouse position
  x = e.clientX
  // y = e.clientY;

  // Calculate the dimension of element
  const styles = window.getComputedStyle(e.target)
  w = parseInt(styles.width, 10)
  // h = parseInt(styles.height, 10);

  // Attach the listeners to `document`
  document.addEventListener("mousemove", mouseMoveHandler)
  document.addEventListener("mouseup", mouseUpHandler)
}

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x
  // const dy = e.clientY - y;

  // Adjust the dimension of element
  e.target.style.width = `${w + dx}px`
  // ele.style.height = `${h + dy}px`;
}

const mouseUpHandler = function () {
  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", mouseMoveHandler)
  document.removeEventListener("mouseup", mouseUpHandler)
}
// Query all resizers
const resizers = document.querySelector(".resizer")

// Loop over them
Array.prototype.forEach.call(ele, function (resizer) {
  resizer.addEventListener("mousedown", mouseDownHandler)
})

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

let fragmentCreator = async () => {
  let fragmentsGetter = () => {
    for (let i = 1; i <= 100; i++) {
      let row = document.createElement("div")
      row.classList.add("row")
      for (let j = 0; j < 26; j++) {
        let cell = document.createElement("div")

        cell.classList.add("cell")

        cell.contentEditable = true
        let address = String.fromCharCode(j + 65) + i
        cell.setAttribute("data-address", address)
        dataObj[address] = {
          value: "",
          formula: "",
          upstream: [],
          downstream: [],
        }
        row.append(cell)
      }
      fragmentDiv.append(row)
    }
  }

  let fragments = await fragmentsGetter()
  console.log(fragments)
  grid.append(fragmentDiv)
}

window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY
  console.log(scroll)
})

fragmentCreator()

let myDebounce = function (callback, delay) {
  let context = this,
    args = arguments
  let timer
  return function (...args2) {
    debugger
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(context, [...args, ...args2])
    }, delay)
  }
}

let setCellFormulaCalculation = function (...args) {
  let e = args[args.length-2]
  let prevSelectedCell = args[args.length-1]
  debugger
  if (e.target.id === "complete-formula") {
    let formula = e.target.value //"2 * A1"

    let selectedCellAddress = prevSelectedCell.getAttribute("data-address")

    dataObj[selectedCellAddress].formula = formula

    let forumlaArr = formula.split(" ") //["2","*","A1"]

    let elementsArray = []

    for (let i = 0; i < forumlaArr.length; i++) {
      if (
        forumlaArr[i] != "+" &&
        forumlaArr[i] != "-" &&
        forumlaArr[i] != "*" &&
        forumlaArr[i] != "/" &&
        isNaN(Number(forumlaArr[i]))
      ) {
        elementsArray.push(forumlaArr[i])
      }
    }

    //BEFORE SETTING NEW UPSTREAM
    //CLEAR OLD UPSTREAM

    let oldUpstream = dataObj[selectedCellAddress].upstream

    for (let k = 0; k < oldUpstream.length; k++) {
      removeFromUpstream(selectedCellAddress, oldUpstream[k])
    }

    dataObj[selectedCellAddress].upstream = elementsArray
    for (let j = 0; j < elementsArray.length; j++) {
      addToDownstream(selectedCellAddress, elementsArray[j])
    }
    let valObj = {}

    for (let i = 0; i < elementsArray.length; i++) {
      let formulaDependency = elementsArray[i]

      valObj[formulaDependency] = dataObj[formulaDependency].value
    }

    for (let j = 0; j < formulaArr.length; j++) {
      if (valObj[formulaArr[j]]) {
        formulaArr[j] = valObj[formulaArr[j]]
      }
    }

    formula = formulaArr.join(" ")
    let newValue = eval(formula)

    dataObj[selectedCellAddress].value = newValue

    let selectedCellDownstream = dataObj[selectedCellAddress].downstream

    for (let i = 0; i < selectedCellDownstream.length; i++) {
      updateDownstreamElements(selectedCellDownstream[i])
    }

    oldCell.innerText = newValue
    forumlaInput.value = ""
  } else {
    let address = e.target.getAttribute("data-address")
    dataObj[address].value = Number(e.target.innerText)
    dataObj[address].formula = ""

    //upstream clear
    let currCellUpstream = dataObj[address].upstream

    for (let i = 0; i < currCellUpstream.length; i++) {
      removeFromUpstream(address, currCellUpstream[i])
    }

    dataObj[address].upstream = []
    //downstream cells update

    let currCellDownstream = dataObj[address].downstream

    for (let i = 0; i < currCellDownstream.length; i++) {
      updateDownstreamElements(currCellDownstream[i])
    }
  }
}

let setBetterFormulaValues = myDebounce(setCellFormulaCalculation, 3000)

let excelCellsEventsClosure = () => {
  let prevResizableColCell = null
  let prevSelectedCell = null
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      if (prevSelectedCell) {
        prevSelectedCell.classList.remove("grid-selected-cell")
      }
      let clickedCell = e.target
      prevSelectedCell = clickedCell
      clickedCell.classList.add("grid-selected-cell")
      formulaAddressInput.value = clickedCell.getAttribute("data-address")
    } else if (e.target.classList.contains("column-tag-cell")) {
      if (prevResizableColCell)
        prevResizableColCell.classList.remove("selected-resizable-col")
      prevResizableColCell = e.target
      e.target.classList.add("selected-resizable-col")
    }
  })
    container.addEventListener("change", e=>setBetterFormulaValues(e,prevSelectedCell))
  }

excelCellsEventsClosure()
