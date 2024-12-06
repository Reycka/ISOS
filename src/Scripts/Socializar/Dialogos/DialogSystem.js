import Inventory from './../../Comunes/Inventory.js'

export default class DialogSystem {

    constructor(scene, _inventory, allDialogues) {
        this.scene = scene;
        this.inventory = _inventory;
        this.Dialogues = allDialogues;

        console.log(allDialogues)


        if (!(this.inventory instanceof Inventory)) {
            console.error("Error: `inventory` no es una instancia de Inventory");
        }

        this.centerX = this.scene.cameras.main.width / 2;
        this.centerY = this.scene.cameras.main.height / 1.1;

        // Elementos gráficos para el nombre y diálogo
        this.characterNameBox = this.scene.add.graphics();
        this.characterNameText = this.scene.add.text(0, 0, '', { 
            fontSize: '40px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            stroke: '#000', 
            strokeThickness: 4 
        }).setOrigin(0.5, 0.5);

        this.dialogueBox = this.scene.add.graphics();
        this.dialogueText = this.scene.add.text(0, 0, '', { 
            fontSize: '36px', 
            fill: '#fff', 
            fontFamily: 'Arial, sans-serif', 
            wordWrap: { width: this.scene.cameras.main.width - 200, useAdvancedWrap: true },
            stroke: '#000', 
            strokeThickness: 4
        }).setOrigin(0, 0).setShadow(2, 2, '#000000', 5, true, false);

        this.dialogues = [];
        this.dialogIndex = 0;
        this.optionButtons = [];
        this.hasOptions = false;
        this.end = false;
    }

    showEventDialogues(eventId, allDialogues) {

        console.log('allDialogues');
        const eventDialogues = allDialogues[eventId];
        if (!eventDialogues) return;


        this.end = false;
        this.dialogues = eventDialogues.dialogs;
        this.dialogIndex = 0;

        // Muestra la capa oscura desde la escena principal
        this.scene.events.emit('showDialogueBackground');

        this.showNextDialogue();
    }

    showNextDialogue() {
        if (this.dialogIndex < this.dialogues.length) {
            const { character, text, options = [] } = this.dialogues[this.dialogIndex];

            // Mostrar nombre del personaje y cuadro
            this.characterNameText.setText(character);
            const nameBoxWidth = 300;
            const nameXPosition = this.centerX - 910; 
            this.characterNameText.setPosition(nameXPosition + nameBoxWidth / 2, this.centerY - 170);

            this.characterNameBox.clear();
            this.characterNameBox.lineStyle(2, 0x000000, 1);
            this.characterNameBox.fillStyle(0x000000, 0.8);
            this.characterNameBox.fillRect(nameXPosition, this.centerY - 200, nameBoxWidth, 60);
            this.characterNameBox.strokeRect(nameXPosition, this.centerY - 200, nameBoxWidth, 60);

            // Limpiar botones previos
            this.optionButtons.forEach(button => button.destroy());
            this.optionButtons = [];

            // Cuadro de diálogo
            const dialogueBoxHeight = this.scene.cameras.main.height / 5;
            const dialogueBoxYPosition = this.centerY - 130;

            this.dialogueBox.clear();
            this.dialogueBox.lineStyle(2, 0x000000, 1);
            this.dialogueBox.fillStyle(0x000000, 0.8);
            this.dialogueBox.fillRect(50, dialogueBoxYPosition, this.scene.cameras.main.width - 100, dialogueBoxHeight);
            this.dialogueBox.strokeRect(50, dialogueBoxYPosition, this.scene.cameras.main.width - 100, dialogueBoxHeight);

            // Mostrar texto
            const textMarginTop = 50;
            this.dialogueText.setText(text);
            this.dialogueText.setPosition(150, dialogueBoxYPosition + textMarginTop);

            // Crear opciones
            if (options.length > 0) {
                this.hasOptions = true;
                options.forEach((option, index) => {
                    const buttonText = `→ ${option.response}`;
                    const optionXPosition = this.centerX + 600;
                    const optionYPosition = dialogueBoxYPosition - 250 + (index * 85);

                    const button = this.scene.add.text(optionXPosition, optionYPosition, buttonText, {
                        font: '30px Arial, sans-serif',
                        fill: '#fff',
                        stroke: '#000',
                        strokeThickness: 4,
                        backgroundColor: '#000000',
                        padding: { x: 30, y: 20 },
                        fontStyle: 'bold'
                    }).setOrigin(0.5).setInteractive()
                    .on('pointerover', () => {
                        button.setStyle({ fill: '#000000', backgroundColor: '#ffffff' });
                    })
                    .on('pointerout', () => {
                        button.setStyle({ fill: '#fff', backgroundColor: '#000000' });
                    })
                    .on('pointerdown', () => this.handleOptionSelection(option.gain,option));

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
            this.scene.events.emit('hideDialogueBackground'); 
            this.dialogueText.setText('');
            this.characterNameText.setText('');
            this.optionButtons.forEach(button => button.destroy());
            this.characterNameBox.clear();
            this.dialogueBox.clear();
            this.dialogIndex = 0;
        }
    }



    handleOptionSelection(gain, option) {
        //console.log(`Opción seleccionada: ${gain}`);

        if(gain === 0){

            this.inventory.AddGift(1);
            console.log(this.inventory);
        }

        if(gain === 1){

            this.inventory.AddGift(2);
            console.log(this.inventory);
        }

        if (option.next) {
            console.log(`Opción con 'next' encontrada: ${option.response} -> next: ${option.next}`);
            this.showEventDialogues(option.next, this.Dialogues);
        }
        else{

            this.showNextDialogue();

        }

    }

    onPointerDown(optionIndex) {
       
        if (!this.hasOptions && !this.end) {
            this.showNextDialogue();
        }
    }
}
