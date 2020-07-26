const express = require ('express');
const mongodb = require ('mongodb');
const uri =
  'mongodb+srv://cyf:1234mongodb@cluster0.6bqdo.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongoOptions = {useUnifiedTopology: true};
const client = new mongodb.MongoClient (uri, mongoOptions);

const app = express ();
app.use (express.json ());

client.connect (function () {
  const db = client.db ('mongodb-week3');
  const collection = db.collection ('movies');

  app.get ('/films', function (request, response) {
    collection.find ().toArray ((error, result) => {
      if (error) {
        response.status (500).send (error);
      } else {
        response.status (200).send (result);
      }
    });
  });

  app.get ('/films/:id', function (request, response) {
    const collection = db.collection("movies")
    if(!mongodb.ObjectID.isValid(request.params.id)){
      response.status(500).send(error)
      
    }else if(result) {
      const id = new mongodb.ObjectID(request.params.id)
      const searchObject = {_id: id}
      response.status(200).send (result);
    }else{
      response.status(404).send("the object not found")
    }
   
  });

  app.post ('/films', function (request, response) {
    const collection = db.collection("movies")
    const movie = request.body
    collection.insertOne(movie, (error, result) => {
      if(error) {
        response.status(500).send(error)
      }else if(result) {
        response.status(200).send(result)
      }else {
        response.status(404).send("the object not insert")
      }
    })
    


  });

  app.put ('/films/:id', function (request, response) {
    response.send ('Update one film');
  });

  app.delete ('/films/:id', function (request, response) {
    response.send ('Delete one film');
  });

  app.listen (3000);
});
