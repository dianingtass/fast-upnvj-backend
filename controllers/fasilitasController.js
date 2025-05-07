const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
  const { nama_fasilitas, lokasi, pic, foto_uri } = req.body;
  try {
    const newFasilitas = await prisma.fasilitas.create({
      data: { nama_fasilitas, lokasi, pic, foto_uri },
    });
    res.status(201).json(newFasilitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFasilitas = async (req, res) => {
  const { nama_fasilitas, lokasi, pic, foto_uri } = req.body;
  try {
    const updated = await prisma.fasilitas.update({
      where: { id: Number(req.params.id) },
      data: { nama_fasilitas, lokasi, pic, foto_uri },
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
    res.json({ message: 'Fasilitas soft deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
