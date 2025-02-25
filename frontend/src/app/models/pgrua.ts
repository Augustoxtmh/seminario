export class PGrua{

    PedidoID?: Number;
    NombreCliente: String;
    FechaHoraPedido: Date;
    Patente: String;
    GrueroID: Number;
    DeAlta: Boolean;
    UsuarioId: Number;

    constructor(NombreCliente: String,
        FechaHoraPedido: Date, Patente: String,
        DeAlta: Boolean, GrueroID: Number,
        UsuarioId: Number){
        
        this.FechaHoraPedido = FechaHoraPedido;
        this.Patente = Patente;
        this.NombreCliente = NombreCliente;
        this.DeAlta = DeAlta;
        this.GrueroID = GrueroID;
        this.UsuarioId = UsuarioId;
    }
}