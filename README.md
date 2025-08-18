Este es un proyecto de comercio electrónico creado por los alumnos Enriquez Matias y Schaffer Lisandra, que consiste en una API RESTful desarrollada con Node.js y Express.js. La aplicación permite gestionar productos, y un sistema de compras completo, con una base de datos MySQL.

---

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas para separar la lógica de negocio y las funcionalidades:

* routes: Define las rutas de la API.
* controllers: Contiene la lógica de negocio de cada ruta.
* models: Define los modelos para interactuar con la base de datos MySQL.
* config: Almacena la configuración de la conexión a la base de datos.
* middlewares: Incluye la lógica de autenticación con JWT y manejo de errores.

---

## Tecnologías Utilizadas hasta el momento

* **Node.js & Express.js:** Para el desarrollo del backend de la API.
* **MySQL:** Como base de datos para almacenar toda la información.
* **JWT:** Para la autenticación del administrador.
* **Bcrypt:** Para cifrar la contraseña del administrador y asegurar la seguridad.
* **Postman:** Herramienta para realizar pruebas a los endpoints.

---

## Entidades de la Base de Datos

El esquema de la base de datos está compuesto por las siguientes tablas:

* **`Usuarios (Administradores)`**: Guarda la información del único administrador.
* **`Productos`**: Contiene detalles como nombre, precio, descripción, stock, categoría.
* **`Reseñas`**: Almacena las valoraciones y comentarios de los productos.
* **`Carro de Compras`**: Para guardar los productos en el carrito de cada cliente.
* **`Compras`**: Registra cada transacción e incluye los datos del cliente.

---

## Endpoints de la API

La API RESTful incluye las siguientes rutas:

### Autenticación y Seguridad
* POST: Autentica al administrador.
* GET : Muestra el perfil del administrador.

### Productos
* GET: Lista todos los productos con opciones de paginación, búsqueda y filtrado.(Público)
* GET: Muestra los detalles de un producto y sus reseñas.(Público)
* POST productos: Crea un nuevo producto.(Solo para administrador)
* PUT: Actualiza la información de un producto.(Solo para administrador)
* DELETE: Elimina un producto. (Solo para administrador)

### Reseñas
* POST: Permite a los clientes crear una reseña. 
* GET : Muestra las reseñas de un producto.
* DELETE : Elimina una reseña.(Solo para administrador)

### Carro de Compras
* POST : Agrega un producto al carro de compras. 
* GET : Muestra los productos en el carro. 
* DELETE : Elimina un producto del carro.

### Compras
* POST: Crea una nueva compra a partir del carro. 
* La API verifica el stock y lo resta de los productos. Se envía un correo de confirmación al cliente.
* GET: Muestra el historial de todas las compras.(Solo para administrador)
* GET: Muestra el detalle de una compra específica.(Solo para administrador)

---
