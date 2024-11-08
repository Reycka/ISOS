// DialogSystem.js
export default class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        
        // Ajustamos el texto para que se centre
        this.dialogueText = this.scene.add.text(0, 100, '', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5, 0); // Establecemos el origen al centro horizontalmente
        this.optionText = this.scene.add.text(0, 200, '', { fontSize: '28px', fill: '#fff' })
            .setOrigin(0.5, 0); // Establecemos el origen al centro horizontalmente

        // Calculamos el centro de la pantalla
        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.15;
        
        this.dialogues = [];
        this.dialogIndex = 0;
    }

    loadDialogues(dialogues) {
        this.dialogues = dialogues;
        this.dialogIndex = 0;
        this.showNextDialogue();
    }

    showNextDialogue() {
        if (this.dialogIndex < this.dialogues.length) {
            const currentDialogue = this.dialogues[this.dialogIndex];
            const { character, text, numOptions, options } = currentDialogue;  // Desestructuración
            this.dialogueText.setText(`${character}: ${text}`);

            // Centramos el texto en X y ajustamos la posición vertical para que no se solapen los textos
            this.dialogueText.setPosition(this.centerX, this.centerY - 100); // Desplazamos el texto del diálogo un poco arriba

            // Verificar si hay opciones
            if (numOptions && numOptions > 0) {
                // Generar las opciones y centrarlas
                let optionText = '';
                for (let i = 0; i < numOptions; i++) {
                    optionText += `${i + 1}. ${options[i].response}\n`;
                }

                this.optionText.setText(optionText);
                this.optionText.setPosition(this.centerX, this.centerY + 50); // Posicionamos las opciones debajo del diálogo
            } else {
                // Si no hay opciones, borramos el texto de las opciones
                this.optionText.setText('');
            }

            // Avanzamos al siguiente diálogo
            this.dialogIndex++;
        } else {
            this.dialogIndex = 0; // Reiniciar si quieres volver a empezar
        }
    }

    onPointerDown(optionIndex) {
        // Si hay opciones seleccionadas, manejar la opción
        if (this.dialogues[this.dialogIndex - 1].options) {
            const currentDialogue = this.dialogues[this.dialogIndex - 1];
            const selectedOption = currentDialogue.options[optionIndex];

            // Aquí manejarías lo que pasa según la opción seleccionada
            console.log('Opción seleccionada:', selectedOption.response, 'Gain:', selectedOption.gain);
        }

        this.showNextDialogue();
    }
}
