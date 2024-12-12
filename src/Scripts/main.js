import EscenaPrincipal from './Scenes/EscenaPrincipal.js';
import EscenaCombate from './Scenes/EscenaCombate.js';
import EscenaSocialTienda from './Scenes/EscenaSocialTienda.js';
import EscenaVictoria from './Scenes/EscenaVictoria.js';

let config = {
    type: Phaser.WEBGL,
    antialias: true,
    antialiasGL: true,
    roundPixels: false,
    resolution: 2,
    parent: 'juego',
    width: 1920,
    height: 1080,
    pixelArt: false,
    
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
            width: 1812,
            height: 1052
        },
		zoom: 1
    },
    scene: [EscenaPrincipal,EscenaSocialTienda,EscenaCombate,EscenaVictoria], //Aquí metemos todas las escenas que tendrá nuestro juego (su clase, luego cambiaremos de una a otra mediante el id)

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
    },
    title: "Prueba de concepto",
    version: "1.0.2"
};

/*
    Instanciamos Phaser con la configuración deseada, Phaser se encargará de lanzar la primera escena del array de escenas
*/
export default config;