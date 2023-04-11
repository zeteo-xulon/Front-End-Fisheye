export const server = './data/photographers.json';

/**
 * This class creates an element with the tag passed as argument
 * @param {String} path - path to the element
 * @param {String} filename - filename of the element
 * @param {String} extension - extension of the element
 * @param {String} className - class of the element
 * @param {Number} id - id of the element
 * @returns {Object} - element created
 * */
export class Media{
    constructor(path, filename, extension, className, id, title){
        this.path = path;
        this.filename = filename;
        this.extension = extension;
        this.className = className;
        this.id = id;
        this.title = title;
    }
}

/**
 * This class creates an image with the tag passed as argument
 * @param {String} path - path to the image
 * @param {String} filename - filename of the image
 * @param {String} extension - extension of the image
 * @param {String} className - class of the image
 * @param {Number} id - id of the image
 * @returns {Object} - image created
 */
export class Image extends Media{
    constructor(path, filename, extension, className, id, title){
        super(path, filename, extension, className, id, title);
        this.alt = title;
    }
    display(){
        const image = document.createElement('img');
        image.src = `${this.path}${this.filename}.webp`;
        image.alt = this.alt;
        this.className? image.className = this.className : "";
        this.id? image.id = this.id : "";
        return image;
    }
}

/**
 * This class creates a video with the tag passed as argument
 * @param {String} path - path to the video
 * @param {String} filename - filename of the video
 * @param {String} extension - extension of the video
 * @param {String} className - class of the video
 * @param {Number} id - id of the video
 * @returns {Object} - video created
 * */
export class Video extends Media{
    constructor(path, filename, extension, className, id, title){
        super(path, filename, extension, className, id, title);
        this.alt = title;
    }
    play(){
        const video = document.createElement('video');
        video.src = `${this.path}${this.filename}.${this.extension}`;
        video.alt = this.alt;
        video.controls = true;
        video.autoplay = false;
        video.loop = false;
        this.className? video.className = this.className : "";
        this.id? video.id = this.id : "";
        return video;
    }
}

/**
 * This class creates a media with the tag passed as argument (image or video)
 * But it will determine the type of media to create by the extension
 * @param {String} path - path to the media
 * @param {String} filename - filename of the media
 * @param {String} extension - extension of the media
 * @param {String} className - class of the media
 * @param {Number}
 * @returns {Object} - media created
 * */
export class CreateThisMedia {
    constructor(path, filename, extension, className, id, title){
        className? "" : className = null;
        id? "": id = null;
        switch (extension.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'webp':
            case 'png':
              const image = new Image(path, filename, extension, className, id, title);
              return image.display();
            case 'mp4':
            case 'mov':
              const video = new Video(path, filename, extension, className, id, title);
              return video.play();
            default:
              throw new Error(`Type de média invalide : ${extension}`);
          }
    }
}

export function createThisElement(el, className, id, textContent) {
    const element = document.createElement(el);
    className ? element.className = className : null;
    id ? element.id = id : null;
    textContent ? element.textContent = textContent : null;
    return element;
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


// Probably not anymore useful
export function createThisImage(imageInformation) {
    const image = document.createElement('img');
    imageInformation.src ? image.src = imageInformation.src : null;
    imageInformation.alt ? image.alt = imageInformation.alt : null;
    imageInformation.className ? image.className = imageInformation.className : null;
    imageInformation.id ? image.id = imageInformation.id : null;
    return image;
}
// Probably not anymore useful
export function createThisVideo(videoInformation){
    const video = document.createElement('video');
    video.controls = true;
    const source = document.createElement('source');
    source.src = `assets/photographers/${videoInformation.filename}`;
    source.type = 'video/mp4';
    video.appendChild(source);
    return video;
}
