const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('weatherapp');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connectDB, client };
