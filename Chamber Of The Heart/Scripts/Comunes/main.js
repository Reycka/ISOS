//Configuracion básica del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example, //Hay que poner aqui las escenas a usar
};

const game = new Phaser.Game(config);
