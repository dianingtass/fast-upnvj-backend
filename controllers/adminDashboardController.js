const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({
      where: { status: 1 }
    });

    const totalFasilitas = await prisma.fasilitas.count({
      where: { status: 1 }
    });

    const peminjamanCounts = await prisma.peminjaman.groupBy({
      by: ['proses'],
      _count: {
        proses: true
      }
    });

    const statusMap = {
      Diproses: 0,
      Diterima: 0,
      Ditolak: 0,
      Dibatalkan: 0
    };

    peminjamanCounts.forEach(item => {
      if (statusMap.hasOwnProperty(item.proses)) {
        statusMap[item.proses] = item._count.proses;
      }
    });

    const dashboardData = {
      totalUsers,
      totalFasilitas,
      totalPeminjaman: statusMap
    };

    res.json(dashboardData);
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
