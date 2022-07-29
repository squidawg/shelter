import {readJSON} from "./readJSON.js";
import {ITEM_SECOND, ITEM_FORTH, paginationGenerator, FIRST_PAGE, LAST_PAGE} from "./paginationGenerator.js";
import {generateCardAppend} from "./generateCardAppend.js";
export const PAGINATION = document.querySelector('.pagination_box');
const PAG_RIGHT = document.querySelector('#pagination_right');
const PAG_LEFT = document.querySelector('#pagination_left');
const PAGE_COUNTER = document.querySelector('#page_counter');
const PAG_LAST = document.querySelector('#pagination_last');

async function init_pets(){
    await readJSON();
    paginationGenerator();
    paginationBtnController();
}


const paginationBtnController = () => {
    if(PAGE_COUNTER.innerHTML === '1'){
        PAG_LEFT.disabled = true;
    }
    else if (PAGE_COUNTER.innerHTML === '8'){
        PAG_RIGHT.disabled = true;
    }
    else if (PAGE_COUNTER.innerHTML === '7'){
        PAG_RIGHT.removeEventListener('click', pagination_right);
        PAG_RIGHT.addEventListener('click', pag_last);
    }
    else {
        PAG_LEFT.disabled = false;
        PAG_RIGHT.disabled = false;
    }
}

const pagRight = () => {
  if(parseInt(PAGE_COUNTER.innerHTML) < 7){
      let number = parseInt(PAGE_COUNTER.innerHTML) + 1;
      PAGE_COUNTER.innerHTML = number;
  }
}

const pagination_right = () =>{
    PAGINATION.classList.add('pagination-right');
    PAG_RIGHT.removeEventListener('click', pagination_right);
    PAG_LEFT.removeEventListener('click', pagination_left);
}

const pagination_left = () => {
    PAGINATION.classList.add('pagination-left');
    PAG_LEFT.removeEventListener('click', pagination_left);
    PAG_RIGHT.removeEventListener('click', pagination_right);
}

const pag_last = () => {
    PAGINATION.classList.add('pagination-last');
    let number = parseInt(PAGE_COUNTER.innerHTML) + 1
    PAGE_COUNTER.innerHTML = number;
    PAG_RIGHT.removeEventListener('click', pagination_right);
    PAG_LEFT.removeEventListener('click', pagination_left);
}

PAG_RIGHT.addEventListener('click', pagination_right);
PAG_LEFT.addEventListener('click', pagination_left);
PAG_LEFT.addEventListener('click', paginationBtnController);
PAG_RIGHT.addEventListener('click', pagRight)
PAGINATION.addEventListener('animationend', (animationEvent) => {
    let switchedItem;
    paginationBtnController();
    if (animationEvent.animationName === "pagination-toLeft") {
        PAGINATION.classList.remove("pagination-left");
        switchedItem = ITEM_SECOND;

    }
    else if (animationEvent.animationName === "pagination-toLast" ){
        PAGINATION.classList.remove('pagination-last');
        switchedItem = LAST_PAGE;
    }
    else {
        PAGINATION.classList.remove("pagination-right");
        switchedItem = ITEM_FORTH;
    }

    document.querySelector("#third_cards").innerHTML = "";
    while (switchedItem.childNodes.length > 0) {
        document.querySelector("#third_cards").append(switchedItem.childNodes[0]);
    }
    generateCardAppend(switchedItem, 8, 8);


    PAG_RIGHT.addEventListener("click", pagination_right);
    PAG_LEFT.addEventListener("click", pagination_left);

});


init_pets();
