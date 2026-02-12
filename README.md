## Bootcamp Demo Backend

This repository contains the backend service for the DevOps Bootcamp Demo project.
It is built with NestJS and serves as the backend for the User Management Application used during the DevOps Bootcamp.

### Tech & Tools

This project is built with the following technologies:

- NestJS — backend framework
- Node.js & TypeScript
- npm for dependency management
- Folder structure follows best practices for scalability

### Getting Started
Follow these steps to run the backend locally:
1.	Clone the repository
    ```
    git clone https://github.com/DevOps-Bootcamp-2026/bootcamp-demo-backend.git
    ```
2.	Navigate into the project folder
    ```
    cd bootcamp-demo-backend
    ```
3.  Rename the .env.example to .env and change the credentials
    ```
    DATABASE_PORT=5432
    DATABASE_USER=changeme
    DATABASE_PASSWORD=changeme
    DATABASE_NAME=changeme
    PORT=3001
    CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
    ```
4.	Install dependencies
    ```
    npm install
    ```
5. Start the application
    ```
    npm start dev
    ```

> The backend service will start on the default NestJS port (http://localhost:3001).