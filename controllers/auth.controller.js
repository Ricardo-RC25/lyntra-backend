const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, adminContactPhone, address, password } = req.body;

    if (!fullName || !email || !adminContactPhone || !address || !password) {
      return res.status(400).json({ msg: "Todos los campos obligatorios deben estar completos." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "El correo ya está registrado." });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      adminContactPhone,
      address,
      passwordHash,
      role: "admin",
      isVerified: true
    });

    await newUser.save();

    res.status(201).json({ msg: "Administrador registrado correctamente", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

exports.login = async (req, res) => 
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email y contraseña son requeridos." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado." });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta." });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};
