import {readJSON} from "./readJSON.js";
import {paginationGenerator} from "./paginationGenerator.js";
import {burgerGenerator, burgerController, burgerPositionSwitch} from "./burgerGenerator.js";
import {HEADER} from "./burgerGenerator.js";

export const PAGINATION = document.querySelector('.pagination_box');
const PAG_FIRST = document.querySelector('#pagination_first');
const PAG_LAST = document.querySelector('#pagination_last');
const PAG_RIGHT = document.querySelector('#pagination_right');
const PAG_LEFT = document.querySelector('#pagination_left');
const HAMBURGER_PETS = document.querySelector('.hamburger-pets');
const PAGE_COUNTER = document.querySelector('#page_counter');

let current = 0;

async function init_pets(){
    await readJSON();
    paginationGenerator();
    burgerGenerator(HAMBURGER_PETS, HEADER,  'header_pets-inactive');
    PAG_LEFT.disabled = true;
    PAG_FIRST.disabled = true;
}
window.onresize = function (){
    const overlay = document.querySelector('.aside_overlay');
    if(screen.width > 768 && overlay.style.display === 'flex'){
        burgerController(HAMBURGER_PETS);
        HEADER.classList.toggle('header_pets-inactive');
    }
}


HAMBURGER_PETS.addEventListener('click', function (){
    const aside_wrapper = document.querySelector('.aside_wrapper');
    burgerController(HAMBURGER_PETS);
    aside_wrapper.style.background = '#9a9490';
    HEADER.classList.add('header_pets-inactive');
    aside_wrapper.addEventListener('animationend', function (animationEvent){
        burgerPositionSwitch(animationEvent, aside_wrapper);

    })
});


const paginationRight = () => {
    PAG_RIGHT.removeEventListener('click', paginationRight);
    PAG_LEFT.removeEventListener('click', paginationLeft);
    current++;
    PAGE_COUNTER.innerHTML = current + 1;
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
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

const paginationLeft = () => {
    PAG_LEFT.removeEventListener('click', paginationLeft);
    PAG_RIGHT.removeEventListener('click', paginationRight);
    current--;
    PAGE_COUNTER.innerHTML = current + 1;
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
    if(current === 0){
        PAG_LEFT.disabled = true;
        PAG_FIRST.disabled = true;
    }
    else {
        PAG_LEFT.disabled = false;
        PAG_RIGHT.disabled = false;
        PAG_LAST.disabled = false;
    }
}

const paginationFirst = () => {
    PAG_LEFT.removeEventListener('click', paginationLeft);
    PAG_FIRST.removeEventListener('click', paginationFirst);
    current = 0;
    PAGINATION.style.transform = `translate(${current}%)`;
    PAGE_COUNTER.innerHTML = current + 1;
    PAG_FIRST.disabled = true;
    PAG_LEFT.disabled = true;
    PAG_LAST.disabled = false;
    PAG_RIGHT.disabled = false;
}

const paginationLast = () => {
    PAG_LAST.removeEventListener('click', paginationLast);
    PAG_RIGHT.removeEventListener('click', paginationRight);
    current = PAGINATION.children.length - 1;
    PAGINATION.style.transform = `translate(-${100 * (current)}%)`;
    PAGE_COUNTER.innerHTML = current + 1;

    PAG_LAST.disabled = true;
    PAG_RIGHT.disabled = true;

    PAG_LEFT.disabled = false;
    PAG_FIRST.disabled = false;

}

PAG_RIGHT.addEventListener('click', paginationRight);
PAG_LEFT.addEventListener('click', paginationLeft);

PAG_FIRST.addEventListener('click', paginationFirst);
PAG_LAST.addEventListener('click', paginationLast);


PAGINATION.addEventListener('transitionend',(event) =>{
    PAG_RIGHT.addEventListener('click', paginationRight);
    PAG_LEFT.addEventListener('click', paginationLeft);

    PAG_FIRST.addEventListener('click', paginationFirst);
    PAG_LAST.addEventListener('click', paginationLast);

});

init_pets();
