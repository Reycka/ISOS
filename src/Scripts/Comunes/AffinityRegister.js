export default class AffinityRegister{
    Ra;
    Isis;
    Anibis;
    Horus;
    Osiris;
    Seth;

    constructor(){
        this.Ra = 1;
        this.Isis = 1;
        this.Horus = 1;
        this.Anubis = 1;
        this.Osiris = 1;
        this.Seth = 1;
        this.numtotalpnt = 6;
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
        letra = "";
        aux;
        //primer random el dios
        var rnd = Math.floor(Math.random() * this.numtotalpnt);
        if(rnd<this.Ra){
            var rnd2 = Math.floor(Math.random() * 3);
            return rnd2;
        } 
        aux +=this.Ra;
        if(rnd>aux && n<this.Isis){
            var rnd2 = Math.floor(Math.random() * 5);
            return (2+rnd2)
            
        }
        aux += this.Isis;
        if(rnd>aux && n<this.Horus){
            var rnd2 = Math.floor(Math.random() * 4);
            rnd2 += 13;
            if (rnd2 == 15) rnd2 = 3;
            return rnd2;

        }  aux += this.Horus;
        if(rnd>aux && n<this.Anubis){
            var rnd2 = Math.floor(Math.random() * 5);
            return (6+rnd2)
        }
        aux += this.Anubis
      
        if(rnd>aux && n<this.Osiris){
            var rnd2 = Math.floor(Math.random() * 4);
                if(rnd2 == 13) rnd2 =1;
                if (rnd2 == 14) rnd2 =15;
                return rnd2;

        }  aux += this.Osiris
        if(rnd>aux && n<this.Seth){
            var rnd2 = Math.floor(Math.random() * 4);
            return (rnd2+15)
        }  aux += this.Seth
    }
}