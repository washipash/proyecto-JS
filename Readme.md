# Proyecto Final - Página Web con Validación de Usuarios

Este proyecto es parte de la evaluación final del módulo de JavaScript. Consiste en una página web interactiva que incluye funcionalidades de validación de inicio de sesión, registro de usuarios y gestión de diferentes tipos de usuarios: **Administradores** y **Usuarios comunes**.

como parte extra, este proyecto recolecta varias partes de mis anteriores proyectos del modulo de Java Scrip, css y tailwind, me di en la tarea de revisar cada uno de mis anteriores proyectos en este curso para hacer una pagina que contenga lo mejor de cada uno como

1. el boton de modo oscuro de mi proyecto de youtube
2. una api que hace referencia a la tarea de hacer una pagina con apis integradas
3. el diseño lo tome del proyecto de tailwind
4. la funcinoalidad de jugar contra la maquina de algunos proyectos de js
5. algunas referencias a mis proyectos del sistema solar con la funcionalidad de las estrellas
6. 

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Guía de Instalación](#guía-de-instalación)
5. [Uso](#uso)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Autor](#autor)

## Descripción del Proyecto

La pagina web permite a los usuarios registrarse, iniciar sesión y acceder a funcionalidades específicas según su rol. Los administradores tienen acceso a un panel de control con opciones avanzadas, mientras que los usuarios comunes pueden gestionar su perfil.

## Características

- **Inicio de sesión**: Validación de credenciales para acceder al sistema.
- **Registro de usuarios**: Formulario interactivo para el registro de nuevos usuarios.
- **Roles de usuario**: Gestión de administradores y usuarios comunes.
- **Interfaz gráfica**: Diseños personalizados para perfiles y vistas administrativas.
- **Responsivo**: Adaptado a diferentes tamaños de pantalla.
- **Modo claro/oscuro**: Posibilidad de cambiar entre temas de color.

## Estructura del Proyecto

/Proyecto-JS 
│
├── css/
│   ├── modo.css         # Estilos para el modo claro/oscuro
│   ├── perfil.css       # Estilos específicos para la página de perfil
│
├── img/
│   ├── yo.jpg           # Imagen del usuario
│   ├── admin.png        # Icono de administrador
│   ├── delete.png       # Icono para eliminar
│   ├── perfil.png       # Icono de perfil
│   ├── salir.png        # Icono para salir
│   ├── edit.png         # Icono para editar
│   ├── inicio.png       # Icono de inicio
│   ├── iconos/          # Subcarpeta con iconos adicionales
│       ├── ally.png
│       ├── horda.png
│       ├── cazador.png
│       ├── druida.png
│       ├── paladin.png
│       ├── healer.png
│       ├── mago.png
│
├── js/
│   ├── index.js         # Lógica principal de la página
│   ├── api.js           # Conexión con APIs externas 
│   ├── estrellas.js     # Animación de estrellas (decorativo)
│   ├── login.js         # Lógica para el inicio de sesión
│   ├── registro.js      # Lógica para el registro de usuarios
│
├── login.html           # Página de inicio de sesión
├── perfil.html          # Página de perfil de usuario
├── admin.html           # Panel de administrador
├── registrar.html       # Página de registro de usuarios
├── home.html            # Página principal
└── readme.md            # Archivo README (documentación del proyecto)


## Guía de Instalación

1. Clona el repositorio o descarga el proyecto como archivo ZIP.
2. Abre el archivo `login.html` en un navegador web.
3. Asegúrate de que todos los archivos CSS y JS están vinculados correctamente.

## Uso

1. Inicia sesion en `login.html` o registrarte como nuevo usuario.
2. Luego de iniciar sesion sera redirigido a la pagina de inicio o `Home.html`

## Tecnologías Utilizadas

- **HTML5**: Estructura de las páginas web.
- **CSS3**: Diseño y estilos personalizados.
- **JavaScript**: Lógica y funcionalidades interactivas.
- **Archivos estáticos**: Imágenes e íconos.

## Autor

Creado por Osmel Alvarez. Este proyecto fue desarrollado como parte del módulo de **JavaScript**.


