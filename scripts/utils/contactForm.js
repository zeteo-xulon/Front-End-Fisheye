import { createThisElement, createThisInput } from "../utils/common.js";
const contactButton = document.getElementById("contactButton");
contactButton.addEventListener("click", displayModal);

function displayModal() {
    const buitModal = buildModal();
    const modal = document.getElementById("contact_modal");
	if(modal.classList.contains("invisible")){
        modal.classList.remove("invisible");
        modal.classList.add("visible");
        return modal.appendChild(buitModal);
    } else {
        modal.classList.remove("visible");
        modal.classList.add("invisible");
        return modal.innerHTML = "";
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("visible");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

// buildModal() is a function that returns a DOM element of a modal
function buildModal() {
    const modal = createThisElement("dialog", "modal");
    const modalHeader = createThisElement("header", "modal__header");
    const modalTitle = createThisElement("h2", "modal__title", null, "Contactez-moi");
    const modalClose = createThisElement("button", "modal__close", null, "X");
    const modalBody = createThisElement("form", "modal__form");
    const modalLabelFirstname = createThisElement("label", "modal__label", null, "Prénom");
    const modalLabelName = createThisElement("label", "modal__label", null, "Nom");
    const modalLabelEmail = createThisElement("label", "modal__label", null, "Email");
    const modalLabelMessage = createThisElement("label", "modal__label", null, "Message");
    const modalFormFirstname = createThisInput({
    type: "text",
    name: "firstname",
    className: "modal__input",
    required: true,
    });
    const modalFormName = createThisInput({
    type: "text",
    name: "name",
    className: "modal__input",
    required: true,
    });
    const modalFormEmail = createThisInput({
    type: "email",
    name: "email",
    className: "modal__input",
    required: true,
    });
    const modalFormMessage = createThisInput({
    type: "text",
    name: "message",
    className: "modal__input",
    required: true,
    });
    const modalFormSubmit = createThisElement("button", "modal__submit", null, "Envoyer");
    modalClose.setAttribute("aria-label", "Fermer");
    modalClose.addEventListener("click", closeModal);
    modal.appendChild(modalHeader);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalClose);
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