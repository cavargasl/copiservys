# Proyecto: Plataforma de Gestión de Productos

## Descripción
Este proyecto es una aplicación desarrollada con Next.js 15 siguiendo la **arquitectura hexagonal** y principios **SOLID**, que expone una API REST para obtener información de productos ya sea desde un archivo JSON, CSV, base de datos, etc. También incluye una interfaz web para visualizar estos datos de manera óptima.

## Tecnologías utilizadas
- **Next.js 15** (Framework principal)
- **TypeScript** (Tipado estático)
- **Tailwind CSS (shadcn/ui)** (Estilos y diseño responsive)
- **Redux Toolkit** (Manejo del estado)
- **Vercel** (Despliegue)

---

## Instalación y ejecución
### **1. Clonar el repositorio**
```bash
git clone https://github.com/cavargasl/copiservys.git
cd copiservys
```

### **2. Instalar dependencias**
```bash
pnpm install  # O usa npm install / yarn install según tu gestor de paquetes
```

### **3. Configurar variables de entorno**
Copia el archivo `.env.example` y renómbralo como `.env`, luego edita las variables según sea necesario.

### **4. Ejecutar el servidor en desarrollo**
```bash
pnpm dev  # O npm run dev / yarn dev
```
La aplicación estará disponible en `http://localhost:3000`

### **5. Construcción y despliegue**
Para generar una versión optimizada:
```bash
pnpm build
pnpm start
```

Proyecto en producción: [https://copiservys.app/](https://copiservys.app/)

---

## Arquitectura Hexagonal y Principios SOLID

### **Arquitectura Hexagonal**
El proyecto sigue la **arquitectura hexagonal (Ports and Adapters)**, separando la lógica de negocio de las implementaciones externas:
- **Core:** Contiene la lógica de dominio y reglas de negocio.
- **Infrastructure:** Implementaciones de almacenamiento y repositorios.
- **Application:** Casos de uso y servicios que orquestan la lógica de negocio.
- **Presentation:** Componentes de UI y la interfaz de usuario.

### **Principios SOLID Aplicados**
- ✔ **S (Single Responsibility Principle - SRP):** Cada módulo tiene una única responsabilidad, evitando lógica mezclada.
- ✔ **O (Open/Closed Principle - OCP):** El código es extensible sin necesidad de modificar estructuras existentes.
- ✔ **L (Liskov Substitution Principle - LSP):** Se usan interfaces y abstracciones para garantizar la compatibilidad entre módulos.
- ✔ **I (Interface Segregation Principle - ISP):** Las interfaces están bien definidas para evitar dependencias innecesarias.
- ✔ **D (Dependency Inversion Principle - DIP):** Se inyectan dependencias en lugar de instanciar clases directamente, facilitando pruebas y cambios.

---

## Decisiones Técnicas y Optimizaciones
### **Elección de herramientas**
- **Next.js 15:** Se eligió por su capacidad de generación de páginas estáticas y dinámicas, lo que mejora la velocidad y experiencia de usuario.
- **TypeScript:** Permite un código más seguro y mantenible con tipado estático.
- **Tailwind CSS:** Facilita la creación de interfaces rápidas y responsivas.
- **Redux Toolkit:** Manejo eficiente del estado global de la aplicación.

### **Optimización de rendimiento**
- Uso de **lazy loading** para carga diferida de imágenes y datos.
- Uso de debounce para evitar peticiones innecesarias.
- Uso de **createAsyncThunk** para manejar las peticiones a la API de manera eficiente.

---

## Dificultades y Soluciones
### **1. Manejo de archivos JSON en Next.js**
- 🔹 **Problema:** `fs-extra` no se puede usar en el cliente.
- ✅ **Solución:** Se aseguró que el repositorio (lógica para obtener los datos) solo se ejecute en el servidor mediante la exposición en la api propia de next y usar su URL donde se requiera.

### **2. Problema con el componente de Filter**
- 🔹 **Problema:**  Inicialmente, el filtro solo se ocultaba con Tailwind, pero permanecía instanciado, lo que causaba conflictos entre la versión móvil y desktop al aplicar los filtros en la URL.
- ✅ **Solución:** Se implementó `react-responsive` para renderizar condicionalmente el filtro según la versión, evitando la coexistencia de dos instancias y asegurando un comportamiento consistente.

---

🚀 **Desarrollado por [Camilo Vargas](https://github.com/cavargasl)**

