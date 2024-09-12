// Aquí se realizará un CRUD, así como se hizo con el CRUD de NODEJS, REACT, solo que esta vez será con distinta metodología y usando MYSQL en vez de MONGODB

// Una vez creada la carpeta server, .gitignore, .nvmrc y el README.md, nos dirigimos a la consola y escribimos "npm create vite", colocamos un nombre, para este caso elegimos "client", seleccionamos React, elegimos JavaScript.

// Una vez creado entramos "cd client", ya dentro escribimos "npm install", después escribimos "npm run dev" dentro de client así como se indica en las instrucciones de la consola.

// Ahora en la consola dentro de server escribiremos npm init para iniciar un nuevo proyecto

// Ahora se instalarán paquetes del lado del server: npm i mysql express

// Ahora procederemos a limpiar un poco ya que se tiene código de ejemplo, para esta entramos a client y en App.jsx quitamos todo y agregamos un código básico, podemos eliminar el App.css ya que ya no se está utilizando más, de igual manera eliminamos todo el código de index.css y el main.jsx lo dejamos igual.

// Ahora nos dirigiremos al lado del server, y dentro del package.json, escribimos dentro de "scripts" lo que ya conocemos para inicializar de forma rápida a nuestro servidor "dev": "nodemon index.js"

// Instalamos del lado del servidor "npm i nodemon -D", la -D indica que se instalará dentro de las dependencias, pero que no será necesario tenerse para el deploy

// Ahora podemos estar trabajando primero con App.jsx y con App.css, para así crear nuestro pequeño formulario

// Ahora dentro de nuestro componente App.jsx podemos asignar ciertas funciones, por ejemolo asignar el hook de useState, o agregar un onClick al button.

// También podemos dirigirnos a la sección de server y dentro del index.js nos encargaremos de importar express, para así poder utilizarlo y definir los puertos en los que se ejecutará así como ya sabemos hacerlo, una vez realizado esto, ya podemos ejecutar a ambos, tanto al client como al server con npm run dev

// No olivemos agregar al "type": "module" dentro de nuestro package.json para así poder declararlo como un convencional import al express y no tener que usar el require

// Ahora comencemos con la creación de la DB en MYSQL, para este caso podemos iniciarlo desde el MYSQL workbench, o la consola normal, buscando la ruta de MYSQL que suele ser C:\Archivos de programa\MySQL\MySQL Server 4.1\bin para dentro de esta solo acabar escribiendo mysql o para finalizar puede ser entrando a la misma command line de mysql; dicho estos 3 procesos, para este caos luego llegamos a tener un error, que esto igual nos pasó con otro proyecto MYSQL, la manera de solucionarlo es entrar a los servicios de Windows, esciribendo tal cual "servicios" y activando de manera manual el que diga MySQL80 y listo, escribimos nuestra contraseña (si es que tenemos alguna) y para este caso trabajaremos desde la consola, por lo que ya basta cone scribir SHOW DATABASES; para así mostrar las DB disponibles.

// Ahora dentro de nuestra carpeta server, creamos un archivo llamado squema.sql, dentro del mismo como buena práctica escribiremos todas nuestras consultas antes de escribirlas en consola (crear nuestra DB básicamente).

// Una vez finalizado y escribiendo las consultas en la consola, es hora de pasar a lo que sería el Back, para manejar este de la mejor manera, lo que haremos es:
// npm i mysql2
// npm i cors
// npm i dotenv   El --save solo era necesario para versiones antiguas para indicar que se guarde en el package.json, pero esto ya no es necesario, aparte el dotenv es para crear variables de entorno, y que así los valores se puedan guardar en un archivo .env y solo usar las variables, dando así una mejor capa de seguridad


// Una vez ya avanzado un poco la database.js y el index.js es momento de instalar axios, para este caso del lado del FRONTEND, dentro de la carpeta escribimos npm i axios y una vez instalado, nos idirigmos a nuestro client/src/App.jsx y en la parte superior modificaremos la función que se había creado de mostrarDatos, cambiándole el nombre a add y dentro llamaremos a axios.
// Necesitamos usar peticiones para el backend utilizando Fetch, para este ejemplo como una manera más simple se usará Axios, aparte de que la mayor ventaja que tiene Fetch es que es ligero y más flexible, sin embargo en la mayoría de los casos se usará y es preferible usar Axios.
// Una vez finalizada nuestra función de add, solo cambiamos el mostrarDatos por add que se encontraba en nuestro React para el onClick del botón y listo, podremos ejecutar nuestro servidor y nuestro cliente

// Una vez ya mas avanzado el proy, ya con conexiones funcionando de la DB al front con utilización hasta el momento de 2 API (POST Y GET), instalaremos bootstrap para mejorar la apariencia: npm install react-bootstrap bootstrap

// Una vez finalizado esto, comenzaremos con el muestreado de nuestra lista de empleados, para esto seleccionaremos algún elemento table de bootstrap para facilitar todo