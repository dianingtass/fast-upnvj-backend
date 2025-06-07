const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getRiwayatPeminjamanById = async (req, res) => {
  try {
    const riwayat = await prisma.peminjaman.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        fasilitas: {
          select: {
            nama_fasilitas: true
          }
        }
      }
    });

    if (!riwayat) {
      return res.status(404).json({ message: 'Riwayat peminjaman tidak ditemukan' });
    }

    const response = {
      id: riwayat.id,
      id_fasilitas: riwayat.id_fasilitas,
      fasilitas_nama: riwayat.fasilitas?.nama_fasilitas || 'Fasilitas tidak ditemukan',
      tgl_pengajuan: riwayat.tgl_pengajuan,
      tgl_pinjam: riwayat.tgl_pinjam,
      jam_mulai: riwayat.jam_mulai,
      jam_selesai: riwayat.jam_selesai,
      proses: riwayat.proses,
      notes: riwayat.notes || null,
      kak_uri: riwayat.kak_uri || null,
      disposisi_uri: riwayat.disposisi_uri || null,
      status: riwayat.status
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRiwayatPeminjaman = async (req, res) => {
  try {
    const riwayat = await prisma.peminjaman.findMany({
      where: { 
        id_user: Number(req.params.id),
        status: 1
      },
      include: {
        fasilitas: {
          select: {
            nama_fasilitas: true
          }
        }
      },
      orderBy: {
        tgl_pengajuan: 'desc'
      }
    });

    const formattedRiwayat = riwayat.map(item => ({
      id: item.id,
      id_fasilitas: item.id_fasilitas,
      fasilitas_nama: item.fasilitas.nama_fasilitas,
      tgl_pengajuan: item.tgl_pengajuan,
      tgl_pinjam: item.tgl_pinjam,
      jam_mulai: item.jam_mulai,
      jam_selesai: item.jam_selesai,
      proses: item.proses,
      notes: item.notes,
      status: item.status
    }));

    res.json(formattedRiwayat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};