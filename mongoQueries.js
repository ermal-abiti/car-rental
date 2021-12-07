const { MongoClient, ObjectId } = require('mongodb');

// connection
const url = 'mongodb://localhost:27017';
const mongodb = new MongoClient(url);

// Database Name
const dbName = 'carRental';

async function main() {
  // Use connect method to connect to the server
  await mongodb.connect();
  console.log('Connected successfully to server');
  const db = mongodb.db(dbName);
  const collection = db.collection('cars');

  // the following code examples can be pasted here...
  
  const insertResult = await collection.insertMany([
    { 
        "_id" : ObjectId("60e84e45772d9c247d179ea7"), 
        "name" : "Golf mk8",
        "price_per_day" : 50.0, 
        "year": 2015,
        "color" : "black",
        "steering_type" : "automatic", 
        "number_of_seats" : 5
    },
    { 
        "_id" : ObjectId("60e84e45772d9c247d179ea1"), 
        "name" : "Golf mk7",
        "price_per_day" : 40.0, 
        "year": 2013,
        "color" : "white",
        "steering_type" : "manual", 
        "number_of_seats" : 5
    },
    { 
        "_id" : ObjectId("60e84e45772d9c247d179ea2"), 
        "name" : "Golf mk7 gtd",
        "price_per_day" : 50.0, 
        "year": 2013,
        "color" : "white",
        "steering_type" : "automatic", 
        "number_of_seats" : 5
    },
    { 
        "_id" : ObjectId("60e84e45772d9c247d179ea3"), 
        "name" : "BMW 320d",
        "price_per_day" : 80.0, 
        "year": 2018,
        "color" : "black",
        "steering_type" : "automatic", 
        "number_of_seats" : 5
    },
    { 
        "_id" : ObjectId("60e84e45772d9c247d179ea4"), 
        "name" : "BMW x7",
        "price_per_day" : 105.0, 
        "year": 2021,
        "color" : "white",
        "steering_type" : "automatic", 
        "number_of_seats" : 7
    },
]);
  console.log('Inserted documents =>', insertResult);


  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => mongodb.close());