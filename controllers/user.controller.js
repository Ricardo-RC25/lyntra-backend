const User = require("../models/user.mode");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "fullName email adminContactPhone address role"
    );

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener perfil", error: error.message });
  }
};
