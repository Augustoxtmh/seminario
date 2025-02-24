export class Cuota{

    cuotaId?: Number;
    NumCuota: Number;
    FechaVencimiento: Date;
    Monto: Number;
    NumeroPoliza: String;


    constructor(NumCuota: Number,
        FechaVencimiento: Date, Monto: Number,
        NumeroPoliza: String){
        
        this.NumCuota = NumCuota;
        this.FechaVencimiento = FechaVencimiento;
        this.Monto = Monto;
        this.NumeroPoliza = NumeroPoliza;
    }
}