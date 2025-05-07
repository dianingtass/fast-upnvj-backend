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
  const { nama_fasilitas, lokasi, pic } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'Foto is required' });
  }

  try {
    const newFasilitas = await prisma.fasilitas.create({
      data: {
        nama_fasilitas,
        lokasi,
        pic,
        foto_uri: file.originalname,
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
      const oldFilePath = path.join(
        __dirname,
        '/fasilitas_foto',
        existingFasilitas.foto_uri
      );

      if (existingFasilitas.foto_uri && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      updateData.foto_uri = file.originalname;
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
      where: { id: Number(req.params.id) },
      data: { status: 9 },
    });
    res.json({ message: 'Fasilitas deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
