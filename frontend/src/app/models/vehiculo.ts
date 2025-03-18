export class Vehiculo{

    Nombre: String;
    Patente: String;
    Marca: String;
    Color: String;
    TipoPlan: String;
    Modelo: String;
    UsuarioId: Number

    constructor(Nombre: String, Patente: String, Marca: String, Color: String
        ,TipoPlan: String, Modelo: String, UsuarioId: Number){

        this.Nombre = Nombre;
        this.Patente = Patente;
        this.Marca = Marca;
        this.Color = Color;
        this.TipoPlan = TipoPlan;
        this.Modelo = Modelo;
        this.UsuarioId = UsuarioId;
    }
}