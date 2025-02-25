export class Gruero{

    GrueroId?: Number;
    NombreGruero: String;
    TelefonoGruero: String;


    constructor(nombre: String, telefono: String){
        this.NombreGruero = nombre;
        this.TelefonoGruero = telefono;
    }
}