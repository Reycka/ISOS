import Prueba from './Scenes/EscenaPrueba.js';

//Configuracion básica del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, //Le decimos que se centre en pantalla
        // Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
        // con un mínimo y un máximo de tamaño
        mode: Phaser.Scale.FIT,
        min: {
            width: 328,
            height: 188
        },
        max: {
            width: 1312,
            height: 752
        },
        zoom: 1
    },
    scene: [EscenaPrueba], //Hay que poner aqui las escenas a usar
    /*
    physics: {
        default: 'arcade', //Tenemos físicas simple, arcade
        arcade: {
            gravity: { y: 200 }, //Tenemos gravedad, podemos modificarla para aumentar su fuera o disminuirla
            debug: true // Aquí indicamos si queremos que Phaser pinte los cuerpos y fuerzas de los objetos con físicas
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    }
    */
   title: "EscenaPrueba"
};

const game = new Phaser.Game(config);
