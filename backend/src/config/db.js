const mongoose = require('mongoose');
require('dotenv').config(); // Charger le fichier .env

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB est connecté !');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error.message);
    process.exit(1); // Arrête l'application si la connexion échoue
  }
};

module.exports = connectDB;
