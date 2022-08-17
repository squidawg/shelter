import {createElement} from "./createElement.js";

export class Modal {
    constructor(classes) {
        this.classes = classes;
    }

    modalWrapper = '';
    modalContent = '';
    modalCloseBtn = '';
    overlay = '';
    CloseBtnInner = '';

    buildModal(content) {
        this.overlay = createElement( 'div', 'overlay');

        this.modalWrapper = createElement('div', 'modal_wrapper',  this.classes);

        this.modalCloseBtn = createElement('button', 'modal_close');
        this.CloseBtnInner = createElement('span', "modal_close-icon");

        this.modalContent = createElement('div', 'modal_content');

        this.setContent(content, this.modalContent);

        this.appendModalElements();

        this.bindEvents();

        this.openModal();
    }

    setContent(content, modalContent) {
        if (typeof content === 'string') {
            modalContent.innerHTML = content;
        } else {
            modalContent.innerHTML = '';
            modalContent.appendChild(content);
        }
    }

    appendModalElements() {
        this.modalCloseBtn.append(this.CloseBtnInner);
        this.modalWrapper.append(this.modalCloseBtn, this.modalContent);
        this.overlay.append(this.modalWrapper);
    }

    bindEvents() {
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
        document.body.style.overflowY = 'hidden';
        document.querySelector('.header').classList.add('header_pets-inactive')
    }

    closeModal(e) {
        let classes = e.target.classList;
        if (classes.contains('overlay') || classes.contains('modal_close') || classes.contains('modal_close-icon')){
            document.querySelector('.overlay').remove();
            document.body.style.overflowY = 'initial';
            document.querySelector('.header').classList.remove('header_pets-inactive')
        }
    }
}