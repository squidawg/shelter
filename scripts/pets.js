import {readJSON} from "./readJSON.js";
import {paginationGenerator} from "./paginationGenerator.js";
import {aside, burgerChecker} from "./BurgerMenu.js";
export const PAGINATION = document.querySelector('.pagination_box');
const PAG_FIRST = document.querySelector('#pagination_first');
const PAG_LAST = document.querySelector('#pagination_last');
const PAG_RIGHT = document.querySelector('#pagination_right');
const PAG_LEFT = document.querySelector('#pagination_left');
const HAMBURGER_PETS = document.querySelector('.hamburger-pets');
const PAGE_COUNTER = document.querySelector('#page_counter');
const HEADER_PETS = document.querySelector('.header');
let current = 0;
let time;

async function init_pets(){
    await readJSON();
    paginationGenerator();
    aside(HAMBURGER_PETS);
    PAG_LEFT.disabled = true;
    PAG_FIRST.disabled = true;
}


HAMBURGER_PETS.addEventListener('click', function (){
    const aside_wrapper = document.querySelector('.aside_wrapper');
    if(HEADER_PETS.classList.contains('header_pets')){
        HEADER_PETS.classList.add('header_pets-inactive');
        HEADER_PETS.classList.remove('header_pets');
        aside_wrapper.style.background = '#9a9490';
        burgerChecker(HAMBURGER_PETS);
        console.log(MouseEvent.clientY)
    }
    else {
        burgerChecker(HAMBURGER_PETS);
        HEADER_PETS.classList.remove('header_pets-inactive');
        HEADER_PETS.classList.add('header_pets');



    }
});


const moveRight = () => {
    PAG_RIGHT.removeEventListener('click', moveRight)
    PAG_LEFT.removeEventListener('click', moveLeft)
    current++;
    PAGE_COUNTER.innerHTML = current + 1
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
    console.log()
    if(current === PAGINATION.children.length - 1){
        PAG_RIGHT.disabled = true;
        PAG_LAST.disabled = true;
    }
    else {
        PAG_RIGHT.disabled = false;
        PAG_LEFT.disabled = false;

        PAG_FIRST.disabled = false;
        PAG_LAST.disabled = false;
    }
}

const moveLeft = () => {
    PAG_LEFT.removeEventListener('click', moveLeft)
    PAG_RIGHT.removeEventListener('click', moveRight)
    current--;
    PAGE_COUNTER.innerHTML = current + 1
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
    if(current === 0){
        PAG_LEFT.disabled = true
        PAG_FIRST.disabled = true;
    }
    else {
        PAG_LEFT.disabled = false
        PAG_RIGHT.disabled = false
        PAG_LAST.disabled = false;
    }
}

const moveFirst = () => {
    PAG_LEFT.removeEventListener('click', moveLeft);
    PAG_FIRST.removeEventListener('click', moveFirst);
    current = 0;
    PAGINATION.style.transform = `translate(${current}%)`;
    PAGE_COUNTER.innerHTML = current + 1;
    PAG_FIRST.disabled = true;
    PAG_LEFT.disabled = true;
    PAG_LAST.disabled = false;
    PAG_RIGHT.disabled = false;
}

const moveLast = () => {
    PAG_LAST.removeEventListener('click', moveLast);
    PAG_RIGHT.removeEventListener('click', moveRight)
    current = PAGINATION.children.length - 1;
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
    PAGE_COUNTER.innerHTML = current + 1;

    PAG_LAST.disabled = true;
    PAG_RIGHT.disabled = true;

    PAG_LEFT.disabled = false
    PAG_FIRST.disabled = false;

}

PAG_RIGHT.addEventListener('click', moveRight);
PAG_LEFT.addEventListener('click', moveLeft);

PAG_FIRST.addEventListener('click', moveFirst);
PAG_LAST.addEventListener('click', moveLast);


PAGINATION.addEventListener('transitionend',(event) =>{
    PAG_RIGHT.addEventListener('click', moveRight);
    PAG_LEFT.addEventListener('click', moveLeft);

    PAG_FIRST.addEventListener('click', moveFirst);
    PAG_LAST.addEventListener('click', moveLast);

});

init_pets();
