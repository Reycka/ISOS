class DialogueSystem {
    constructor(scene, dialogues, character) {
        this.scene = scene;
        this.dialogues = dialogues;  
        this.character = character;  
        this.currentLine = 0;  

        // Texto 
        this.dialogueBox = scene.add.text(100, 450, "", {
            font: "20px Arial",
            fill: "#ffffff",
            wordWrap: { width: 600 }
        });

        // Nombre
        this.nameBox = scene.add.text(100, 400, "", {
            font: "18px Arial",
            fill: "#ffffff"
        });

        // Hacer click para avanzar
        this.scene.input.on('pointerdown', () => this.nextLine());
        
        //Primera línea
        this.displayCurrentLine();
    }

    // Línea actual
    displayCurrentLine() {
        if (this.currentLine < this.dialogues.length) {
            const line = this.dialogues[this.currentLine];
            
           //Expresiones
            if (line.expression) {
                this.character.changeExpression(line.expression);
            }

            //Actualizar
            this.character.say(line.text);
            this.nameBox.setText(line.name);
            this.dialogueBox.setText(line.text);
        } else {
            // Terminar
            this.endDialogue();
        }
    }

    nextLine() {
        this.currentLine++;
        this.displayCurrentLine();
    }

    endDialogue() {
        this.nameBox.setText("");
    }
}

export default DialogueSystem;
