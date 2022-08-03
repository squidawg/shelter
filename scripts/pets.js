import {readJSON} from "./readJSON.js";
import {paginationGenerator} from "./paginationGenerator.js";
export const PAGINATION = document.querySelector('.pagination_box');
const PAG_FIRST = document.querySelector('#pagination_first');
const PAG_LAST = document.querySelector('#pagination_last');
const PAG_RIGHT = document.querySelector('#pagination_right');
const PAG_LEFT = document.querySelector('#pagination_left');

const PAGE_COUNTER = document.querySelector('#page_counter');
let current = 0;


async function init_pets(){
    await readJSON();
    paginationGenerator();
    PAG_LEFT.disabled = true;
    PAG_FIRST.disabled = true;
}



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
