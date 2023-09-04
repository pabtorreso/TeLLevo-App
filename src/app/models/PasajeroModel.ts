import { UserModel } from './UserModel';

export class PasajeroModel extends UserModel {
  constructor(
    nombre: string,
    apPaterno: string,
    apMaterno: string,
    telefono: string,
    email: string,
    birthday: Date | undefined,
    jornadaDeEstudios: string,
    username: string,
    password: string,
    id_tipo_usuario: number,
    public id_tipo_pasajero: number,

  ) {
    super(
        nombre,
        apPaterno,
        apMaterno,
        telefono,
        email,
        birthday,
        jornadaDeEstudios,
        username,
        password,
        id_tipo_usuario
        )
  }
}