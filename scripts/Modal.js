import {createElement} from "./createElement.js";

export class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modalWrapper = '';
        this.modalContent = '';
        this.modalCloseBtn = '';
        this.overlay = '';
        this.CloseBtnInner = '';
    }

    buildModal(content) {
        this.overlay = createElement( 'div', 'overlay');

        this.modalWrapper = createElement('div', 'modal_wrapper',  this.classes);

        this.modalCloseBtn = createElement('button', 'modal_close');
        this.CloseBtnInner = createElement('span', "modal_close-icon");

        this.modalContent = createElement('div', 'modal_content');

        this.setContent(content);

        this.appendModalElements();

        this.bindEvents();

        this.openModal();
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
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