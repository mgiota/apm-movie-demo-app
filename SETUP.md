 # Setup
 
1. Required software
* [nvm](https://github.com/nvm-sh/nvm)
* [nodejs](https://github.com/nodejs/node)
* [reactjs](https://reactjs.org/)
* [mysql](https://www.mysql.com/)

2. Clone the application
    ```
    git clone https://github.com/simitt/apm-movie-demo-app.git
    cd apm-movie-demo-app
    ```

3. Set up the demo database

    Create the mysql database `moviedemo` and create a user that can read from this database. For example:

    NOTE: Replace the user and password placeholders with your mysql user and password. 
    ```
    CREATE database moviedemo;
    CREATE USER '<mysql-user>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<mysql-password>';
    GRANT ALL ON moviedemo.* TO '<mysql-user>'@'localhost';
    ```

    Fill the database with some data. For example, run the following command to add the provided sample data to the mysql database:
    ```
    mysql -u <mysql-user> -p moviedemo < ./movie-backend/data.sql
    ```

4. Ensure that the backend app is running and that it can connect to the mysql database. 

    In `movie-backend/src/db.js` set the following information:
    ```
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: '<mysql-user>', // replace with mysql user
            password: '<mysql-password>', // replace with mysql user password
            database: 'moviedemo',
        }
    });
    ```

    Start the backend service in development mode
    ```
    cd movie-backend
    nvm use
    npm install
    npm run dev
    ```

5. Ensure that the backend application is reachable via http request by making a request to `http://localhost:3001/genres` (for example via using [curl](https://github.com/curl/curl) or [postman](https://www.postman.com/)).


6. Start the frontend app.
    ```
    cd movie-frontend
    nvm use
    npm install 
    npm start
    ```

7. By default the app will be runnin on [http://localhost:3000](http://localhost:3000). Navigate to a browser and try it out.