export interface IUsuario {
    nombre: string;
    apPaterno: string;
    apMaterno: string;
    telefono: string;
    email: string;
    birthday: Date | undefined;
    nivelDeEstudios: string;
    jornada: string;
    username: string;
    password: string;
    tipoUsuario: string;
}
