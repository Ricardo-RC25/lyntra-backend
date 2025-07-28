const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Conexión DB
connectDB();

// App y servidor HTTP
const app = express();
const http = require("http");
const server = http.createServer(app);

// Socket.io
const initSocket = require("./socket");
initSocket(server);

// CORS configurado correctamente
const allowedOrigins = [
  "https://lyntra-fd18a.web.app",
  "http://localhost:3000"
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware para JSON
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

// Puerto
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
