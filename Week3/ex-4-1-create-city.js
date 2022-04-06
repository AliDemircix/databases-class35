const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://hyfuser:Test2022@cluster0.ogeb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    throw err;
  }

  const collection = client.db('world').collection('city');

  const newCity = {
    ID: 2022,
    Name: 'Ankara',
    CountryCode: 'TR',
    District: 'ANADOLU',
    Population: 5747325,
  };

  collection.insertOne(newCity, (err) => {
    if (err) throw err;
    console.log('New document inserted');
    client.close();
  });
});
