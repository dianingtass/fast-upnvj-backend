const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../utils/cloudinary');

const VALID_STATUSES = ['Diproses', 'Diterima', 'Ditolak', 'Dibatalkan'];

exports.getAllPeminjaman = async (req, res) => {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: { status: 1 },
    });
    res.json(peminjaman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPeminjamanById = async (req, res) => {
  const id = Number(req.params.id);
  
  try {
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            nama: true,
            email: true,
            role: true
          }
        },
        fasilitas: {
          select: {
            nama: true,
            deskripsi: true
          }
        }
      }
    });

    if (!peminjaman) {
      return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
    }

    res.json(peminjaman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPeminjaman = async (req, res) => {
  const {
    tgl_pengajuan,
    tgl_pinjam,
    jam_mulai,
    jam_selesai
  } = req.body;

  const id_user = Number(req.body.id_user);
  const id_fasilitas = Number(req.body.id_fasilitas);

  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File KAK is required' });
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'peminjaman_kak',
    });
    const kak_uri = result.secure_url;

    const newPeminjaman = await prisma.peminjaman.create({
      data: {
        id_user,
        id_fasilitas,
        tgl_pengajuan: new Date(tgl_pengajuan),
        tgl_pinjam: new Date(tgl_pinjam),
        jam_mulai,
        jam_selesai,
        kak_uri,
        proses: 'Diproses',
      },
    });

    res.status(201).json(newPeminjaman);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePeminjaman = async (req, res) => {
  const id = Number(req.params.id);
  const { proses, notes } = req.body;
  const file = req.file;

  if (!VALID_STATUSES.includes(proses)) {
    return res.status(400).json({ message: `Status tidak valid. Harus salah satu dari: ${VALID_STATUSES.join(', ')}` });
  }

  try {
    const existing = await prisma.peminjaman.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Data tidak ditemukan' });

    let disposisi_uri = existing.disposisi_uri;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'disposisi',
      });
      disposisi_uri = result.secure_url;
    }

    const updated = await prisma.peminjaman.update({
      where: { id },
      data: {
        proses,
        notes,
        disposisi_uri,
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
