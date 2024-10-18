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

    // Método para cargar los diálogos al inicio 
    onload() {
        this.cargarDialogos(this.numEventos, this.numPersonajes); 
    }

    // Método para cargar los archivos JSON de los diálogos
    cargarDialogos(eventos, personajes) {
        for (let i = 0; i < eventos; i++) {
            this.dialogos[i] = []; // Cada fila del array es un evento
        }

        // Cargar los archivos JSON para cada combinación de evento y personaje
        for (let i = 0; i < eventos; i++) {
            for (let j = 0; j < personajes; j++) {
                let ruta = `../Texto/${i}/${j}.json`; //Carpeta donde se encuentran los archivos JSON
                this.cargarDialogo(i, j, ruta);
            }
        }
    }

    // Método para cargar un archivo JSON y almacenarlo en el array de diálogos
    cargarDialogo(evento, personaje, ruta) {
        fetch(ruta)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json(); // Parsear
            })
            .then(data => {
                this.dialogos[evento][personaje] = data.dialogo;  
                console.log(`Diálogos cargados para evento ${evento}, personaje ${personaje}`);
            })
            .catch(error => {
                console.error(`Error al cargar los diálogos del evento ${evento}, personaje ${personaje}:`, error);
            });
    }

    // Método para elegir el diálogo según el evento y el personaje
    elegirDialogo(numEvent, idChar) {
        if (this.dialogos[numEvent] && this.dialogos[numEvent][idChar]) {
            this.currentDialog = this.dialogos[numEvent][idChar];  // Cargar el diálogo actual
            this.currentLineIndex = 0;  
            this.mostrarSiguienteLinea();  // Mostrar la primera línea del diálogo
        } else {
            console.warn('No se encontró diálogo para este evento o personaje');
        }
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
