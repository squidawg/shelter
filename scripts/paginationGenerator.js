import {generateCardAppend} from "./generateCardAppend.js";
import {PAGINATION} from "./pets.js";
export const ITEM_SECOND = document.querySelector(".pagination_second");
export const ITEM_THIRD = document.querySelector(".pagination_third");
export const ITEM_FORTH = document.querySelector(".pagination_forth");
export let FIRST_PAGE = document.querySelector(".pagination_first");
export let LAST_PAGE = document.querySelector(".pagination_last");




export function paginationGenerator(){
    let clientWidth = document.querySelector('.pagination_box').clientWidth;
    let carouselItems = [ITEM_SECOND, ITEM_THIRD, ITEM_FORTH];

    let cardQuantity = clientWidth === 1200 ? 8 : clientWidth === 580 ? 6 : 3;
    carouselItems.forEach((element) =>{
        generateCardAppend(element, cardQuantity, 8);
    });

    FIRST_PAGE = ITEM_THIRD.cloneNode(true);
    FIRST_PAGE.classList.replace('pagination_third', 'pagination_first')
    FIRST_PAGE.id = 'first_page';

    LAST_PAGE = ITEM_FORTH.cloneNode(true);
    LAST_PAGE.classList.replace("pagination_forth", 'pagination_last');
    LAST_PAGE.id = 'last_page';

    PAGINATION.insertBefore(FIRST_PAGE, PAGINATION.firstChild);
    PAGINATION.append(LAST_PAGE);

}