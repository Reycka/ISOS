import BattleManager from "./BattleManager";
import UnitClass from "./UnitClass";

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
                // Ejemplo de efectos: Reducir vida, defensa, etc.
                //switch (index) {
                //    case 0: // Estado 0: Más daño recibido
                //        unit.card.defense *= 0.8; // Reduce la defensa un 20%.
                //        break;
                //    case 1: // Estado 1: Menos regeneración de salud
                //       unit.acthealth -= 5; // Reduce la vida actual.
                //        break;
                //}
            }
        });
    }

}