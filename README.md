# How To Use Movies Application with NestJS

This guide will help you set up my NestJS project from GitHub on your local machine.

## Prerequisites

1. **Install Node.js and npm**
   - Go to the [Node.js website](https://nodejs.org/).
   - Download the LTS version (Long Term Support).
   - Follow the installation instructions for your operating system.
   - After installation, check if Node.js and npm (Node Package Manager) are installed by running the following commands in your terminal or command prompt:
     ```bash
     node -v
     npm -v
     ```

2. **Install Git**
   - Go to the [Git website](https://git-scm.com/).
   - Download and install Git for your operating system.
   - After installation, check if Git is installed by running:
     ```bash
     git --version
     ```

## Step 1: Clone the Project

1. **Open a Terminal or Command Prompt**
   - Navigate to the folder where you want to download the project.

2. **Clone the Repository**
   - Use the following command to clone the project from GitHub. 
     ```bash
     git clone https://github.com/karabacakBartu/movies.git
     ```

3. **Navigate into the Project Directory**
   - Change into the project directory with:
     ```bash
     cd movies
     ```

## Step 2: Install Project Dependencies

1. **Install Dependencies**
   - Run the following command to install all the necessary packages for the project:
     ```bash
     npm install
     ```

## Step 3: Configure Environment Variables

1. **Check for .env File**
   - Many projects require environment variables to be set. Look for a `.env.example` file or similar.
   - If it exists, copy it to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```

2. **Edit the .env File**
   - Open the `.env` file in a text editor and update any configuration values as needed (e.g., database connection strings, API keys).
  
      ```bash
     TMDB_API_KEY=TMDB_API_KEY    --> This is your TMDB API KEY; you have to replace the value on the right side of the equality symbol with your key.
     TMDB_BASE_URL=TMDB_BASE_URL  --> This is your TMDB BASE URL; "https://api.themoviedb.org/3" you have to replace the value on the right side of the equality symbol with this url.
     MONGODB_URI=MONGODB_URI      --> This is your TMDB API KEY; you have to replace the value on the right side of the equality symbol with your key.
      
     DB_USER=DB_USER              --> This represents your <username> in the MongoDB connection string.
     DB_PASSWORD=DB_PASSWORD      --> This represents your <password> in the MongoDB connection string.
     DB_URL=DB_URL                --> "cluster.ypkxw.mongodb.net"
      
     PORT=PORT                    --> The choice of port number is up to you, but it is typically set to 3000.


     Example env;
                  DB_USER=username
                  DB_PASSWORD=pass
                  DB_URL=cluster.ypkxw.mongodb.net
                  MONGODB_URI=@/?retryWrites=true&w=majority&appName=Cluster0
     ```

## Step 4: Run the Project

1. **Start the Development Server**
   - Run the following command to start the server:
     ```bash
     npm run start:dev
     # or
     nest start --watch
     ```

2. **Access the Application**
   - Open your web browser and go to `http://localhost:3000` (or whatever port your application is configured to use).

Yes, adding the list of available API endpoints to your `README.md` file would be very helpful for users. Here’s how you can incorporate those endpoints into your documentation:


## Step 5: Accessing the Swagger API Documentation

1. **Open Swagger UI**
   - After starting your application, you can access the Swagger API documentation by navigating to the following URL in your web browser:
     ```plaintext
     http://localhost:3000/api#
     ```

2. **Explore the API Endpoints**
   - In the Swagger UI, you will see a list of all available API endpoints. Here are some key endpoints you can use:

     - **Fetch and Save Movies**
       - **GET** `/movies/fetch-and-save`
       - Description: Fetches and saves movies from the TMDB API.

     - **Find Movie by ID**
       - **GET** `/movies/find-by-id/{id}`
       - Description: Retrieves a movie by its UUID.

     - **Find All Movies**
       - **GET** `/movies/find-all`
       - Description: Retrieves a list of all movies in the database.

     - **Remove Movie by ID**
       - **DELETE** `/movies/remove-by-id/{id}`
       - Description: Deletes a movie from the database using its UUID.

     - **Create a New Movie**
       - **POST** `/movies/create`
       - Description: Creates a new movie entry in the database.

3. **Test the API**
   - You can use the Swagger UI to make API requests directly from your browser. Simply click on an endpoint, fill in the required parameters, and hit the "Execute" button to see the response.
