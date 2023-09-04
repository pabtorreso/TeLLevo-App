export interface IUsuario {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    telefono: string;
    email: string;
    birthday: Date | undefined;
    jornada: string;
    username: string;
    password: string;
    id_tipo_usuario: number;
}
