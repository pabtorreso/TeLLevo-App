export class UserModel {
  constructor(
    public nombre: string,
    public apPaterno: string,
    public apMaterno: string,
    public telefono: string,
    public email: string,
    public birthday: Date | undefined,
    public nivelDeEstudios: string,
    public jornadaDeEstudios: string,
    public username: string,
    public password: string,
    public tipoUsuario: string
  ) {}

  //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
  static crearUsuario(event: {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    telefono: string;
    email: string;
    birthday: Date | undefined;
    nivelDeEstudios: string;
    jornadaDeEstudios: string;
    username: string;
    password: string;
    tipoUsuario: string;
  }) {
    return {
        nombre: event.nombre,
        apPaterno: event.apPaterno,
        apMaterno: event.apMaterno,
        telefono: event.telefono,
        email: event.email,
        birthday: event.birthday,
        nivelDeEstudios: event.nivelDeEstudios,
        jornadaDeEstudios: event.jornadaDeEstudios,
        username: event.username,
        password: event.password,
        tipoUsuario: event.tipoUsuario
    };
  }
}
