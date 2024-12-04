import BattleManager from "./BattleManager.js";
import UnitClass from "./UnitClass.js";

export default class AlteredStateClass{

    
    constructor(){
        this.alteredStates = [];
    }

    getAlteredState(states){
        this.alteredStates = states;
    }

    applyAlteredStates(unit){
        if (this.alteredStates.length === 0 || !unit) return;

        this.alteredStates.forEach((state, index) => {
            if (state) {
                // LISTA DE EFECTOS
                    /*  jeros[0] --> Osiris (3) REVIVIR TROPAS: Al morir una unidad tiene una probabilidad del 10% de revivir
                        jeros[1] --> Ra (5) QUEMADURA: Inflinge poco daño de manera periódica 
                        jeros[2] --> Anubis (5) INSTAKILL: Los aliados tienen una probabilidad de matar instantaneamente a su enemigo
                        jeros[3] --> Isis (4) CURAR: Cura un porcentaje de la vida de las unidades
                        jeros[4] --> Horus (3) CEGUERA: Los enemigos tienen una probabilidad de fallar ataques
                        jeros[5] --> Seth (5) AUMENTO DE DAÑO: Hace que las tropas del jugador aumenten el daño inflingido
                    */ 
                        switch (index) {
                            case 0: // Osiris - Probabilidad de revivir
                                unit.addReviveChance(0.1); // 10% de probabilidad de revivir
                                break;
                            case 1: // Ra - Quemadura
                                unit.applyBurn(2, 3); // 2 de daño 3 veces
                                break;
                            case 2: // Anubis - Instakill
                                unit.addInstakillChance(0.2); // 10% de probabilidad de hacer instakill
                                break;
                            case 3: // Isis - Cura periódica
                                unit.applyPeriodicHeal(0.1); // 10% de curación periodica por turno
                                break;
                            case 4: // Horus - Ceguera
                                unit.addBlindChance(0.15); // 15% de probabilidad de falla
                                break;
                            case 5: // Seth - Aumento de daño
                                unit.boostAttack(0.2); // Incrementa el ataque un 20%.
                                break;
                        }
            }
        });
    }

}