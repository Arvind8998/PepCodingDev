let body = document.querySelector("body")
body.spellcheck = false

let menuBarTags = document.querySelectorAll(".menu-bar p")

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
