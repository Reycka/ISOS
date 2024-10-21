export class Dialog extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);  // Constructor del sprite
        this.scene = scene;
        this.dialogos = {};  // Array para almacenar los diálogos
        this.numPersonajes = 6;
        this.numEventos = 5;
        this.visible = false; // Empieza invisible

        this.currentDialog = null;  // El diálogo actual que se está mostrando
        this.currentLineIndex = 0;  // Línea actual del diálogo que se está mostrando

        // Crear el objeto de texto 
        this.text = this.scene.add.text(x, y, '', { fontSize: '16px', fill: '#fff' });
        this.text.setVisible(false); // El texto inicia invisible

        // Añadir el objeto a la escena
        this.scene.add.existing(this);

        //Click para avanzar
        this.setInteractive();
        this.on('pointerdown', () => {
            this.mostrarSiguienteLinea();  // Avanzar en el diálogo al hacer clic en el sprite
        });
    }


    // Método para mostrar la siguiente línea del diálogo
    mostrarSiguienteLinea() {
        if (this.currentDialog && this.currentLineIndex < this.currentDialog.length) {
            this.text.setText(this.currentDialog[this.currentLineIndex]);  // Mostrar la línea actual
            this.text.setVisible(true);  // Hacer visible el texto
            this.visible = true;  // Mostrar el cuadro de diálogo
            this.currentLineIndex++;  // Avanzar a la siguiente línea
        } else {
            this.ocultarDialogo();  // Si no hay más líneas, ocultar el diálogo
        }
    }

    // Método para ocultar el diálogo
    ocultarDialogo() {
        this.text.setVisible(false);
        this.visible = false;  
        this.currentDialog = null;  
        this.currentLineIndex = 0; 
    }
}
