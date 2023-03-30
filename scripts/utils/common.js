export const server = './data/photographers.json';

export class Media{
    constructor(path, filename, extension, className, id){
        this.path = path;
        this.filename = filename;
        this.extension = extension;
        this.className = className;
        this.id = id;
    }
}

export class Image extends Media{
    constructor(path, filename, extension, className, id){
        super(path, filename, extension, className, id);
        this.alt = filename;
    }
    display(){
        const image = document.createElement('img');
        image.src = `${this.path}${this.filename}.webp`;
        image.alt = this.alt;
        image.className = this.className;
        image.id = this.id;
        return image;
    }
}

export class Video extends Media{
    constructor(path, filename, extension, className, id){
        super(path, filename, extension, className, id);
        this.alt = filename;
    }
    play(){
        const video = document.createElement('video');
        video.src = `${this.path}${this.filename}.${this.extension}`;
        video.alt = this.alt;
        video.autoplay = true;
        video.loop = true;
        video.className = this.className;
        video.id = this.id;
        return video;
    }
}

export class CreateThisMedia {
    constructor(path, filename, extension, className, id){
        switch (extension.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'webp':
            case 'png':
              const image = new Image(path, filename, extension, className, id);
              return image.display();
            case 'mp4':
            case 'mov':
              const video = new Video(path, filename, extension, className, id);
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
