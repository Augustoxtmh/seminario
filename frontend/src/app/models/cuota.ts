export class Cuota{

    cuotaId?: Number;
    NumCuota: Number;
    FechaVencimiento: Date;
    Monto: Number;
    NumeroPoliza: String;
    UsuarioId: Number;

    constructor(NumCuota: Number,
        FechaVencimiento: Date, Monto: Number,
        NumeroPoliza: String, UsuarioId: Number){
        
        this.NumCuota = NumCuota;
        this.FechaVencimiento = FechaVencimiento;
        this.Monto = Monto;
        this.NumeroPoliza = NumeroPoliza;
        this.UsuarioId = UsuarioId;
    }
}