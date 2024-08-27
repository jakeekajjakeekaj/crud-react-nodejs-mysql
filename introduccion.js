// Aquí se realizará un CRUD, así como se hizo con el CRUD de NODEJS, REACT, solo que esta vez será con distinta metodología y usando MYSQL en vez de MONGODB

// Una vez creada la carpeta server, client, el .gitignore, .nvmrc y el README.md, nos dirigimos a la consola y dentro de la carpeta client escribimos 'npx create-react-app .' (el . indica que se instalará en la carpeta atual)

// Ahora en la consola dentro de server escribiremos npm init para iniciar un nuevo proyecto

// Ahora se instalarán paquetes del lado del server: npm i mysql express

// Ahora eliminaremos los archivos que se instalaron de forma predeterminada pero que no utilizaremos, estos serían src/App.test.js logo.svg setupTests.js index.css
// Ahora entramos al index.js y quitamos las referencias a los archivos eliminados (que solo vendría siendo al inicio el de .css)
// Ahora dentro del App.js, eliminamos todo el contenido dentro del div que está dentro del return y a su vez eliminamos la referencia al logo previamente eliminado
// Ahora dentro del App.css podemos eliminar todo, y tal vez solo dejar el .App con el text-align: center

// Ahora nos dirigiremos al lado del server, y dentro del package.json, escribimos dentro de "scripts" lo que ya conocemos para inicializar de forma rápida a nuestro servidor