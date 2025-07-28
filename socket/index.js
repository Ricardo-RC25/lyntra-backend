const mongoose = require("mongoose");
const LocationHistory = require("../models/location.model");

function initSocket(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("📡 Cliente conectado vía WebSocket");

    // Escuchar evento de ubicación
    socket.on("location", async (data) => {
      try {
        const { userId, latitude, longitude } = data;

        if (!userId || !latitude || !longitude) {
          console.warn("❗ Datos incompletos recibidos:", data);
          return;
        }

        // Crear nuevo registro de historial
        const newLocation = new LocationHistory({
          userId: new mongoose.Types.ObjectId(userId),
          location: {
            latitude,
            longitude,
          },
          speedKmh: 18, // Puedes hacer un cálculo más adelante si lo deseas
        });

        const result = await newLocation.save();
        console.log("✅ Ubicación guardada con ID:", result._id);

      } catch (err) {
        console.error("❌ Error al guardar ubicación:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❎ Cliente desconectado");
    });
  });
}

module.exports = initSocket;
