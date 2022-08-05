import {createElement} from "./createElement.js";

const navLink = document.querySelectorAll('.navigation_element');
const HEADER = document.querySelector('body');
const logo = document.querySelector('.logo');


export function aside(elem){
    const overlay = createElement('div', 'aside_overlay');
    const wrapper = createElement('div', 'aside_wrapper');
    const burgerInner = createElement('div', 'aside_inner');
    const burgerLinks = createElement('ul', 'aside_list');
    let burgerLogo = logo.cloneNode(true);
    navLink.forEach((element)=>{
        let listElement = element.cloneNode(true);
        listElement.addEventListener('click', function (){
            burgerClose(elem, wrapper)
            overlay.style.display = 'none';
            HEADER.style.overflow = 'initial';
            logo.style.visibility = 'visible';
        });
        burgerLinks.append(listElement);
    });
    burgerInner.append(burgerLogo);
    wrapper.append(burgerInner, burgerLinks);
    overlay.append(wrapper);
    HEADER.insertBefore(overlay, HEADER.children[0]);
}


const burgerOpen = (element, translate) => {
    element.classList.add('burger_open');
    element.classList.remove('burger_closed');
    translate.classList.add('rotate_open');
    translate.classList.remove('rotate_close');
}

const burgerClose = (element, translate) => {
    element.classList.add('burger_closed');
    element.classList.remove('burger_open');
    translate.classList.add('rotate_close');
    translate.classList.remove('rotate_open');
}

export function burgerChecker(element){
    const overlay = document.querySelector('.aside_overlay');
    const wrapper = document.querySelector('.aside_wrapper');
    if(element.classList.contains('burger_closed')){
        burgerOpen(element, wrapper);
        document.body.style.overflow = 'hidden';
        logo.style.visibility = 'hidden';
        overlay.style.display = 'flex';
    }
    else {
        burgerClose(element, wrapper);
        overlay.addEventListener('transitionend', function (){
            overlay.style.display = 'none';
        })
        logo.style.visibility = 'visible';
        document.body.style.overflow = 'initial';

    }
}
