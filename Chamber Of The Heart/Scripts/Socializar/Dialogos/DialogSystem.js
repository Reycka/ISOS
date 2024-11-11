export default class DialogSystem {
    constructor(scene) {
        this.scene = scene;
        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.1;

        // Elementos gráficos para el nombre y diálogo
        this.characterNameBox = this.scene.add.graphics();
        this.characterNameText = this.scene.add.text(0, 0, '', { 
            fontSize: '28px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            stroke: '#000', 
            strokeThickness: 4 
        }).setOrigin(0.5, 0.5);

        this.dialogueBox = this.scene.add.graphics();
        this.dialogueText = this.scene.add.text(0, 100, '', { 
            fontSize: '36px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            wordWrap: { width: this.scene.cameras.main.width - 160, useAdvancedWrap: true },
            stroke: '#000', 
            strokeThickness: 4
        }).setOrigin(0.5, 0).setShadow(2, 2, '#000000', 5, true, false);

        this.dialogues = [];
        this.dialogIndex = 0;
        this.optionButtons = [];
        this.hasOptions = false;
        this.end = false;
    }

    showEventDialogues(eventId, allDialogues) {
        const eventDialogues = allDialogues[eventId];
        if (!eventDialogues) return;

        this.end = false;
        this.dialogues = eventDialogues.dialogs;
        this.dialogIndex = 0;
        this.showNextDialogue();
    }

    showNextDialogue() {
        if (this.dialogIndex < this.dialogues.length) {
            const { character, text, options = [] } = this.dialogues[this.dialogIndex];

            // Mostrar nombre del personaje y cuadro
            this.characterNameText.setText(character);
            const nameBoxWidth = 220;
            const nameXPosition = this.centerX - 700; 
            this.characterNameText.setPosition(nameXPosition + nameBoxWidth / 2, this.centerY - 160);

            this.characterNameBox.clear();
            this.characterNameBox.lineStyle(2, 0x000000, 1);
            this.characterNameBox.fillStyle(0x000000, 0.8);
            this.characterNameBox.fillRect(nameXPosition, this.centerY - 180, nameBoxWidth, 40);
            this.characterNameBox.strokeRect(nameXPosition, this.centerY - 180, nameBoxWidth, 40);

            // Limpiar botones previos
            this.optionButtons.forEach(button => button.destroy());
            this.optionButtons = [];

            // Cuadro de diálogo
            const dialogueBoxHeight = this.scene.cameras.main.height / 4;
            const dialogueBoxYPosition = this.centerY - 120;

            this.dialogueBox.clear();
            this.dialogueBox.lineStyle(2, 0x000000, 1);
            this.dialogueBox.fillStyle(0x000000, 0.8);
            this.dialogueBox.fillRect(0, dialogueBoxYPosition, this.scene.cameras.main.width, dialogueBoxHeight);
            this.dialogueBox.strokeRect(0, dialogueBoxYPosition, this.scene.cameras.main.width, dialogueBoxHeight);

            // Mostrar texto
            const textMarginTop = 30;
            this.dialogueText.setText(text);
            this.dialogueText.setPosition(this.centerX, dialogueBoxYPosition + textMarginTop);

            // Crear opciones
            if (options.length > 0) {
                this.hasOptions = true;
                options.forEach((option, index) => {
                    const buttonText = `→ ${option.response}`;
                    const optionXPosition = this.centerX + 500;
                    const optionYPosition = dialogueBoxYPosition - 100 + (index * 60);

                    const button = this.scene.add.text(optionXPosition, optionYPosition, buttonText, {
                        font: '24px Arial, sans-serif',
                        fill: '#fff',
                        stroke: '#000',
                        strokeThickness: 4,
                        backgroundColor: '#000000',
                        padding: { x: 15, y: 10 },
                        fontStyle: 'bold'
                    }).setOrigin(0.5).setInteractive()
                    .on('pointerover', () => {
                        button.setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
                    })
                    .on('pointerout', () => {
                        button.setStyle({ fill: '#fff', backgroundColor: '#000000' });
                    })
                    .on('pointerdown', () => this.handleOptionSelection(option.gain));

                    this.optionButtons.push(button);
                });
            } else {
                this.hasOptions = false;
            }

            this.dialogIndex++;
        } else {
            // Fin del diálogo
            this.end = true;
            this.scene.events.emit('endDialogue');
            this.dialogueText.setText('');
            this.characterNameText.setText('');
            this.optionButtons.forEach(button => button.destroy());
            this.characterNameBox.clear();
            this.dialogueBox.clear();
            this.dialogIndex = 0;
        }
    }

    handleOptionSelection(gain) {
        console.log(`Opción seleccionada: ${gain}`);
        this.showNextDialogue();
    }

    onPointerDown(optionIndex) {
        if (!this.hasOptions && !this.end) {
            this.showNextDialogue();
        }
    }
}
