const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { status: 1 },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nim: true,
        nama: true,
        email: true,
        fakultas: true,
        program_studi: true,
        foto_profil: true,
      }
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { nim, nama, email, program_studi, fakultas, role, password } =
    req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { nim } });
    if (existingUser)
      return res.status(400).json({ message: 'NIM already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        nim,
        nama,
        email,
        program_studi,
        fakultas,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ id: user.id, nim: user.nim });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { nim, nama, email, program_studi, fakultas, role, password } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        nim,
        nama,
        email,
        program_studi,
        fakultas,
        password: hashedPassword,
        role,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const fs = require('fs');
const path = require('path');

exports.updateUserProfile = async (req, res) => {
  const userId = Number(req.params.id);
  const password = req.body?.password;
  const file = req.file;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    let foto_profil_url = existingUser.foto_profil;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'foto_profil',
      });

      foto_profil_url = result.secure_url;

      const oldPath = path.join(__dirname, '../uploads/foto_profil', existingUser.foto_profil);
      if (existingUser.foto_profil && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(hashedPassword && { password: hashedPassword }),
        ...(file && { foto_profil: foto_profil_url }),
      },
      select: {
        id: true,
        nama: true,
        email: true,
        foto_profil: true,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { status: 9 },
    });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
