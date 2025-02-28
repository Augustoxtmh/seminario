export class Gruero{

    GrueroID?: Number;
    NombreGruero: String;
    TelefonoGruero: String;
    DeAlta: Boolean;


    constructor(GrueroID: Number, nombre: String, telefono: String, DeAlta: Boolean){
        this.NombreGruero = nombre;
        this.TelefonoGruero = telefono;
        this.DeAlta = DeAlta;
    }
}