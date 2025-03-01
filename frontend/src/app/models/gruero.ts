export class Gruero{

    GrueroID?: Number;
    NombreGruero: String;
    TelefonoGruero: String;
    DeAlta: Boolean;


    constructor(nombre: String, telefono: String, DeAlta: Boolean, GrueroID?: Number, ){
        this.GrueroID = GrueroID; 
        this.NombreGruero = nombre;
        this.TelefonoGruero = telefono;
        this.DeAlta = DeAlta;
    }
}