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
        console.log("its me");
        console.log(this.card);
        console.log(this._texture);
    }
    //Método encargado de summonear la tropa en la casilla
    Summon(posX, posY) {

        // console.log(" dhibsfvisb"+this.mat.mat[posX][posY].ocupada);
        if (this.card != null && this.mat.mat[posX][posY].ocupada == false) {
            this.mat.mat[posX][posY].SetUnit(this.card.SummonUnit((this._texture)));
            this.SetJeroglifico();
            //console.log(this.sinergys);
            console.log(this.mat.mat[posX][posY]);
            this.card = null;
            this._texture = null;
        }
    }
    GetVictory() {
        if (this.victory == true) {
            return true;
        }
        else return false;
    }
    Battle() {

        if (this.victory == false && this.defeat == false) {
            //comprobamos las unidades que pueden atacar de la matriz aliada
            //boooleanos para comprobar si quedan tropas
            this.auxv = true;
            this.auxd = true;
            for (var i = 0; i < this.mat.row; i++) {
                for (var j = 0; j < this.mat.col; j++) {
                    this.target = false;
                    if (this.mat.mat[i][j].GetState()) {
                        if (this.mat.mat[i][j].GetUnit().isready) {

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
                                if (this.target == false) {
                                    this.encontrado = false;
                                    this.indiceaux = 0;
                                    console.log("mi posicion" + i + "," + j)
                                    while (this.indiceaux < this.mat.row && (this.encontrado == false)) {
                                        console.log("entro" + this.encontrado)
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
                            else {

                                //unidades que no curan
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
                                    // console.log("esta la unidad viva"+this.mat.mat[i][j].GetUnit().isalife)
                                    if (this.mat.mat[i][j].GetUnit().isalife == false) {
                                        this.mat.mat[i][j].SetFree();
                                        // console.log("casilla liberada"+i+j);
                                    } else this.mat.mat[i][j].Getdamage();
                                    this.target = true;
                                }
                                else if ((j - 1) != -1) {
                                    if (this.mat.mat[i][j - 1].GetState()) {
                                        this.enemymatriz.Enemymat.mat[i][j].GetUnit().Update(this.mat.mat[i][j - 1].GetUnit())
                                        //console.log("esta la unidad viva"+this.mat.mat[i][j-1].GetUnit().isalife)
                                        if (this.mat.mat[i][j - 1].GetUnit().isalife == false) {
                                            this.mat.mat[i][j - 1].SetFree();
                                            // console.log("casilla liberada"+i+j-1);
                                        } else this.mat.mat[i][j - 1].Getdamage();
                                        this.target = true;
                                    }
                                }
                                else {
                                    //movemos a la tropa
                                }


                            }



                        } this.enemymatriz.Enemymat.mat[i][j].GetUnit().Cooldown();
                        this.auxv = false;
                        if (this.victory == true) this.auxv = true;
                    }

                }
            }
            if (this.auxv == true && this.auxd == false) {
                console.log("has Ganado");
                this.victory = true;
                return false;
            }
            else if (this.auxv == false && this.auxd == true) {
                console.log("has perdido");
                this.defeat = true;
                return false;
            }
            else {

                return true;
            }

        }
    }
    SetJeroglifico() {
        for (let i = 0; i < 6; ++i) {
            for (let j = 0; j < this.jeros.getSize(i); ++j) {
                if (this.card.stads.letter == this.jeros.getValue(i, j) && this.jeros.getValue(i, j) != undefined && this.jeros.getIsActive(i, j) == false) {
                    console.log("ACTIVAMOS JEROGLIFICO");
                    this.jeros.setIsActive(i, j, true);
                }
            }
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

        return Sinergias; //Devolvemos si es verdadero o falso
    }
    getJeros() {
        return this.jeros;
    }
};
class Jeroglifico {
    jeros = [];
    tamaño = [3, 5, 5, 4, 3, 4];
    /*  jeros[0] --> Osiris (3)
      jeros[1] --> Ra (5)
      jeros[2] --> Anubis (5)
      jeros[3] --> Isis (4)
      jeros[4] --> Horus (3)
      jeros[5] --> Seth (4)
    */
    constructor() {
        // Inicializar los arrays con objetos que tienen propiedades value e isActive
        this.jeros[0] = [{ value: 0, isActive: false }, { value: 1, isActive: false }, { value: 2, isActive: false }];
        this.jeros[1] = [{ value: 3, isActive: false }, { value: 4, isActive: false }, { value: 5, isActive: false }, { value: 6, isActive: false }, { value: 2, isActive: false }];
        this.jeros[2] = [{ value: 7, isActive: false }, { value: 8, isActive: false }, { value: 6, isActive: false }, { value: 9, isActive: false }, { value: 10, isActive: false }];
        this.jeros[3] = [{ value: 1, isActive: false }, { value: 15, isActive: false }, { value: 11, isActive: false }, { value: 12, isActive: false }];
        this.jeros[4] = [{ value: 13, isActive: false }, { value: 14, isActive: false }, { value: 3, isActive: false }];
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
        //if (this.jeros[i] && this.jeros[i][j]) {
        console.log("ANTES" + this.jeros[i][j].isActive);
        this.jeros[i][j].isActive = _isActive;
        console.log("Después" + this.jeros[i][j].isActive);
        //}
    }

    getSize(i) {
        return this.tamaño[i];
    }
}