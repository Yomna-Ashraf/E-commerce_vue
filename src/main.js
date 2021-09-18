import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

createApp(App).use(store).use(router).mount('#app')

/*==================NavResponsive==================*/
const nav = document.getElementById("responsive-nav");
const navBtn = document.getElementById("responsive-btn");
console.log(nav);
console.log(navBtn)
navBtn.addEventListener("click",function(){
  if (nav.className === "right-nav") {
    nav.className += "min";
  } else {
    nav.className = "right-nav";
  }
})
const mediaQuery = window.matchMedia('(min-width: 800px)')

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    nav.className = "right-nav";

  }
  /*else{
    menu.style.display = "none"
  }*/
}

// Register event listener
mediaQuery.addListener(handleTabletChange)
handleTabletChange(mediaQuery)
/*--------------ProductQuantity-------------------*/
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}