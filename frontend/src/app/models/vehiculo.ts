export class Vehiculo{

    Patente: String;
    Marca: String;
    Color: String;
    TipoPlan: String;
    Modelo: String;
    UsuarioId: Number

    constructor(Patente: String, Marca: String, Color: String
        ,TipoPlan: String, Modelo: String, UsuarioId: Number){

        this.Patente = Patente;
        this.Marca = Marca;
        this.Color = Color;
        this.TipoPlan = TipoPlan;
        this.Modelo = Modelo;
        this.UsuarioId = UsuarioId;
    }
}