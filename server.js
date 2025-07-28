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
const initSocket = require("./socket"); // archivo socket/index.js
initSocket(server); // inicializa conexión socket.io

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

// Puerto
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
