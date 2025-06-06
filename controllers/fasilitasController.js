const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

exports.getAllFasilitas = async (req, res) => {
  try {
    const fasilitas = await prisma.fasilitas.findMany({
      where: { status: 1 },
    });
    res.json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFasilitasById = async (req, res) => {
  try {
    const fasilitas = await prisma.fasilitas.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(fasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFasilitas = async (req, res) => {
  const { nama_fasilitas, lokasi, pic } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Foto is required' });
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'fasilitas',
    });

    const newFasilitas = await prisma.fasilitas.create({
      data: {
        nama_fasilitas,
        lokasi,
        pic,
        foto_uri: result.secure_url,
      },
    });

    res.status(201).json(newFasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFasilitas = async (req, res) => {
  const { nama_fasilitas, lokasi, pic } = req.body;
  const file = req.file;
  const id = Number(req.params.id);

  try {
    const existingFasilitas = await prisma.fasilitas.findUnique({
      where: { id },
    });

    if (!existingFasilitas) {
      return res.status(404).json({ message: 'Fasilitas not found' });
    }

    const updateData = {
      nama_fasilitas,
      lokasi,
      pic,
    };

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'fasilitas',
      });
      updateData.foto_uri = result.secure_url;
    }

    const updated = await prisma.fasilitas.update({
      where: { id },
      data: updateData,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFasilitas = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.fasilitas.update({
      where: { id },
      data: { status: 9 },
    });
    res.json({ message: 'Fasilitas deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
