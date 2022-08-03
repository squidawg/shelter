import {createElement} from "./createElement.js";
const navLink = document.querySelectorAll('.navigation_element');
export const logo = document.querySelector('.logo');
export const HAMBURGER = document.querySelector('.hamburger');
const HEADER = document.querySelector('body');


export function aside(){
    const overlay = createElement('div', 'aside_overlay');
    const wrapper = createElement('div', 'aside_wrapper');
    const burgerInner = createElement('div', 'aside_inner');
    const burgerLinks = createElement('ul', 'aside_list')
    let burgerLogo = logo.cloneNode(true);
    navLink.forEach((element)=>{
        let listElement = element.cloneNode(true)
        listElement.addEventListener('click',function (){

        });
        burgerLinks.append(listElement);
    });
    burgerInner.append(burgerLogo);
    wrapper.append(burgerInner, burgerLinks)
    //overlay.style.display = 'none'
    overlay.append(wrapper);
    HEADER.insertBefore(overlay, HEADER.children[0]);
}

export function slider(element, rotate){
    element.style.right = rotate;

}