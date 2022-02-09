export const environment = {
  production: true,
  // UrlApi:'http://localhost:48394/api',
  UrlApi:'https://sitedev.poclab.pe/encuesta',  
  TOKEN_AUTH_USERNAME: 'mitomediapp',
  TOKEN_AUTH_PASSWORD: 'mito89codex',
  TOKEN_NAME: 'access_token',

  ERROR: 0,
  EXITO: 1,
  ALERT: 2,

  
  listaTipo: [{nIdTipo: 1, cDescripcion: 'Casillas'},
              {nIdTipo: 2, cDescripcion: 'Escala lineal'},              
              {nIdTipo: 3, cDescripcion: 'Respuesta corta'},
              {nIdTipo: 4, cDescripcion: 'Sí/No'},
              {nIdTipo: 5, cDescripcion: 'Varias opciones'}]
};
