import {readJSON} from "./readJSON.js";
import {generateCardAppend} from "./generateCardAppend.js";
import {burgerGenerator, burgerController, burgerPositionSwitch} from "./burgerGenerator.js";
import {HEADER} from "./burgerGenerator.js";


const BTN_LEFT = document.querySelector("#btn_left");
const BTN_RIGHT = document.querySelector("#btn_right");
const CAROUSEL = document.querySelector(".carousel");
const ITEM_LEFT = document.querySelector(".left_cards");
const ITEM_RIGHT = document.querySelector(".right_cards");
const ITEM_ACTIVE = document.querySelector(".active_cards");
const HAMBURGER = document.querySelector('.hamburger');
let cardQuantity;
let time;


HAMBURGER.addEventListener('click', function (){
    const aside_wrapper = document.querySelector('.aside_wrapper');
    burgerController(HAMBURGER);
    aside_wrapper.addEventListener('animationend', function (animationEvent){
        burgerPositionSwitch(animationEvent, aside_wrapper)

    })
});

async function init(){
    await readJSON();
    carouselGenerator();
    burgerGenerator(HAMBURGER, HEADER, 'header-inactive');
}

window.onresize = function (){
    const overlay = document.querySelector('.aside_overlay');
    clearTimeout(time);
    time = setTimeout(function (){
        carouselGenerator();
    }, 100);
    if(screen.width > 768 && overlay.style.display === 'flex'){
        burgerController(HAMBURGER)
    }
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