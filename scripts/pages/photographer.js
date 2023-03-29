import { createThisImage } from "../utils/common.js";
import { displayModal } from "../utils/contactForm.js";

// This is the page for a single photographer
const searchParams = new URLSearchParams(window.location.search);
const photographerID = searchParams.get('id');
const contactButton = document.getElementById("contactButton");


async function init(id){
    const photographerData = await getPhotographerData(id);
    contactButton.addEventListener("click", () => { displayModal(photographerData.photographer.name) });
    console.log(photographerData);
    displayPhotographerInfo(photographerData.photographer);
}

async function getPhotographerData(id){
    id = Number(id);
    const response = await fetch('../data/photographers.json');
    const photographersData = await response.json();
    const photographer = photographersData.photographers.find(p => p.id === id);
    const photographerMedia = photographersData.media.filter(m => m.photographerId === id);

    const returnedData = { 
        photographer: photographer,
        media: photographerMedia
    };
    return returnedData;
}

function displayPhotographerInfo(photographer){
    const imageName = photographer.portrait.split('.')[0];
    const photographerName = document.getElementById("photographerName");
    photographerName.innerText = photographer.name;
    const photographerPlace = document.getElementById("photographerLocation");
    photographerPlace.innerText = `${photographer.city}, ${photographer.country}`;
    const photographerTagline = document.getElementById("photographerTagline");
    photographerTagline.innerText = photographer.tagline;
    const photographerPortrait = document.getElementById("photographerImage");
    photographerPortrait.src = `assets/photographers/${imageName}.webp`;
    photographerPortrait.alt = photographer.name;
}

init(photographerID);