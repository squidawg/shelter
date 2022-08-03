import {readJSON} from "./readJSON.js";
import {generateCardAppend} from "./generateCardAppend.js";
import {aside, HAMBURGER, logo, slider} from "./BurgerMenu.js";

const BTN_LEFT = document.querySelector("#btn_left");
const BTN_RIGHT = document.querySelector("#btn_right");
const CAROUSEL = document.querySelector(".carousel");
const ITEM_LEFT = document.querySelector(".left_cards");
const ITEM_RIGHT = document.querySelector(".right_cards");
const ITEM_ACTIVE = document.querySelector(".active_cards");


let cardQuantity;
let time;
HAMBURGER.addEventListener('click', function (){
    const overlay = document.querySelector('.aside_overlay');
    const wrapper = document.querySelector('.aside_wrapper');

    if(HAMBURGER.style.transform === 'rotate(-90deg)'){
        HAMBURGER.style.transform = 'rotate(0deg)';
        slider(wrapper, '-320px')
        overlay.style.display = 'none'
        logo.style.display = 'flex'
        document.body.style.overflow = 'initial'
    }
    else {
        HAMBURGER.style.transform = 'rotate(-90deg)'
        document.body.style.overflow = 'hidden'
        logo.style.display = 'none'
        slider(wrapper, '0px')
        overlay.style.display = 'flex'
    }

})


async function init(){
    await readJSON();
    carouselGenerator();
    aside();
}

window.onresize = function (){
    clearTimeout(time);
    time = setTimeout(function (){
        carouselGenerator();
    }, 100);
}

function carouselGenerator(){
    let clientWidth = document.querySelector('.carousel').clientWidth;
    const carouselItems = [ITEM_LEFT, ITEM_RIGHT, ITEM_ACTIVE];

    cardQuantity = clientWidth === 990 ? 3 : clientWidth === 580 ? 2 : 1;
    carouselItems.forEach((element) =>{
        generateCardAppend(element, cardQuantity);
    });
}


const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_RIGHT.removeEventListener("click", moveRight);
    BTN_LEFT.removeEventListener("click", moveLeft);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener('animationend', (animationEvent) => {
    let switchedItem;
    if (animationEvent.animationName === "move-left") {
        CAROUSEL.classList.remove("transition-left");
        switchedItem = ITEM_LEFT;

    }
    else {
        CAROUSEL.classList.remove("transition-right");
        switchedItem = ITEM_RIGHT;
    }

    document.querySelector("#active_cards").innerHTML = "";
    while (switchedItem.childNodes.length > 0) {
        document.querySelector("#active_cards").append(switchedItem.childNodes[0]);
    }

    generateCardAppend(switchedItem, cardQuantity);


    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});



init();