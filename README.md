# 📚 Guía del Proyecto Full-Stack: Módulo de Autenticación y Gestión (Programación III)

## 🏗️ 1. Arquitectura General de la Aplicación

El sistema está estructurado bajo una arquitectura cliente-servidor, donde el frontend y el backend interactúan mediante peticiones HTTP asincrónicas (API REST):

* **Frontend (Cliente):** Desarrollado con **React**, estructurado en base a componentes reactivos, manejo de estados locales (`useState`), efectos secundarios (`useEffect`) y un enrutado declarativo en el cliente mediante `react-router-dom`.
* **Backend (Servidor):** Desarrollado en **Node.js** con Express, encargado de exponer los endpoints de la API, procesar las reglas de negocio, interactuar con la Base de Datos a través de **Sequelize (ORM)** y manejar la seguridad mediante tokens informáticos.
* **Base de Datos:** Motor relacional **PostgreSQL** (alojado en la nube mediante Neon).

---

## 🔒 2. El Flujo de Autenticación con JWT (JSON Web Tokens)

Para proteger los datos confidenciales de la aplicación (como los perfiles o los listados internos), el sistema implementa **autenticación basada en tokens sin estado (stateless)**.

### ¿Cómo funciona el ciclo de vida del Token?
1.  **Petición de Acceso:** El alumno/usuario envía sus credenciales (Email y Password) desde el componente de Frontend (`Login.jsx`).
2.  **Validación y Firma:** El servidor valida que las credenciales coincidan con la base de datos (usando `bcryptjs` para comparar el hash). Si son correctas, genera un string encriptado llamado **JWT** firmado con una clave secreta (`JWT_SECRET`).
3.  **Almacenamiento Local:** El servidor responde enviando el token al cliente. El componente React recibe el string y lo almacena de forma persistente en el navegador usando el objeto global `localStorage`:
    ```javascript
    localStorage.setItem('token', datos.token);
    ```
4.  **Peticiones Autorizadas:** Cada vez que el componente (`Perfil.jsx`) necesite consultar datos protegidos al backend, el frontend inyecta automáticamente este token en la cabecera HTTP de la petición, bajo el estándar **Bearer Token**:
    ```javascript
    headers: { 'Authorization': `Bearer ${token}` }
    ```
5.  **Intercepción y Control:** Un **Middleware** en el servidor intercepta la petición, extrae el token, verifica que la firma sea válida y que no haya expirado. Si pasa la prueba, da luz verde al controlador para que devuelva los datos solicitados.

---

## 🗂️ 3. Estructura de Capas en el Frontend (React)

Para mantener el código ordenado y evitar el acoplamiento de responsabilidades en las interfaces, el proyecto divide el código en tres capas bien diferenciadas:

### 📝 Capa de Estilos (`src/styles/components/`)
Hojas de estilo CSS puras e independientes para cada sección (`login.css`, `register.css`, `perfil.css`, `listaUsuarios.css`, `navbar.css`). Su propósito es remover todos los estilos *inline* del JSX, facilitando el mantenimiento estético y mejorando la legibilidad del HTML simulado en React.

### 🌐 Capa de Servicios (`src/services/`)
Objetos JavaScript planos (`alumnoService.js`, `notaService.js`, `authService.js`) equipados con funciones asincrónicas que encapsulan los métodos de búsqueda de la API nativa `fetch`. Actúan como mediadores (o "híbridos entre controlador y modelo del lado del cliente") encargados de comunicarse con la URL base del Backend.

### 🧩 Capa de Componentes (`src/components/`)
Vistas y fragmentos modulares (`GestionAlumnos.jsx`, `GestionNotas.jsx`, `Login.jsx`, `Register.jsx`, `Perfil.jsx`, `ListaUsuarios.jsx`). Su único trabajo es capturar las interacciones del usuario, coordinar los estados reactivos internos mediante React Hooks (`useState`, `useEffect`) y pintar el árbol DOM usando las clases CSS asignadas.

---

## 🌐 4. Hoja de Ruta de Endpoints (API REST)

El servidor expone las siguientes rutas bajo el prefijo del enrutador configurado en `server.js`:

