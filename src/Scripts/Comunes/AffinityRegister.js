export default class AffinityRegister{
    Ra;
    Isis;
    Anibis;
    Horus;
    Osiris;
    Seth;
    rnd2;

    constructor(){
        this.Ra = 1;
        this.Isis = 1;
        this.Horus = 1;
        this.Anubis = 1;
        this.Osiris = 1;
        this.Seth = 1;
        this.numtotalpnt = 6;
        this.rnd2 = 0;
    }

    //aumentos o disminuciones de los valores de afinidad
    AddRa(valor){
        this.Ra += valor;
        this.numtotalpnt += valor;
    }
    AddIsis(valor){
        this.Isis += valor;
        this.numtotalpnt += valor;
    }
    AddAnubis(valor){
        this.Anubis += valor;
        this.numtotalpnt += valor;
    }
    AddHorus(valor){
        this.Horus += valor;
        this.numtotalpnt += valor;
    }
    AddOsiris(valor){
        this.Osiris += valor;
        this.numtotalpnt += valor;
    }
    AddSeth(valor){
        this.Seth += valor;
        this.numtotalpnt += valor;
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
        if(rnd<this.Ra){
             this.rnd2 = Math.floor(Math.random() * 3);
             console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
        } 
        aux +=this.Ra;
        if(rnd>aux-1 && rnd<this.Isis+aux){
            this.rnd2 = Math.floor(Math.random() * 5);
            this.rnd2 += 2
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
            
        }
        aux += this.Isis;
        if(rnd>aux-1 && rnd<this.Horus+aux){
            this.rnd2 = Math.floor(Math.random() * 4);
            this.rnd2 += 13;
            if (this.rnd2 == 15) this.rnd2 = 3;
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;

        }  aux += this.Horus;
        if(rnd>aux-1 && rnd<this.Anubis+aux){
            this.rnd2 = Math.floor(Math.random() * 5);
            this.rnd2 += 6;
            console.log("elrandomaaa "+this.rnd2);
            return this.rnd2;
        }
        aux += this.Anubis
      
        if(rnd>aux-1 && rnd<this.Osiris+aux){
            this.rnd2 = Math.floor(Math.random() * 4);
                if(this.rnd2 == 13) this.rnd2 =1;
                if (this.rnd2 == 14) this.rnd2 =15;
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