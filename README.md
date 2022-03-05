# Verytune

## Local DB
Using the following docker command a local mongo DB instance can be instantiated.  

    docker run -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 --name psychmatch-mongo -d --restart always mongo

# Available Scripts
In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
