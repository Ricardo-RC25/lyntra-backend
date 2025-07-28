const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // referencia a la colección users
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  speedKmh: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Forzar nombre exacto de la colección: "locationHistory"
module.exports = mongoose.model("LocationHistory", locationSchema, "locationHistory");
