// DialogueSystem.js
export default class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.dialogueText = this.scene.add.text(100, 100, '', { fontSize: '32px', fill: '#fff' });
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
            const { name, text } = currentDialogue; // Desestructuración para obtener el nombre y el texto
            this.dialogueText.setText(`${name}: ${text}`);
            this.dialogIndex++;
        } else {
            
            this.dialogIndex = 0; // Reiniciar si quieres volver a empezar
        }
    }

    onPointerDown() {
        this.showNextDialogue();
    }
}
