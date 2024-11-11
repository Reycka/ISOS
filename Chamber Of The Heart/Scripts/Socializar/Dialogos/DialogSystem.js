export default class DialogSystem {
    constructor(scene) {
        this.scene = scene;

        // Centro de la pantalla
        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.1;  // Ajuste verticalmente

        // Inicialización de texto para el nombre del personaje
        this.characterNameBox = this.scene.add.graphics();  // Cuadro del nombre del personaje
        this.characterNameText = this.scene.add.text(0, 0, '', { 
            fontSize: '28px', 
            fill: '#fff',  // Texto blanco
            fontFamily: 'Arial, sans-serif', 
            stroke: '#000',  // Borde negro alrededor del texto
            strokeThickness: 4 
        })
        .setOrigin(0.5, 0.5);  // Centrar el texto dentro del cuadro

        // Cuadro de diálogo (fondo detrás del texto del diálogo)
        this.dialogueBox = this.scene.add.graphics(); // Cuadro para el diálogo

        // Cuadro de diálogo (donde va el texto del personaje)
        this.dialogueText = this.scene.add.text(0, 100, '', { 
            fontSize: '36px', 
            fill: '#fff',  // Texto blanco
            fontFamily: 'Arial, sans-serif', 
            wordWrap: { width: this.scene.cameras.main.width - 160, useAdvancedWrap: true }, // Aumentar margen horizontal
            stroke: '#000',  // Borde negro alrededor del texto
            strokeThickness: 4  // Grosor del borde
        })
        .setOrigin(0.5, 0)
        .setShadow(2, 2, '#000000', 5, true, false);  // Sombra al texto

        // Estado de los diálogos
        this.dialogues = [];
        this.dialogIndex = 0;
        this.optionButtons = [];

        // Propiedad para verificar si hay opciones
        this.hasOptions = false;
    }

    // Cargar diálogos del evento y mostrarlos
    showEventDialogues(eventId, allDialogues) {
        const eventDialogues = allDialogues[eventId];

        if (!eventDialogues) {
            console.warn(`Evento con ID ${eventId} no encontrado.`);
            return;
        }

        this.dialogues = eventDialogues.dialogs;
        this.dialogIndex = 0;
        this.showNextDialogue();
    }

    // Mostrar el siguiente diálogo
    showNextDialogue() {
        if (this.dialogIndex < this.dialogues.length) {
            const { character, text, options = [] } = this.dialogues[this.dialogIndex];

            // Mostrar el nombre del personaje alineado a la derecha
            this.characterNameText.setText(character);
            const nameBoxWidth = 220;  // Ancho fijo para el cuadro del nombre
            const nameXPosition = this.centerX - 500; // Ajustar a la derecha
            this.characterNameText.setPosition(nameXPosition + nameBoxWidth / 2, this.centerY - 160); // Centrado en el cuadro

            // Dibujar el cuadro para el nombre del personaje (más a la derecha)
            this.characterNameBox.clear();
            this.characterNameBox.lineStyle(2, 0x000000, 1);  // Borde negro
            this.characterNameBox.fillStyle(0x000000, 0.8);  // Fondo negro
            this.characterNameBox.fillRect(nameXPosition, this.centerY - 180, nameBoxWidth, 40);  // Cuadro del nombre (más pequeño)
            this.characterNameBox.strokeRect(nameXPosition, this.centerY - 180, nameBoxWidth, 40);  // Borde del cuadro

            // Limpiar los botones previos
            this.optionButtons.forEach(button => button.destroy());
            this.optionButtons = [];

            // Dibujar el fondo del cuadro del diálogo
            const dialogueBoxHeight = this.scene.cameras.main.height / 4;  // Ajuste de la altura del cuadro de diálogo
            const dialogueBoxYPosition = this.centerY - 120; // Ajuste del cuadro de diálogo un poco más arriba

            this.dialogueBox.clear();  // Limpiar cuadro previo
            this.dialogueBox.lineStyle(2, 0x000000, 1);  // Borde negro
            this.dialogueBox.fillStyle(0x000000, 0.8);  // Fondo negro
            this.dialogueBox.fillRect(0, dialogueBoxYPosition, this.scene.cameras.main.width, dialogueBoxHeight);  // Cuadro de diálogo en la parte inferior
            this.dialogueBox.strokeRect(0, dialogueBoxYPosition, this.scene.cameras.main.width, dialogueBoxHeight);  // Borde del cuadro

            // Mostrar el texto del personaje
            const textMarginTop = 30;  // Margen adicional desde el borde del cuadro hasta el texto
            this.dialogueText.setText(text);
            this.dialogueText.setPosition(this.centerX, dialogueBoxYPosition + textMarginTop); // Ajuste vertical más cercano y con margen

            // Crear botones si hay opciones
            if (options.length > 0) {
                this.hasOptions = true;

                // Establecer la posición de las opciones en la parte superior del cuadro de diálogo
                options.forEach((option, index) => {
                    const buttonText = `→ ${option.response}`;
                    
                    // Posición X de las opciones (justo a la derecha)
                    const optionXPosition = this.centerX + 400;  // Ajustar a la derecha
                    const optionYPosition = dialogueBoxYPosition - 50 + (index * 60); // Posición vertical más arriba

                    // Crear el botón con estilo monocromático y reborde
                    const button = this.scene.add.text(optionXPosition, optionYPosition, buttonText, {
                        font: '24px Arial, sans-serif',
                        fill: '#fff',  // Texto blanco
                        stroke: '#000',  // Borde negro alrededor del texto
                        strokeThickness: 4,
                        backgroundColor: '#000000',  // Fondo negro para el botón
                        padding: { x: 15, y: 10 },
                        fontStyle: 'bold'  // Hacer el texto más fuerte
                    })
                    .setOrigin(0.5)
                    .setInteractive()
                    .on('pointerover', () => {
                        // Efecto hover: invertir colores
                        button.setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
                    })
                    .on('pointerout', () => {
                        // Restaura los estilos del botón
                        button.setStyle({ fill: '#fff', backgroundColor: '#000000' });
                    })
                    .on('pointerdown', () => this.handleOptionSelection(option.gain));  // Llama al manejador con el 'gain'

                    this.optionButtons.push(button);
                });
            } else {
                this.hasOptions = false;
            }

            this.dialogIndex++;
        } else {
            // Final del diálogo, limpiamos todo
            this.dialogueText.setText('');
            this.optionButtons.forEach(button => button.destroy());
            this.characterNameBox.clear();  // Limpiar el cuadro del nombre
            this.dialogueBox.clear();  // Limpiar el cuadro del diálogo
            this.dialogIndex = 0; // Reiniciar
        }
    }

    // Manejar la selección de una opción
    handleOptionSelection(gain) {
        console.log(`Opción seleccionada: ${gain}`);


        this.showNextDialogue();
    }

    // Evento de click en la escena
    onPointerDown(optionIndex) {
        if (!this.hasOptions) {
            this.showNextDialogue();
        }
    }
}
