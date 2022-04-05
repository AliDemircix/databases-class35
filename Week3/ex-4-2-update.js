const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://hyfuser:Test2022@cluster0.ogeb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;

  const collection = client.db('world').collection('city');

  collection.updateOne(
    { ID: 2022 },
    { $set: { Population: 5000000 } },
    (err) => {
      if (err) throw err;
      console.log('1 document updated');
      client.close();
    },
  );
});
