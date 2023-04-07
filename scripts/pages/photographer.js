import { displayModal } from "../utils/contactForm.js";
import { createMediaCardDOM } from "../factories/photographer.js";
import { CreateThisMedia, createThisElement } from "../utils/common.js";

// This is the page for a single photographer
const searchParams = new URLSearchParams(window.location.search);
const photographerID = searchParams.get('id');
const contactButton = document.getElementById("contactButton");
const portfolioSelect = document.getElementById("portfolioSelect");
const lightBox = document.getElementById("lightBox");
const lightBoxCentral = document.getElementById("lightBoxCentral");
const priceDay = document.getElementById("priceDay");
const totalLikes = document.getElementById("totalLikes");
let portfolioArray = [];

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("lightbox__close-cross")) {
        return document.getElementById('lightBox').classList.replace('visible', "invisible");
    }
    if(e.target.classList.contains("media__card__media")){
        e.preventDefault();
        const mediaID = Number(e.target.parentElement.id);
        const mediaPlusPosition = getMediaAndPosition(mediaID);
        lightBox.classList.replace('invisible', 'visible');
        console.log(mediaPlusPosition);
        lightBoxCentral.innerHTML = "";
        const mediaPath = mediaPlusPosition.media.image? mediaPlusPosition.media.image : mediaPlusPosition.media.video;
        const photographer = mediaPath.split('.')[0].split('/')[2];
        const path = `assets/images/${photographer}/`;
        const filename = mediaPath.split('.')[0].split('/')[3];
        const extension = mediaPath.split('.')[1];
        console.log(path, filename, extension);
        const media = new CreateThisMedia(path, filename, extension, "lightbox__media", mediaID);
        const text = createThisElement("p", "lightbox__img-title", "lightboxImgTitle", mediaPlusPosition.media.title);
        lightBoxCentral.appendChild(media);
        lightBoxCentral.appendChild(text);
        
    }
});


/**
 *  SCENARIO function of the page
 * 1. Get the data of the photographer and the media of the photographer from the json file (server at the end of the project)
 * 2. Display the photographer's information
 * 3. Display the media of the photographer sorted by selected order
 * 4. Display a lightbox when the user clicks on a media
 * 5. Display a modal when the user clicks on the contact button
 * @param {String} id - id of the photographer
 */
async function init(id){
    const photographerData = await getPhotographerData(id);
    portfolioArray = photographerData.media;
    const order = document.getElementById("portfolioSelect").value;
    contactButton.addEventListener("click", () => { displayModal(photographerData.photographer.name) });
    console.log(photographerData);
    displayPhotographerInfo(photographerData.photographer);
    displayMediaCards(photographerData.media, order);
    const totalOfLikes = photographerData.media.reduce((acc, m) => acc + m.likes, 0);
    totalLikes.innerText = totalOfLikes;
    priceDay.innerText = `${photographerData.photographer.price}€/jour`;

    portfolioSelect.addEventListener("change", () => {
        const order = document.getElementById("portfolioSelect").value;
        portfolioContainer.innerHTML = "";
        displayMediaCards(photographerData.media, order);
    });
}

/**
 * This function gets the data of the photographer and the media of the photographer from the json file (server at the end of the project)
 * @param {Number} id - id of the photographer
 * @returns {Object} - object containing the photographer and the media of the photographer
 * */
async function getPhotographerData(id){
    id = Number(id);
    const response = await fetch('../data/photographers.json');
    const photographersData = await response.json();
    const photographer = photographersData.photographers.find(p => p.id === id);
    const photographerMedia = photographersData.media.filter(m => m.photographerId === id);
    const photographerMediaWithCorrectedPath = correctPath(photographerMedia, photographer.name);

    const returnedData = { 
        photographer: photographer,
        media: photographerMediaWithCorrectedPath
    };
    return returnedData;
}

/**
 * It get the media and the position of the media in the portfolioArray from the id of the media clicked
 * @param {Number} id - id of the media
 * @returns {Object} - object containing the media and the position of the media in the portfolioArray
 * */
function getMediaAndPosition(id){
    let cardData = {media: "", position: ""};
    for(let i = 0; i < portfolioArray.length; i++){
        if(portfolioArray[i].id === id){
            cardData.media = portfolioArray[i];
            cardData.position = i;
        }
    }
    return cardData;
}
function displayMediaCards(media, order){
    const portfolioContainer = document.getElementById("portfolioContainer");
    order? order = order : order = "title";
    const sortedMedia = sortedMedias(media, order);
    portfolioArray = sortedMedia;
    console.log(sortedMedia);
    sortedMedia.forEach(m => {
        let mediaCard = createMediaCardDOM(m);
        portfolioContainer.appendChild(mediaCard);
    });
}
/**
 * This function sorts the media of the photographer depending on the order passed as argument
 * @param {Array} media - array containing the media of the photographer
 * @param {String} order - order in which the media will be sorted
 * @returns {Array} - array containing the media of the photographer sorted
 * */
function sortedMedias(media, order){
    const sortedMedia = [...media];
    if(order === "Titre"){ sortedMedia.sort((a, b) => a.title.localeCompare(b.title)) }
    if(order === "Date"){ sortedMedia.sort((a, b) => new Date(a.date) - new Date(b.date)) }
    if(order === "Popularité"){  sortedMedia.sort((a, b) => b.likes - a.likes) }
    return sortedMedia;
}

/**
 * This function creates the path to the image of the photographer
 * @param {String} photographerName - name of the photographer to be used to create the path to the image
 * @returns {String} - path to the image of the photographer
 * */
function createImagePath(photographerName){
    const initialPath = 'assets/images/';
    const photographerFirstName= photographerName.split(' ')[0];
    const correctedFirstName = photographerFirstName.replace('-', ' ');
    const joinedPath = `${initialPath}${correctedFirstName}/`;
    return joinedPath;
}

/**
 * This function corrects the path to the image or video of the media object
 * @param {Object} media - object containing the media to be displayed 
 * @param {*} photographerName - name of the photographer to be used to create the path to the image
 * @returns {Object} - media object with the correct path to the image
 */
function correctPath(media, photographerName){
    const correctedMedia = media.map(m => {
        const initialPath = createImagePath(photographerName);
        const fullPath = `${initialPath}${m.image? m.image : m.video}`;
        m.image ? m.image = fullPath : m.video = fullPath;
        return m;
    });
    return correctedMedia;
}

/**
 *  This function create the HTML elements for the photographer's info and displays them
 * @param {Object} photographer - object containing the photographer's data
 */
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