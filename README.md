### This project is for the programming assignment of Dream broker
https://challenge.dreambroker.jobs/245768c7-b82f-4a77-abbc-d1214acf7163 <br />

if you run this prject on your local, please use port number 5000.
Also, please find the deployed app from below https://dbassignmentapi.herokuapp.com/analyze

## Available Scripts

In the project directory, you can run:

### `npm install`

If the installation was successful, you should be able to run the following command.

### `npm run dev`
Runs the app in the development mode. You will see extra logging information.<br />

### `npm start`
Runs the app in the production mode.<br />

### `npm run test`
Runs the test scenario by jest.<br />

### `npm run lint`
Runs linting.<br />

## Example query

 curl --header "Content-Type: application/json" \
            --request POST \
            --data '{"text":"hello 2 times  "}' \
            https://dbassignmentapi.herokuapp.com/analyze

