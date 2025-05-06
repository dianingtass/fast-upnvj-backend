const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { nim, nama, email, program_studi, fakultas, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { nim } });
    if (existingUser) return res.status(400).json({ message: 'NIM already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { nim, nama, email, program_studi, fakultas, password: hashedPassword, role: 1 }
    });

    res.status(201).json({ id: user.id, nim: user.nim });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { nim, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { nim } });
    if (!user) return res.status(401).json({ message: 'Invalid NIM' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
