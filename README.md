# 📚 MyLibrary API

## Descripción

MyLibrary API es una API REST desarrollada con Node.js, Express y MongoDB que permite a los usuarios administrar una biblioteca personal de libros.

Cada usuario puede:

- Registrarse.
- Iniciar sesión.
- Agregar libros.
- Consultar sus libros.
- Editarlos.
- Eliminarlos.

La autenticación se realiza mediante JWT y las contraseñas se almacenan encriptadas con bcrypt.

---

# Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- express-rate-limit
- CORS

---

# Instalación

1. Clonar el repositorio.

```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias.

```bash
npm install
```

3. Crear un archivo `.env`.

```env
PORT=3000
URI_DB=mongodb://127.0.0.1:27017/db_server_tp
SECRET_KEY=your_secret_key
```

4. Iniciar MongoDB.

5. Ejecutar la aplicación.

```bash
npm start
```

El servidor quedará disponible en:

```
http://localhost:3000
```

---

# Autenticación

Las rutas de libros requieren enviar el token JWT.

Header:

```http
Authorization: Bearer <token>
```

---

# Ejemplos de Requests

## Registrar usuario

**POST**

```
/mylibrary/auth/register
```

Body:

```json
{
  "username": "Rocio",
  "email": "rocio@gmail.com",
  "password": "Password1!"
}
```

---

## Login

**POST**

```
/mylibrary/auth/login
```

Body:

```json
{
  "email": "rocio@gmail.com",
  "password": "Password1!"
}
```

---

## Crear libro

**POST**

```
/mylibrary/books
```

Header:

```http
Authorization: Bearer <token>
```

Body:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "status": "reading"
}
```

---

## Obtener todos los libros

**GET**

```
/mylibrary/books
```

Header:

```http
Authorization: Bearer <token>
```

---

## Obtener un libro

**GET**

```
/mylibrary/books/:id
```

---

## Editar un libro

**PATCH**

```
/mylibrary/books/:id
```

Body:

```json
{
  "status": "read"
}
```

---

## Eliminar un libro

**DELETE**

```
/mylibrary/books/:id
```