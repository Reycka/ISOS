export default class AffinityRegister{
    Ra;
    Isis;
    Anubis;
    Horus;
    Osiris;
    Seth;
    rnd2;
    maxAffinity;

    constructor(){
        this.Ra = 10;
        this.Isis = 10;
        this.Horus = 10;
        this.Anubis = 10;
        this.Osiris = 10;
        this.Seth = 0;
        this.numtotalpnt = 50;
        this.maxAffinity = 35;
        this.rnd2 = 0;
    }

    AddRep(val, god, minus){

        if (god == "Ra"){
            this.AddRa(val);
        }
        else if(god == "Isis"){
            this.AddIsis(val);
        }
        else if(god == "Anubis"){
            this.AddAnubis(val);
        }
        else if(god == "Horus"){
            this.AddHorus(val);
        }
        else if(god == "Osiris"){
            this.AddOsiris(val);
        }
        else if(god == "Seth"){
            
            this.AddSeth(val);
            this.AddRa(minus);
            this.AddIsis(minus);
            this.AddAnubis(minus);
            this.AddHorus(minus);
            this.AddOsiris(minus);

        }
        

        console.log(this.Ra,"", this.Isis,"", this.Anubis,"", this.Horus,"", this.Osiris,"", this.Seth, "total:", this.numtotalpnt)


    }

    //aumentos o disminuciones de los valores de afinidad
    AddRa(valor) {
        const dif = this.Ra += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Ra = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Ra = 35;
        }
        
    }
    
    AddIsis(valor) {
        var dif = this.Isis += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Isis = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Isis = 35;
        }
    }
    
    AddAnubis(valor) {
        var dif = this.Anubis += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Anubis = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Anubis = 35;
        }
    }
    
    AddHorus(valor) {
        var dif = this.Horus += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Horus = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Horus = 35;
        }
    }
    
    AddOsiris(valor) {
        var dif = this.Osiris += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Osiris = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Osiris = 35;
        }
    }
    
    AddSeth(valor) {
        var dif = this.Seth += valor;
        this.numtotalpnt += valor;
    
        if (dif < 0) {
            this.Seth = 0;
            this.numtotalpnt += Math.abs(dif);
        } 

        if (dif > this.maxAffinity){
            this.Seth = 35;
        }
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
    GetRandomLetter(){
        
        var aux = 0;
        //primer random el dios
        var rnd = Math.floor(Math.random() * this.numtotalpnt);
        console.log("elrandom"+rnd);
         
        
        if(rnd>aux-1 && rnd<this.Ra+aux){
            this.rnd2 = Math.floor(Math.random() * 5);
            this.rnd2 += 2
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
            
        }
        aux +=this.Ra;
        
        if(rnd>aux-1 && rnd<this.Isis+aux){
            this.rnd2 = Math.floor(Math.random() * 4);
            this.rnd2 += 12;
            if(this.rnd2 == 13) this.rnd2 =1;
                if (this.rnd2 == 14) this.rnd2 =11;
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;

        } aux += this.Isis; 
        if(rnd>aux-1 && rnd<this.Horus+aux){
            this.rnd2 = Math.floor(Math.random() * 3);
            this.rnd2 += 13;
            if(this.rnd2 == 15) this.rnd2 = 3;
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
        }aux += this.Horus;
        
        if(rnd>aux-1 && rnd<this.Anubis+aux){
            this.rnd2 = Math.floor(Math.random() * 5);
             console.log("elrandomaaa "+this.rnd2);
             this.rnd2+=6;
            return this.rnd2;
            

        }aux += this.Anubis
         
        if(rnd>aux-1 && rnd<this.Osiris+aux){
            this.rnd2 = Math.floor(Math.random() * 4);
             console.log("elrandomaaa "+this.rnd2);
            
            return this.rnd2;
            
    

        }  aux += this.Osiris
        if(rnd>aux-1 && rnd<this.Seth+aux){
            this.rnd2 = Math.floor(Math.random() * 4);
            this.rnd2 += 15;
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
        }  aux += this.Seth
        
    }
}