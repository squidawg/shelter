import {generateCardAppend} from "./generateCardAppend.js";
import {createElement} from "./createElement.js";
import {PAGINATION} from "./pets.js";
let timePets;

function paginationPageCreator(element) {
    for (let i = 0; i < element; i++) {
        let page = createElement('div', 'page');
        page.id = i + 1;
        PAGINATION.append(page);

    }
}
window.onresize = function (){
    clearTimeout(timePets);
    timePets = setTimeout(function (){
            PAGINATION.innerHTML = ''
            paginationGenerator();
        }
    , 100);
}

export function paginationGenerator(){
    let clientWidth = document.querySelector('.pagination_box').clientWidth;
    let cardQuantity = clientWidth === 1200 ? 8 : clientWidth === 580 ? 6 : 3;
    paginationPageCreator( 48 / cardQuantity);
    let page = [...PAGINATION.children];
    page.forEach((element) =>{
        generateCardAppend(element, cardQuantity, cardQuantity );
    });
}