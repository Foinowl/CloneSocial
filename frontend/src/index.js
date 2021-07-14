import "@babel/polyfill"
import "./scss/index.scss"




const btns = document.querySelectorAll(".rootButton")

const checkMouse = (el) => {
  return (e) => {


    const top = el.getBoundingClientRect().top + document.body.scrollTop
    const left = el.getBoundingClientRect().left + document.body.scrollLeft

    const relX = e.pageX - left
    const relY = e.pageY - top

    const spanEl = el.getElementsByTagName("span")[0]
    spanEl.style.top = relY + "px"
    spanEl.style.left = relX + "px"
  }

}


btns.forEach((el) => el.addEventListener("mousedown", checkMouse(el)))

