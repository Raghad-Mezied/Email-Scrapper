# Email-Scrapper

### Running the project

* add `.env` file in server folder and add these variables in
```js
DB_USER=your_user_name
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_db_name
```
* Create your_db_name with your_user_name
* in the terminal => `psql`
* `\c` your_db_name (connect to your database)
* `\i` server/src/db/emails.sql , You should get these messages
 ```
DROP TABLE
CREATE TABLE
```

* In a new terminal `cd server` => `npm i` => `npm run dev`
* In a new terminal `cd client` => `npm i` => `npm start`
* The website is running now
* You can add a website url and check the scrapped emails
* You can check all scrapped emails each with its website link
* I only success to scrappe 50 emails from skool
