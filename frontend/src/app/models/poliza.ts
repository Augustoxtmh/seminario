export class Poliza{

    NumeroPoliza: String;
    Telefono: String;
    Patente: String;
    Vigencia: Date;
    UsuarioId: Number = 0;

    constructor(NumeroPoliza: String, Telefono: String
                , Patente: String, Vigencia: Date, UsuarioId: Number){
        
        this.NumeroPoliza = NumeroPoliza;
        this.Telefono = Telefono;
        this.Patente = Patente;
        this.Vigencia = Vigencia;
        this.UsuarioId = UsuarioId;
    }
}