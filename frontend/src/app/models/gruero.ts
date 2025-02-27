export class Gruero{

    GrueroID?: Number;
    NombreGruero: String;
    TelefonoGruero: String;


    constructor(GrueroID: Number, nombre: String, telefono: String){
        this.GrueroID = GrueroID;
        this.NombreGruero = nombre;
        this.TelefonoGruero = telefono;
    }
}