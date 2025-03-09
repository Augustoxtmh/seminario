export class PGrua{

    PedidoID?: Number = 0;
    NombreCliente: String;
    FechaHoraPedido: Date;
    Patente: String;
    GrueroID: Number;
    DeAlta: Boolean;
    UsuarioId: Number;
    urlFactura?: String;

    constructor(NombreCliente: String,
        FechaHoraPedido: Date, Patente: String,
        DeAlta: Boolean, GrueroID: Number,
        UsuarioId: Number, PedidoID?: Number,
        urlFactura?: String){
        this.FechaHoraPedido = FechaHoraPedido;
        this.Patente = Patente;
        this.NombreCliente = NombreCliente;
        this.DeAlta = DeAlta;
        this.GrueroID = GrueroID;
        this.UsuarioId = UsuarioId;
        this.urlFactura = urlFactura;
        this.PedidoID = PedidoID;
    }
}

