export default class AffinityRegister{
    Ra;
    Isis;
    Anibis;
    Horus;
    Osiris;
    Seth;

    constructor(){
        this.Ra = 0;
        this.Isis = 0;
        this.Horus = 0;
        this.Anubis = 0;
        this.Osiris = 0;
        this.Seth = 0;
    }

    //aumentos o disminuciones de los valores de afinidad
    AddRa(valor){
        this.Ra += valor;
    }
    AddIsis(valor){
        this.Isis += valor;
    }
    AddAnubis(valor){
        this.Anubis += valor;
    }
    AddHorus(valor){
        this.Horus += valor;
    }
    AddOsiris(valor){
        this.Osiris += valor;
    }
    AddSeth(valor){
        this.Seth += valor;
    }
    
    //observadores de los valores de afinidad

    GetRa(){
        return this.Ra;
    }
    GetIsis(){
        return this.Isis;
    }
    GetAnubis(){
        return this.Anubis;
    }
    GetHorus(){
        return this.Horus;
    }
    GetOsiris(){
        return this.Osiris;
    }
    GetSeth(){
        return this.Seth;
    }
}