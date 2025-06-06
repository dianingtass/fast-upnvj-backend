const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const VALID_STATUSES = ['Diproses', 'Diterima', 'Ditolak', 'Dibatalkan'];

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
      if (disposisi_uri) {
        const oldPath = path.join(__dirname, '..', 'uploads', 'disposisi', disposisi_uri);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      disposisi_uri = file.filename;
    }

    const updated = await prisma.peminjaman.update({
      where: { id },
      data: {
        proses,
        notes,
        disposisi_uri
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};