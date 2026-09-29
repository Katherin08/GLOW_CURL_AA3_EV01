Glow Curl App

GA7-220501096-AA3-EV01

Codificación de módulos del software

Glow Curl App es una aplicación web orientada a la gestión de información relacionada con clientes que tienen cabello ondulado, rizado y afro.

Para esta evidencia se desarrolló el módulo de **gestión de clientes**, utilizando tecnologías web y una base de datos MySQL. El módulo permite registrar, consultar, actualizar y eliminar información de los clientes.

Módulo desarrollado

El módulo de gestión de clientes permite:

* Registrar nuevos clientes.
* Consultar los clientes registrados.
* Actualizar la información de un cliente.
* Eliminar clientes.
* Almacenar la información en una base de datos MySQL.
* Validar los campos obligatorios del formulario.
* Mostrar mensajes de confirmación o error.

Tecnologías utilizadas

* HTML5 para la estructura de las páginas.
* CSS3 para el diseño y estilos.
* JavaScript para la interacción y comunicación con el servidor.
* Node.js para ejecutar el servidor.
* Express para crear las rutas de la aplicación.
* MySQL para almacenar la información.
* MySQL2 para realizar la conexión entre Node.js y MySQL.
* CORS para permitir la comunicación entre frontend y backend.
* dotenv para manejar las variables de configuración.
* Git y GitHub para el control de versiones.

Estructura del proyecto

GLOWCURL_AA3_EV01/
│
├── backend/
│   ├── server.js
│   └── db.js
│
├── database/
│   └── glowcurl.sql
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── clientes.js
│   └── menu.js
│
├── pages/
│   ├── auth/
│   │   ├── registroCliente.html
│   │   └── loginCliente.html
│   │
│   └── cliente/
│       ├── inicioCliente.html
│       ├── perfilCliente.html
│       ├── citasCliente.html
│       └── productosCliente.html
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── ENLACE_REPOSITORIO.txt

Base de datos

El proyecto utiliza la base de datos **glow_curl_app** en MySQL.

Las principales tablas utilizadas para este módulo son:

* usuarios: almacena los datos básicos del usuario.
* clientes: almacena la información específica del cliente y su relación con el usuario.

La relación entre las tablas permite asociar la información general del usuario con los datos propios del cliente.

Funcionamiento

El usuario diligencia el formulario de registro desde la interfaz web.

Los datos son enviados mediante JavaScript al servidor Node.js utilizando una solicitud HTTP.

El servidor recibe la información y realiza las validaciones correspondientes. Posteriormente, utiliza MySQL2 para guardar la información en la base de datos MySQL.

El flujo principal del módulo es:

```text
Formulario HTML
       ↓
JavaScript
       ↓
Servidor Node.js + Express
       ↓
MySQL
       ↓
Respuesta al usuario


Instalación

Para ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* MySQL
* Visual Studio Code

Después de descargar el proyecto, abrir una terminal dentro de la carpeta y ejecutar:

bash
npm install


Luego se debe configurar el archivo .env con los datos de conexión de MySQL:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=glow_curl_app
DB_PORT=3306


No se debe publicar la contraseña real de MySQL en GitHub.

Ejecución

Primero se debe iniciar el servidor MySQL.

Después, desde la carpeta del proyecto, ejecutar:

bash
node backend/server.js


Si la conexión funciona correctamente, el servidor mostrará:


GLOW CURL APP
Módulo de gestión de clientes
Servidor ejecutándose en http://localhost:3000
`

Para comprobar la conexión con la base de datos se puede abrir:


http://localhost:3000/api/prueba-db


La respuesta esperada indica que la conexión con MySQL está funcionando.

Control de versiones

El proyecto utiliza Git para llevar el control de las modificaciones realizadas durante el desarrollo.

El repositorio de GitHub contiene los archivos correspondientes al módulo desarrollado y permite consultar la evolución del proyecto.

Evidencia

Esta implementación corresponde a la evidencia:

GA7-220501096-AA3-EV01 - Codificación de módulos del software stand-alone, web y móvil.

Proyecto: Glow Curl App

Módulo: Gestión de clientes

Tecnologías principales: **HTML, CSS, JavaScript, Node.js, Express y MySQL.**
