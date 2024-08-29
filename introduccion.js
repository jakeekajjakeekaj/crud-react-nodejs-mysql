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