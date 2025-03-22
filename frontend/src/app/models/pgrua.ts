export class PGrua{

    PedidoID?: Number;
    NombreCliente: String;
    FechaHoraPedido: Date;
    Patente: String;
    GrueroID: Number;
    DeAlta: Boolean;
    UsuarioId: Number;
    Monto?: Number;
    urlFactura?: String;

    constructor(NombreCliente: String,
        FechaHoraPedido: Date, Patente: String,
        DeAlta: Boolean, GrueroID: Number,
        UsuarioId: Number, Monto?: Number, PedidoID?: Number,
        urlFactura?: String){
        this.FechaHoraPedido = FechaHoraPedido;
        this.Patente = Patente;
        this.NombreCliente = NombreCliente;
        this.DeAlta = DeAlta;
        this.GrueroID = GrueroID;
        this.UsuarioId = UsuarioId;
        this.Monto = Monto;
        this.urlFactura = urlFactura;
        this.PedidoID = PedidoID;
    }
}

