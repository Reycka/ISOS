import config from './src/Scripts/main.js';

window.openTab = function(evt, tabName) {
    var i, tabcontent, tablinks;

    // Ocultar todos los contenidos de las pestañas
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Eliminar la clase "active" de todos los botones de las pestañas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar el contenido de la pestaña actual y añadir la clase "active" al botón de la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Si la pestaña es "Tab1", inicializar el juego de Phaser y hacer visible el canvas
    if (tabName === 'Tab1') {
        if (!window.game) {
            window.game = new Phaser.Game(config);
        }
        document.querySelector('canvas').classList.remove('invisible');
    } else {
        // Hacer invisible el canvas si no es la pestaña "Tab1"
        if (window.game) document.querySelector('canvas').classList.add('invisible');
    }
}

// Mostrar solo los botones y el título al recargar la página
document.addEventListener("DOMContentLoaded", function() {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
});
//Imágenes del carrusel
const images = [
    {
        src: "https://github.com/Reycka/ISOS/blob/main/src/Assets/Finales/ShaiWeb.png?raw=true?raw=true",
        title: "SHAI",
        description: "Sacerdote principal del templo de Ra y protagonista del juego, su misión es proteger el templo de los ataques de Apofis"
    },
    {
        src: "https://github.com/Reycka/ISOS/blob/main/src/Assets/Finales/EsheTarikWeb.png?raw=true",
        title: "TARIK & ESHE",
        description: "Tarik es parte del sacerdocio del templo de Ra, lleva trabajando en el desde muy joven, su hermana Eshe, vive allí  pese a no formar parte de su personal para estar cerca de él."
    },
    {
        src: "https://github.com/Reycka/ISOS/blob/main/src/Assets/Finales/KhalidWeb.png?raw=true",
        title: "KHALID",
        description: "Un niño que se ha refugiado en el templo tras perder a sus padres tras el ataque de la serpiente"
    },
    {
        src: "https://github.com/Reycka/ISOS/blob/main/src/Assets/Finales/AdioWeb.png?raw=true",
        title: "ADIO",
        description: "Antiguo guardia de un templo de Horus. Es uno de los únicos supervivientes del ataque de Apofis a su templo, ahora se refugia en el templo de Shai"
    }
    // Agrega más objetos de imagen según sea necesario
];
//Index
let currentIndex = 0;

//Función que muestra la imagen y el texto en función del index
function updateContent(index) {
    const imgElement = document.querySelector("#img-carrusel img");
    const titleElement = document.querySelector("#texto-carrusel h3");
    const descriptionElement = document.querySelector("#texto-carrusel p");

    imgElement.src = images[index].src;
    titleElement.textContent = images[index].title;
    descriptionElement.textContent = images[index].description;
}

document.getElementById("arrowleft").addEventListener("click", function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    updateContent(currentIndex);
});

document.getElementById("arrowright").addEventListener("click", function() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    updateContent(currentIndex);
});

// Inicializa el contenido con la primera imagen
updateContent(currentIndex);
