export interface IniciarSesion {
  id: number;
  name: string;
  username: string;
  email: string;
  api_token: string;
  role: string;
  remember_token?: boolean;
  idiomas: Array<any>;
  idioma_id: number;
}
