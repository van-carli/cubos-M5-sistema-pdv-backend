![](https://i.imgur.com/xG74tOh.png)

# Point of Sale (PDV) System 🛒

## 💻 Project overview:

This repository showcases a Point of Sale (PDV) backend system developed as the final challenge in Module 5 of the 'Backend Software Development' course at Cubos Academy. 

The project provides a robust RESTful API for managing a commercial establishment. It simulates real-world backend operations, including secure user authentication, product catalog management with cloud image uploads, client registration, and order processing with automated email notifications. 

It was built using Node.js and incorporates database management with PostgreSQL, query building with Knex.js, file storage via AWS SDK, and strict data validation using Joi.

## 🔧 Skills & Tools:

![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

## Execution Instructions:

To run this project on your local machine, follow the steps below:

#### 1. Ensure you have <a href="https://nodejs.org/en">Node.js</a> and PostgreSQL installed on your computer.

#### 2. Clone this repository to your local environment using the following command in the terminal:

`git clone https://github.com/van-carli/cubos-M5-sistema-pdv-backend.git`

#### 3. Navigate to the project directory:

`cd repository-name`

#### 4. Install project dependencies using npm:

Because this is a complex project with multiple libraries (Express, Knex, pg, bcrypt, AWS SDK, Nodemailer, etc.), you don't need to install them one by one. The `package.json` is already configured, so simply run:

`npm install`

#### 5. Configure the Database:

* Open your PostgreSQL interface (such as pgAdmin or DBeaver) or terminal.
* Execute the SQL commands found in the `dump.sql` file provided in this repository. This will create the `pdv` database, build all necessary tables, and insert the initial category data.

#### 6. Configure Environment Variables:

* Locate the `.env.example` file in the root directory.
* Create a new file named `.env` and copy the contents over.
* Fill in your local configurations: database credentials, server port, JWT secrets, email service credentials (for order notifications), and your Backblaze B2 / AWS S3 keys (for image uploads).

#### 7. Start the local server:

* The initialization script is already set up in the `package.json`. Start the server by running:

`npm run dev`

> Obs: The server will be running on the port specified in your `.env` file. You can access and test the API routes using a tool such as <a href="https://insomnia.rest/download">Insomnia</a>.