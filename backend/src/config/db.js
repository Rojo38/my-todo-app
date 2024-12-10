const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.MONGO_URI) {
  console.error('URI MongoDB manquante dans le fichier .env');
  process.exit(1);
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log('MongoDB est connecté !');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
  // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then(() => console.log('MongoDB connected'))
  // .catch(err => console.error('MongoDB connection error:', err));

};

module.exports = connectDB;
