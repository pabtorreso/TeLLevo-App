export class UserModel {
  constructor(
    public nombre: string,
    public apPaterno: string,
    public apMaterno: string,
    public telefono: string,
    public email: string,
    public birthday: Date | undefined,
    public jornadaDeEstudios: string,
    public username: string,
    public password: string,
    public id_tipo_usuario: number
  ) {}
}



