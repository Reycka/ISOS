//Tiene que al pillar una carta del inventario se quede como carta seleccionada y que si se clica en una SlotClass instancie la unidad hay
//Si hay una unidad en la casilla NO HACE NADA (por el momento)
//La carta al clickar llama la battleManager y se hace desde la propia escena
import AlteredStateClass from "./AlteredStateClass.js";
export default class BattleManager {
    //PROPIEDADES
    mat; //matriz que le vamos a pasar
    card; //Representa la carta seleccionada del inventario
    _texture;
    enemymatriz; //Matriz de enemigos que se crea aquí
    victory = false;
    defeat = false;
    scene;
    auxd;
    auxv;
    target = false;
    jeros = new Jeroglifico();
    uxunitchange;

    //CONSTRUCTORA
    constructor(_mat, _enemymatriz, _scene,) {
        this.mat = _mat;
        this.card = null;
        this._texture = null;
        this.scene = _scene;
        this.enemymatriz = _enemymatriz;
        this.victory = false;
        this.defeat = false
        this.AlteredStates = new AlteredStateClass();
        this.numCards = 0;
    }
    //MÉTODOS
    ///Método encargado asignar la carta seleccionada del inventario al battleManager
    SetCard(_card, id) {
        this.card = _card;
        this._texture = id;
        this.texture = id;
    }
    //Método encargado de summonear la tropa en la casilla
    Summon(posX, posY) {
        if (this.card != null && this.mat.mat[posX][posY].ocupada == false) {
            this.auxcard = -1; 
            this.mat.mat[posX][posY].SetUnit(this.card.SummonUnit((this._texture)));
            this.SetJeroglifico(this.card,true);
            this.card = null;
            this._texture = null;
        }
        else if(this.card != null && this.mat.mat[posX][posY].ocupada == true){
            this.auxcard =  this.mat.mat[posX][posY].GetUnit().whichcard.inventoryindex;
            this.SetJeroglifico(this.mat.mat[posX][posY].GetUnit().whichcard,false);
            this.mat.mat[posX][posY].SetUnit(this.card.SummonUnit((this._texture)));
            this.SetJeroglifico(this.card,true);
            this.card = null;
            this._texture = null;
        }
        else if(this.card == null && this.mat.mat[posX][posY].ocupada == true){
            this.auxcard =  this.mat.mat[posX][posY].GetUnit().whichcard.inventoryindex;
            this.SetJeroglifico(this.mat.mat[posX][posY].GetUnit().whichcard,false);
            this.mat.mat[posX][posY].SetUnit();
        }
    }
    GetVictory() {
        if (this.victory == true) {
            return true;
        }
        else return false;
    }
   
