export default class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        
        // Centrar
        this.dialogueText = this.scene.add.text(0, 100, '', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5, 0); 
        this.optionText = this.scene.add.text(0, 200, '', { fontSize: '28px', fill: '#fff' })
            .setOrigin(0.5, 0); 

        // Centro de la pantalla
        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.15;
        
        this.dialogues = [];
        this.dialogIndex = 0;
    }

    // Cargar diálogos del evento y mostrarlos
    showEventDialogues(eventId, allDialogues) {
        // Obtener los diálogos para el evento pasado
        const eventDialogues = allDialogues[eventId];
        if (!eventDialogues) {
            console.warn(`Evento con ID ${eventId} no encontrado.`);
            return;
        }

        // Reiniciar el índice de diálogos
        this.dialogues = eventDialogues;
        this.dialogIndex = 0;
        
        this.showNextDialogue();
    }

  
    showNextDialogue() {
        if (this.dialogIndex < this.dialogues.length) {
            const currentDialogue = this.dialogues[this.dialogIndex];
            const { character, text, options = [] } = currentDialogue;  
            
            // Mostrar el texto del personaje
            this.dialogueText.setText(`${character}: ${text}`);

            // Evitar solapamiento de textos
            this.dialogueText.setPosition(this.centerX, this.centerY - 100);

            // Verificar si hay opciones
            if (options.length > 0) {
                // Generar las opciones y centrarlas
                let optionText = '';
                for (let i = 0; i < options.length; i++) {
                    optionText += `${i + 1}. ${options[i].response}\n`;
                }

                this.optionText.setText(optionText);
                this.optionText.setPosition(this.centerX, this.centerY + 50); // Opciones debajo del diálogo
            } else {
                // Si no hay opciones, borramos el texto de las opciones
                this.optionText.setText('');
            }

            
            this.dialogIndex++;
        } else {
            this.dialogueText.setText(''); 
            this.optionText.setText('');  
            this.dialogIndex = 0; // Reiniciar 
        }
    }

    //Cada vez que hace click en las escena
    onPointerDown(optionIndex) {
        
        const currentDialogue = this.dialogues[this.dialogIndex - 1];
        if (currentDialogue && Array.isArray(currentDialogue.options) && currentDialogue.options.length > 0) {
            const selectedOption = currentDialogue.options[optionIndex];

            // Allamar a métodos de ganar reputación y ofrendas
            // Opción seleccionada: selectedOption.response Gain: selectedOption.gain
 
        }

        this.showNextDialogue();
    }
}
