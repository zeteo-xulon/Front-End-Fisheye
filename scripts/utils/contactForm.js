import { createThisElement, createThisInput, createThisImage } from "../utils/common.js";
const modal = document.getElementById("contact_modal");

export function displayModal(photographerName) {
    const buitModal = buildModal(photographerName);
	if(modal.classList.contains("invisible")){
        modal.classList.remove("invisible");
        modal.classList.add("visible");
        modal.appendChild(buitModal);
        return listenSubmitButton();
    } 
    else { return closeModal }
}

function closeModal() {
    modal.classList.remove("visible");
    modal.classList.add("invisible");
    const submitButton = document.getElementById("submitButton");
    submitButton.removeEventListener("click", ()=>{});
    return modal.innerHTML = "";
}

// buildModal() is a function that returns a DOM element of a modal
function buildModal(photographerName) {
    const modal = createThisElement("dialog", "modal");
    const modalHeader = createThisElement("header", "modal__header");
    const modalSpan = createThisElement("span", "modal__span");
    const modalTitle = createThisElement("h2", "modal__title", null, "Contactez-moi");
    const modalPhotographer = createThisElement("p", "modal__photographer", null, photographerName);
    const modalClose = createThisElement("button", "modal__close", null, "");
    const modalCloseIcon = createThisImage({ src: "./assets/icons/close.svg", alt: "close icon" });
    const modalBody = createThisElement("form", "modal__form");
    const modalLabelFirstname = createThisElement("label", "modal__label", null, "Prénom");
    const modalLabelName = createThisElement("label", "modal__label", null, "Nom");
    const modalLabelEmail = createThisElement("label", "modal__label", null, "Email");
    const modalLabelMessage = createThisElement("label", "modal__label", null, "Message");
    const modalFormFirstname = createThisInput({
        type: "text",
        name: "firstname",
        id: "firstname",
        className: "modal__form__input",
        required: true,
    });
    const modalFormName = createThisInput({
        type: "text",
        name: "name",
        className: "modal__form__input",
        id: "name",
        required: true,
    });
    const modalFormEmail = createThisInput({
        type: "email",
        name: "email",
        className: "modal__form__input",
        id: "email",
        required: true,
    });
    const modalFormMessage = createThisInput({
        type: "text",
        name: "message",
        className: "modal__form__input modal__form__input--message",
        id: "message",
        required: true,
    });
    const modalFormSubmit = createThisElement("button", "modal__submit", "submitButton", "Envoyer");
    modalClose.setAttribute("aria-label", "Fermer");
    modalClose.addEventListener("click", closeModal);
    modal.appendChild(modalHeader);
    modalHeader.appendChild(modalSpan);
    modalSpan.appendChild(modalPhotographer);
    modalSpan.appendChild(modalTitle);
    modalHeader.appendChild(modalClose);
    modalClose.appendChild(modalCloseIcon);
    modal.appendChild(modalBody);
    modalBody.appendChild(modalLabelFirstname);
    modalLabelFirstname.appendChild(modalFormFirstname);
    modalBody.appendChild(modalLabelName);
    modalLabelName.appendChild(modalFormName);
    modalBody.appendChild(modalLabelEmail);
    modalLabelEmail.appendChild(modalFormEmail);
    modalBody.appendChild(modalLabelMessage);
    modalLabelMessage.appendChild(modalFormMessage);
    modalBody.appendChild(modalFormSubmit);
    return modal;
}

function listenSubmitButton(){
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const firstname = document.getElementById("firstname").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const regexText = /^[A-Za-z\-]{2,}$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if(!regexText.test(firstname)){ return alert("Le prénom doit contenir au moins 2 caractères"); }
        if(!regexText.test(name)){ return alert("Le nom doit contenir au moins 2 caractères"); }
        if(!regexEmail.test(email)){ return alert("L'email doit être valide"); }
        if(!regexText.test(message)){ return alert("Le message doit contenir au moins 2 caractères"); }

        const formDatas = {
            firstname: firstname,
            name: name,
            email: email,
            message: message
        };
        console.log(formDatas);

        return closeModal();
    });
}