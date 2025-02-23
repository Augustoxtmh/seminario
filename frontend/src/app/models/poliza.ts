export class Poliza{

    NumeroPoliza: String;
    Telefono: String;
    Patente: String;
    Vigencia: Date;

    constructor(NumeroPoliza: String, Telefono: String
                , Patente: String, Vigencia: Date){
        
        this.NumeroPoliza = NumeroPoliza;
        this.Telefono = Telefono;
        this.Patente = Patente;
        this.Vigencia = Vigencia;
    }
}