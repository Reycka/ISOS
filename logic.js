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
