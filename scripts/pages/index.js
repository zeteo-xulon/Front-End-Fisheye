    import { server } from "../utils/common.js";
    import { getUserCardDOM } from "../factories/photographer.js";
    
    async function getPhotographers() {
        const response = await fetch(server);
        const photographers = await response.json();
        return photographers;
    }

    async function displayData(photographers) {
        console.log(photographers)
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const userCardDOM = getUserCardDOM(photographer);
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        console.log(photographers)
        displayData(photographers);
    };
    
    init();
    
