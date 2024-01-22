# Shop Project API

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Shop Project API</title>
  <!-- Styles -->
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <header>
    <h1>Welcome to Shop Project API</h1>
  </header>

  <section>
    <p>Project Overview:</p>
    <p>This API was developed in 2021/2022 as part of my immersion into modern web development technologies. During this
      period, I delved into the following key technologies:</p>
    <ul>
      <li>Node.js and Express.js for building a robust and scalable backend.</li>
      <li>Sequelize as an Object-Relational Mapping (ORM) tool for efficient database management.</li>
      <li>Swagger for documenting and visualizing the API endpoints.</li>
      <!-- Add more technologies as needed -->
    </ul>
    <p>The project aimed to showcase my proficiency in these technologies and provide a solid foundation for creating
      APIs with Node.js and Express.js. As I continued to evolve in my development journey, I integrated additional
      features and optimizations to enhance the API's functionality and user experience.</p>
  </section>

  <section>
    <p>Explore Shop Project:</p>
    <p>Direct access to Swagger documentation:
      <a href="https://shop-project-2avt.onrender.com/api-docs/#/" target="_blank">Swagger Documentation</a>
    </p>
  </section>

  <section>
    <p>Find the code on GitHub: <a href="https://github.com/luifa04/Shop-Proyect" target="_blank">GitHub</a></p>
    <p>Connect with me on LinkedIn: <a href="https://linkedin.com/in/mateo-lopez-ba06861b3" target="_blank">LinkedIn</a></p>
  </section>

  <section>
    <p>Deployment and Database:</p>
    <ul>
      <li><strong>Deployment:</strong> This API is deployed on Render. <a
          href="https://shop-project-2avt.onrender.com/" target="_blank">Visit API on Render</a> (Render - Free Tier).</li>
      <li><strong>Database:</strong> Utilizes a cloud database on Clever Cloud (Clever Cloud - Free Tier).</li>
    </ul>
    <p>Feel free to interact with the deployed API and explore its features. Note that both Render and Clever Cloud are
      used in their free versions for this project, which may have limitations in terms of resources and performance.</p>
    <p>For a better user experience, it is recommended to run the API locally. Follow the instructions in the "Inicialización del Proyecto con Docker"
      section above.</p>
  </section>

  <section>
    <p>Recommended tools for testing the API:</p>
    <ul>
      <li><strong>Postman:</strong> A powerful API testing tool. <a href="https://www.postman.com/" target="_blank">Download
          Postman</a></li>
      <li><strong>Insomnia:</strong> Another great API testing tool. <a href="https://insomnia.rest/" target="_blank">Download
          Insomnia</a></li>
      <!-- Add more examples here -->
    </ul>
    <p>Feel free to use these tools to interact with the Shop Project API and test its functionality.</p>
  </section>

  <footer>
    <p>&copy; 2024 Shop Project API. All rights reserved.</p>
  </footer>
</body>

</html>

## Inicialización del Proyecto con Docker

### Requisitos Previos
- Docker instalado en tu máquina.

### Pasos para Iniciar el Proyecto
1. Clona el repositorio desde GitHub:
    ```bash
    git clone https://github.com/luifa04/Shop-Proyect.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd shop-proyect
    ```

3. Crea un archivo `.env` con la configuración necesaria (por ejemplo, configuración de base de datos, claves secretas, etc.).

4. Construye la imagen de Docker:
    ```bash
    docker build -t shop-project-api .
    ```

5. Ejecuta el contenedor Docker:
    ```bash
    docker run -p 3000:3000 -d shop-project-api
    ```

¡El proyecto está listo para ser utilizado!