| Método HTTP | Endpoint | Tipo de Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/register` | 🔓 Público | Registra un nuevo usuario en la tabla `users` y retorna un token inmediato. |
| **POST** | `/api/login` | 🔓 Público | Valida credenciales y expide un JWT válido por 24 horas. |
| **GET** | `/api/perfil` | 🔒 Protegido (JWT) | Lee el token del encabezado y devuelve la ficha técnica del usuario logueado. |
| **GET** | `/api/users` | 🔓 Público / Gral | Lista en formato tabular el ID, Nombre y Mail de todas las cuentas creadas. |
| **GET / POST** | `/alumnos` | 🔓 General | Permite consultar, dar de alta o alterar registros de legajos. |
| **GET** | `/notas` | 🔓 General | Retorna el listado académico oficial de notas sincronizadas. |

---

## 🚀 5. Despliegue de la Aplicación en Producción (Deploy)

Cuando trabajamos en un entorno Full-Stack, debemos recordar que **el Backend y el Frontend se suben a internet de forma separada** ya que corren en entornos de ejecución totalmente diferentes.

### 🗄️ El Servidor (Backend)
El código de Node.js y la conexión al ORM se encuentran corriendo exitosamente en la plataforma **Render**. Su trabajo es mantenerse encendido esperando recibir las peticiones desde el exterior.

### 💻 La Interfaz (Frontend) - ¡Recomendación: Netlify!
Para subir nuestra aplicación visual construida en React, la recomendación oficial es utilizar **Netlify**. 

#### ¿Por qué usar Netlify para el Frontend?
1.  **Velocidad y Gratuidad:** Es una plataforma líder optimizada específicamente para aplicaciones de una sola página (SPA) como React, ofreciendo un nivel gratuito sumamente generoso.
2.  **Integración Continua con GitHub:** Solo basta con conectar el repositorio del proyecto. Cada vez que realicen un `git push` a su rama principal, Netlify compilará el código de forma automática (`npm run build`) y actualizará la página web en segundos.
3.  **Configuración de Variables de Entorno:** Permite camuflar la URL de la API de producción (`API_URL`) de forma segura a través de su panel de control, evitando exponer URLs internas en el código subido a repositorios públicos.

#### ⚠️ Tip Clave para React Router en Netlify (`_redirects`)
Dado que las aplicaciones de React manejan las rutas internamente en el navegador, si intentan refrescar la pantalla de forma manual estando parados en `/perfil` o `/login`, Netlify intentará buscar un archivo físico con ese nombre en el servidor y les arrojará un error `404 Not Found`.

Para solucionar esto de manera profesional, deben incluir un archivo llamado exactamente **`_redirects`** dentro de la carpeta `public` de su proyecto de React (junto al `index.html`), con la siguiente regla de redirección interna:

```text
/* /index.html   200

# 🧠 Entendiendo la Arquitectura Reactiva: Hooks, Handlers y Ciclo de Vida

Cuando venimos del desarrollo con JavaScript tradicional (Vanilla), estamos acostumbrados a un paradigma **imperativo**: vamos a buscar un elemento al HTML mediante el DOM (ej. `document.getElementById('input-mail')`) y le ordenamos físicamente qué hacer o qué valor tomar.

**React cambia las reglas del juego.** Funciona bajo un paradigma **declarativo**: nosotros no manipulamos la pantalla directamente; nosotros definimos y actualizamos los **Datos (Estados)**, y React se encarga de manera automática de redibujar la interfaz gráfica (UI) por nosotros.



---

## 1. ⚙️ useState: El Cerebro Dinámico del Componente

En JavaScript convencional, una variable cambia de valor en memoria, pero la pantalla no se entera. El Hook `useState` es la herramienta que le permite a un componente de React "recordar" información y, al mismo tiempo, forzar una actualización visual cada vez que esa información muta.

### Anatomía de un Estado:
* `const [usuario, setUsuario] = useState(null);`

* **usuario (La Variable de Estado):** Es el valor actual de nuestro dato en este preciso instante. En el primer renderizado, tomará el valor inicial. Es de solo lectura directa (no podemos hacer `usuario = "Juan"`).
* **setUsuario (La Función Modificadora):** Es la única vía autorizada por React para alterar ese estado. Cuando la ejecutamos (por ejemplo: `setUsuario(datos.user)`), le envía una señal al motor de React: *"Los datos cambiaron, por favor volvé a renderizar este componente"*.
* **useState(null):** El argumento que se pasa entre paréntesis determina el estado inicial. En este caso, como los datos del usuario se traerán de una API de forma asincrónica, arranca valiendo `null`.

---

## 2. 🌐 useEffect: El Puente con el Mundo Exterior

El Hook `useEffect` (Efecto Secundario) se utiliza para ejecutar código de manera controlada en momentos específicos del ciclo de vida de un componente (cuando aparece, cuando se actualiza o cuando desaparece). 

En nuestra aplicación, es indispensable para ir a buscar datos al servidor (`fetch`) apenas el usuario abre una pantalla.

### Anatomía de un Efecto:
```javascript
useEffect(() => {
  const pedirPerfil = async () => {
    try {
      const datos = await authService.getPerfil();
      setUsuario(datos.user);
    } catch (err) {
      setError(err.message);
    }
  };

  pedirPerfil();
}, []); // <--- ¡El componente crítico!
```

El comportamiento exacto de este bloque depende en su totalidad del **Array de Dependencias** (el segundo parámetro):

1. **Array Vacío `[]`:** Le indica a React que el código interno debe ejecutarse una sola vez, justo después de que el componente se dibuja por primera vez en la pantalla (Fase de Montaje). Es el lugar perfecto para solicitudes HTTP de carga inicial.
2. **Sin Array (Omitido):** Si nos olvidamos de poner los corchetes, el efecto se ejecutará en cada re-renderizado que sufra el componente. *¡Alerta de peligro!* Si adentro modificás un estado con una función `set`, generarás un bucle infinito que tumbará la aplicación.
3. **Con Variables `[token]`:** El código se ejecutará al inicio y volverá a dispararse automáticamente cada vez que el valor de la variable `token` sufra alguna modificación.

---

## 3. 🖱️ Los Handlers: Capturando la Intención del Usuario

Un **Handler** (manejador) es una función convencional que declaramos dentro del componente para interceptar y reaccionar a los eventos del navegador (`onClick`, `onSubmit`, `onChange`).

### A. El Handler del Formulario (`handleSubmit`)
```javascript
const handleSubmit = async (e) => {
  e.preventDefault(); // 1. Freno de mano al comportamiento nativo
  setError('');

  try {
    const datos = await authService.login(email, password);
    localStorage.setItem('token', datos.token); // Guardado seguro
    window.location.href = '/perfil';            // Despacho de navegación
  } catch (err) {
    setError(err.message);
  }
};
```
* **`e.preventDefault()`:** Crucial de explicar en clase. Por defecto, los formularios HTML intentan recargar la página completa al enviarse. En una SPA (Single Page Application) queremos evitar esto a toda costa. Esta línea frena la recarga física para que JavaScript maneje los datos en segundo plano.

### B. El Handler del Input (`onChange`)
```jsx
<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```
* Aquí capturamos el evento de escritura. `e.target.value` contiene la letra exacta que el alumno acaba de presionar en su teclado, pasándosela a `setEmail` para mantener el estado sincronizado en tiempo real.

---

## 🔄 4. El Reloj de React: El Ciclo de Vida en la Vida Real

¿Cómo cooperan los estados, efectos y handlers tras bambalinas? Sigamos el flujo cronológico de la pantalla de `Perfil.jsx`:



1. **Montaje (Primer Render):** El componente nace en la interfaz. El estado `usuario` se inicializa en `null`. React lee el JSX, ve que el usuario es nulo, y dibuja en pantalla el bloque condicional: `<div>Cargando datos del perfil oficial...</div>`.
2. **Disparo de Efectos:** Una vez pintado el cartel de carga, React revisa el `useEffect`. Como tiene un array de dependencias vacío `[]`, ejecuta la función asincrónica `pedirPerfil()` lanzando la petición HTTP a la API en Render.
3. **Actualización del Estado:** La API de producción responde con éxito devolviendo los datos de la base de datos. Dentro del bloque `try`, ejecutamos `setUsuario(datos.user)`.
4. **Re-renderizado (Segundo Render):** Al mutar el estado mediante `setUsuario`, React destruye la representación visual anterior y vuelve a evaluar el JSX. Esta vez `usuario` ya contiene datos, por lo que ignora el cartel de carga y ejerce un nuevo render mostrando la tarjeta de perfil con el ID, Nombre y Email en pantalla.

---

## ⚠️ 5. Guía de Supervivencia: Los "Pecados Capitales" del Principiante en React

Para quienes ven React por primera vez, es extremadamente común tropezar con las mismas piedras. Te dejamos esta lista de control para revisar tu código antes de entrar en pánico:

### ❌ Error 1: Hacer llamadas asincrónicas "sueltas" en el componente
```javascript
// 🛑 ¡MAL! Esto causará peticiones infinitas a la base de datos
const datos = await authService.getPerfil(); 
setUsuario(datos.user);
```
* **Por qué ocurre:** Recordá que React lee y ejecuta la función entera del componente de arriba a abajo cada vez que se re-renderiza. Si dejás un `fetch` suelto, el componente pide los datos, actualizará el estado, el estado causa un re-render, el re-render vuelve a ejecutar el `fetch`... y entramos en un bucle infinito que saturará el servidor. Todo `fetch` inicial DEBE vivir dentro de un `useEffect` con `[]`.

### ❌ Error 2: Modificar el estado de forma directa
```javascript
// 🛑 ¡MAL! React jamás se enterará del cambio
usuario = datos.user; 
```
* **Por qué ocurre:** React no vigila las variables normales. La única forma de que sepa que debe redibujar la pantalla es a través del disparador específico de la función modificadora: `setUsuario(datos.user)`.

### ❌ Error 3: Tratar de leer un estado inmediatamente después de modificarlo
```javascript
const handleLogin = () => {
  setEmail("alumno@universidad.edu.ar");
  console.log(email); // 🛑 ¡Va a imprimir el valor VIEJO o vacío!
};
```
* **Por qué ocurre:** Las funciones `set` en React son asincrónicas y se procesan en lotes por cuestiones de rendimiento. El estado no cambia en la línea siguiente; cambiará recién en el próximo ciclo de renderizado del componente.

### ❌ Error 4: Olvidar la propiedad key al recorrer listas con .map()
```jsx
// 🛑 ¡MAL! React perderá el rastro del DOM óptimo
{usuarios.map((user) => (
  <tr>{user.nombre}</tr>
))}
```
* **Por qué ocurre:** Al generar elementos repetitivos (como filas de una tabla), React necesita un identificador único global (un ID numérico o mail) para saber exactamente qué elemento se borró, editó o movió sin tener que redibujar la lista entera. Lo correcto es agregar la propiedad key en la etiqueta contenedora inicial: `<tr key={user.id}>`.
