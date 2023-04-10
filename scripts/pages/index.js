import { server } from "../utils/common.js";
import { getPhotographerCardDOM } from "../factories/photographer.js";

/**
 * SCENARIO
 * This function is the main function of the page
 * It is called when the page is loaded, it will get the data from the server and display it
 */
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
/**
 * This function gets the data from the server
 * @returns {Object} - data from the server
 */
async function getPhotographers() {
    const response = await fetch(server);
    const photographers = await response.json();
    return photographers;
}
/**
 * This function displays the data on the page
 * @param {Object} photographers - photographers object
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer, index) => {
        photographer.index = index + 2;
        const userCardDOM = getPhotographerCardDOM(photographer);
        photographersSection.appendChild(userCardDOM);
    });
};
init();