    /*
    Se encarga de que todas las unidades ejecuten sus updates y genstiona el movimiento de estas, 
    liberacion de casillas y la victoria o derrota
    */
    Battle() {
        if (this.victory == false && this.defeat == false) {
            //comprobamos las unidades que pueden atacar de la matriz aliada
            //boooleanos para comprobar si quedan tropas
            this.auxv = true;
            this.auxd = true;
            //Primer bucle que ejecuta todos los updates de la matriz aliada
            for (var i = 0; i < this.mat.row; i++) {
                for (var j = 0; j < this.mat.col; j++) {
                    this.target = false;
                    if (this.mat.mat[i][j].GetState()) {
                        //comprobamos si esta lista
                        if(this.mat.mat[i][j].unit.actcooldown==1){
                            this.mat.mat[i][j].AttackMove(false);
                        }
                        if (this.mat.mat[i][j].GetUnit().isready) {
                            //En caso de ser healer le pasamos unidades aliadas
                            if (this.mat.mat[i][j].GetUnit().IsaHealer()) {
                                console.log("entro a curar y eso");
                                if ((i - 1) != -1) {
                                    if (this.mat.mat[i - 1][j].GetState()) {
                                        this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i - 1][j].GetUnit())
                                        this.target = true;
                                        this.mat.mat[i - 1][j].Getheal();

                                    }
                                }
                                if ((i + 1) < this.mat.row) {
                                    if (this.mat.mat[i + 1][j].GetState()) {
                                        this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i + 1][j].GetUnit())
                                        this.target = true;
                                        this.mat.mat[i + 1][j].Getheal();
                                    }
                                } if ((j - 1) != -1) {
                                    if (this.mat.mat[i][j - 1].GetState()) {
                                        this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i][j - 1].GetUnit())
                                        this.target = true;
                                        this.mat.mat[i][j - 1].Getheal();
                                    }
                                }
                                if ((j + 1) < this.mat.col) {
                                    if (this.mat.mat[i][j + 1].GetState()) {
                                        this.mat.mat[i][j].GetUnit().Update(this.mat.mat[i][j + 1].GetUnit())
                                        this.target = true;
                                        this.mat.mat[i][j + 1].Getheal();
                                    }
                                }
                                //Si no tiene objetivos alcanzables busca una posicion donde poder curar
                                if (this.target == false) {
                                    this.encontrado = false;
                                    this.indiceaux = 0;      
                                    while (this.indiceaux < this.mat.row && (this.encontrado == false)) {
                                        if (this.mat.mat[this.indiceaux][j].GetState()==false) {
                                            //detras
                                            if (j > 0) {
                                                if (this.mat.mat[this.indiceaux][j - 1].GetState()) {
                                                    this.encontrado = true;
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[this.indiceaux][j].setScale(0.33, 0.33);
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }
                                           //frente
                                            if (j == 0) {
                                                if (this.mat.mat[this.indiceaux][j + 1].GetState()) {
                                                    this.encontrado = true;
                                                    console.log(this.mat.mat[i][j].GetUnit()._unittexture)
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }
                                            if (this.indiceaux > 0) {
                                                if (this.mat.mat[this.indiceaux-1][j].GetState()) {
                                                    this.encontrado = true;
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[this.indiceaux][j].setScale(0.33, 0.33);
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }
                                           //frente
                                            if (this.indiceaux == 0) {
                                                if (this.mat.mat[this.indiceaux+1][j].GetState()) {
                                                    this.encontrado = true;
                                                    console.log(this.mat.mat[i][j].GetUnit()._unittexture)
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }     
                                        }
                                        this.indiceaux+=1;
                                        console.log(this.indiceaux);
                                    }
                                }
                            }
                            //Resto de unidades                             
                            else {

                                //Ataca al enemigo que tenga delante
                                if ((j - 1) != -1) {

                                    if (this.enemymatriz.Enemymat.mat[i][j - 1].GetState()) {
                                        if (this.target == false) {
                                            this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j - 1].GetUnit())
                                            if (this.enemymatriz.Enemymat.mat[i][j - 1].GetUnit().isalife == false) {
                                                this.enemymatriz.Enemymat.mat[i][j - 1].SetFree();
                                            } else {
                                                this.enemymatriz.Enemymat.mat[i][j - 1].Getdamage();
                                            }
                                            this.target = true;
                                        }

                                    }

                                }
                                if (this.enemymatriz.Enemymat.mat[i][j].GetState()) {
                                    if (this.target == false) {
                                        this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j].GetUnit())
                                        if (this.enemymatriz.Enemymat.mat[i][j].GetUnit().isalife == false) {
                                            this.enemymatriz.Enemymat.mat[i][j].SetFree();
                                        } else {
                                            this.enemymatriz.Enemymat.mat[i][j].Getdamage();
                                        }
                                    }
                                    this.target = true;
                                }
                                if ((j + 1) < this.enemymatriz.Enemymat.col) {

                                    if (this.enemymatriz.Enemymat.mat[i][j + 1].GetState()) {
                                        if (this.target == false) {
                                            this.mat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j + 1].GetUnit())
                                            this.target = true;
                                            if (this.enemymatriz.Enemymat.mat[i][j + 1].GetUnit().isalife == false) {
                                                this.enemymatriz.Enemymat.mat[i][j + 1].SetFree();
                                            } else {
                                                this.enemymatriz.Enemymat.mat[i][j + 1].Getdamage();
                                            }
                                        } this.target = true;
                                    }


                                }
                                //Si no tiene enemigos a la vista busca una posicion libre donde ser util
                                if (this.target == false) {
                                    this.encontrado = false;
                                    this.indiceaux = 0;
                                    while (this.indiceaux < this.mat.row && (this.encontrado == false)) {
                                        if (this.mat.mat[this.indiceaux][j].GetState()==false) {
                                            if (j > 0) {
                                                if (this.enemymatriz.Enemymat.mat[this.indiceaux][j - 1].GetState()) {
                                                    this.encontrado = true;
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[this.indiceaux][j].setScale(0.33, 0.33);
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }
                                            else if (this.enemymatriz.Enemymat.mat[this.indiceaux][j].GetState()) {
                                                this.encontrado = true;
                                                this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                this.mat.mat[this.indiceaux][j].setScale(0.33, 0.33);
                                                this.mat.mat[i][j].SetFree();
                                            }
                                            if (j == 0) {
                                                if (this.enemymatriz.Enemymat.mat[this.indiceaux][j + 1].GetState()) {
                                                    this.encontrado = true;
                                                    this.auxunitchange = this.enemymatriz.Enemymat.mat[i][j];
                                                    console.log(this.mat.mat[i][j].GetUnit()._unittexture)
                                                    this.mat.mat[this.indiceaux][j].SetUnit(this.mat.mat[i][j].GetUnit());
                                                    this.mat.mat[i][j].SetFree();
                                                }
                                            }
                                            
                                        }
                                        this.indiceaux+=1;
                                    }
                                }
                            }
                        }
                        this.mat.mat[i][j].GetUnit().Cooldown();
                        this.auxd = false;
                    }


                }
            }
            //bucle matriz enemigos
            for (var i = 0; i < this.enemymatriz.Enemymat.row; i++) {
                for (var j = 0; j < this.enemymatriz.Enemymat.col; j++) {
                    if (this.enemymatriz.Enemymat.mat[i][j].GetUnit().card.unit_type == "B" && this.enemymatriz.Enemymat.mat[i][j].GetUnit().isalife == false) {
                        this.victory = true;
                    }
                    if (this.enemymatriz.Enemymat.mat[i][j].GetState()) {
                        if(this.enemymatriz.Enemymat.mat[i][j].unit.actcooldown==1){
                            this.enemymatriz.Enemymat.mat[i][j].AttackMove(true);
                        }
                        if (this.enemymatriz.Enemymat.mat[i][j].GetUnit().isready) {
                            this.target = false;
                            if (this.enemymatriz.Enemymat.mat[i][j].GetUnit().IsaHealer()) {
                                if ((i - 1) != -1) {
                                    if (this.enemymatriz.Enemymat.mat[i][j].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i - 1][j].GetUnit())
                                        this.target = true;
                                    }
                                }
                                if ((i + 1) < this.enemymatriz.Enemymat.row) {
                                    if (this.enemymatriz.Enemymat.mat[i + 1][j].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i + 1][j].GetUnit())
                                        this.target = true;
                                    }
                                } if ((j - 1) != -1) {
                                    if (this.enemymatriz.Enemymat.mat[i][j - 1].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j - 1].GetUnit())
                                        this.target = true;
                                    }
                                }
                                if ((j + 1) < this.enemymatriz.Enemymat.col) {
                                    if (this.enemymatriz.Enemymat.mat[i][j + 1].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.enemymatriz.Enemymat.mat[i][j + 1].GetUnit())
                                        this.target = true;
                                    }
                                }


                            }
                            else {
                                //unidades que no curan
                                if ((j + 1) < this.mat.col) {
                                    if (this.mat.mat[i][j + 1].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j + 1].GetUnit())
                                        //  console.log("esta la unidad viva"+this.mat.mat[i][j+1].GetUnit().isalife)
                                        if (this.mat.mat[i][j + 1].GetUnit().isalife == false) {
                                            this.mat.mat[i][j + 1].SetFree();
                                            //   console.log("casilla liberada"+i+j+1);
                                        } else this.mat.mat[i][j + 1].Getdamage();
                                        this.target = true;
                                    }
                                }

                                else if (this.mat.mat[i][j].GetState()) {
                                    this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j].GetUnit())
                                    if (this.mat.mat[i][j].GetUnit().isalife == false) {
                                        this.mat.mat[i][j].SetFree();
                                    } else this.mat.mat[i][j].Getdamage();
                                    this.target = true;
                                }
                                else if ((j - 1) != -1) {
                                    if (this.mat.mat[i][j - 1].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j - 1].GetUnit())
                                        if (this.mat.mat[i][j - 1].GetUnit().isalife == false) {
                                            this.mat.mat[i][j - 1].SetFree();
                                        } else this.mat.mat[i][j - 1].Getdamage();
                                        this.target = true;
                                    }
                                }                       
                            }
                        } 
                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Cooldown();
                        this.auxv = false;
                        if (this.victory == true) this.auxv = true;
                    }
                }
            }
            //comprobamos si alguna de las matrices se ha quedado sin enemigos aprobechando el recorrido de los updates
            if (this.auxv == true && this.auxd == false) {
                this.victory = true;
                return false;
            }
            else if (this.auxv == false && this.auxd == true) {
                this.defeat = true;
                return false;
            }
            else {

                return true;
            }

        }
    }
    SetJeroglifico(card,aux) {
        for (let i = 0; i < 6; ++i) {
            for (let j = 0; j < this.jeros.getSize(i); ++j) {
                if (card.stads.letter == this.jeros.getValue(i, j) && this.jeros.getValue(i, j) != undefined && this.jeros.getIsActive(i, j) != aux) {
                    this.jeros.setIsActive(i, j, aux);
                }
            }   
            var sinergia = true;
            for (let j = 0; j < this.jeros.getSize(i); ++j) {
               
                     if(this.jeros.getValue(i,j))  sinergia = false;
                   
              
            }
            if(sinergia) this.scene.activeSinergy(i);
        }
    }
    ApplySinergy(dios) { //El dios representa al número del array de jeroglificos
        let Sinergias = true; //Asumimos que tenemos todos los jeroglificos con su isActive a true.

        //console.log(this.jeros[dios]);

        for (let i = 0; i < this.jeros.getSize(dios); ++i) {
            if (this.jeros.getIsActive(dios, i) == false) {
                Sinergias = false; //Si hay un jeroglifico que no esta activado, la sinergia no se activa.
                break; //Salimos del bucle porque no hace falta seguir comprobandolo
            }
        }

        //if (!Sinergias) this.AlteredStates.applyAlteredStates(dios);

        // Instancia de AlteredStateClass para enviar las sinergias activadas a cada tropa en su Update
        //const alteredStateInstance = new AlteredStateClass();
        //alteredStateInstance.getAlteredState(this.Sinergias);
        if(Sinergias) this.scene.activeSinergy(dios);
        return Sinergias; //Devolvemos si es verdadero o falso
    }
    getJeros() {
        return this.jeros;
    }
};
class Jeroglifico {
    jeros = [];
    tamaño = [5, 4, 5, 3, 3, 4];
    /*  jeros[0] --> Ra (5) 2 3 4 5 6
      jeros[1] --> Isis (4) 1 11 12 15
      jeros[2] --> Anubis (5) 6 7 8 9 10
      jeros[3] --> Osiris (3) 0 1 2
      jeros[4] --> Horus (3) 3 13 14
      jeros[5] --> Seth (4) 15 16 17 18
    */
    constructor() {
        // Inicializar los arrays con objetos que tienen propiedades value e isActive
        this.jeros[0] = [{ value: 2, isActive: false }, { value: 3, isActive: false }, { value: 4, isActive: false },{ value:5, isActive:false },{ value:6, isActive:false }];
        this.jeros[1] = [{ value: 1, isActive: false }, { value: 11, isActive: false }, { value: 12, isActive: false }, { value: 15, isActive: false }];
        this.jeros[2] = [{ value: 6, isActive: false }, { value: 7, isActive: false }, { value: 8, isActive: false }, { value: 9, isActive: false }, { value: 10, isActive: false }];
        this.jeros[3] = [{ value: 0, isActive: false }, { value: 1, isActive: false }, { value: 2, isActive: false }];
        this.jeros[4] = [{ value: 3, isActive: false }, { value: 13, isActive: false }, { value: 14, isActive: false }];
        this.jeros[5] = [{ value: 15, isActive: false }, { value: 16, isActive: false }, { value: 17, isActive: false }, { value: 18, isActive: false }];
    }

    // Métodos para acceder y modificar las propiedades value e isActive
    getValue(i, j) {
        if (this.jeros[i] && this.jeros[i][j]) {
            return this.jeros[i][j].value;
        }
        return undefined;
    }

    setValue(i, j, value) {
        if (this.jeros[i] && this.jeros[i][j]) {
            this.jeros[i][j].value = value;
        }
    }

    getIsActive(i, j) {
        if (this.jeros[i] && this.jeros[i][j]) {
            return this.jeros[i][j].isActive;
        }
        return undefined;
    }

    setIsActive(i, j, _isActive) {
        this.jeros[i][j].isActive = _isActive;
    }

    getSize(i) {
        return this.tamaño[i];
    }
}