# car-rental edited

After cloning the repository, run the command below to install the necessary packages:
```
npm install
```

Then create the .env file to create the environment variables needed for the server and mongodb:
```
API_PORT=4001

MONGO_URI="mongodb://localhost:27017/carRental"
MONGOCLIENT_URL="mongodb://localhost:27017"
TOKEN_KEY="Authentication Key"
```

To run this project on development mode, run the following command:
```
npm run dev
```
