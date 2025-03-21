export class Usuario{

    UsuarioId?: Number;
    Nombre: String;
    Contra: String;
    Autoridad: String;
    DeAlta: Boolean;
    

    constructor(Nombre: String, Contra: String, Autoridad: String ,DeAlta: Boolean, UsuarioID?: Number){
        this.Nombre = Nombre;
        this.Contra = Contra;
        this.Autoridad = Autoridad;
        this.DeAlta = DeAlta;
        this.UsuarioId = UsuarioID;
    }
}