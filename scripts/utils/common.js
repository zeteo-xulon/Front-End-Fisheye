export const server = './data/photographers.json';

export function createThisElement(el, className, id, textContent) {
    const element = document.createElement(el);
    className ? element.className = className : null;
    id ? element.id = id : null;
    textContent ? element.textContent = textContent : null;
    return element;
}
export function createThisImage(imageInformation) {
    const image = document.createElement('img');
    imageInformation.src ? image.src = imageInformation.src : null;
    imageInformation.alt ? image.alt = imageInformation.alt : null;
    imageInformation.className ? image.className = imageInformation.className : null;
    imageInformation.id ? image.id = imageInformation.id : null;
    return image;
}
export function createThisInput(inputInformation) {
    const input = document.createElement('input');
    inputInformation.type ? input.type = inputInformation.type : null;
    inputInformation.name ? input.name = inputInformation.name : null;
    inputInformation.value ? input.value = inputInformation.value : null;
    inputInformation.className ? input.className = inputInformation.className : null;
    inputInformation.id ? input.id = inputInformation.id : null;
    inputInformation.placeholder ? input.placeholder = inputInformation.placeholder : null;
    inputInformation.required ? input.required = inputInformation.required : null;
    inputInformation.min ? input.min = inputInformation.min : null;
    inputInformation.max ? input.max = inputInformation.max : null;
    return input;
}