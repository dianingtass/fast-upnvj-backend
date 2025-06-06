const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getProdiFakultas(nim) {
  const code = nim.substring(4, 7);
  const mapping = {
    // FEB
    '101': ['D3 Perbankan dan Keuangan', 'Fakultas Ekonomi dan Bisnis'],
    '102': ['D3 Akuntansi', 'Fakultas Ekonomi dan Bisnis'],
    '111': ['S1 Manajemen', 'Fakultas Ekonomi dan Bisnis'],
    '112': ['S1 Akuntansi', 'Fakultas Ekonomi dan Bisnis'],
    '113': ['S1 Ekonomi Pembangunan', 'Fakultas Ekonomi dan Bisnis'],
    '114': ['S1 Ekonomi Syariah', 'Fakultas Ekonomi dan Bisnis'],

    // FK
    '211': ['S1 Kedokteran', 'Fakultas Kedokteran'],
    '212': ['S1 Farmasi', 'Fakultas Kedokteran'],

    // FT
    '311': ['S1 Teknik Mesin', 'Fakultas Teknik'],
    '312': ['S1 Teknik Industri', 'Fakultas Teknik'],
    '313': ['S1 Teknik Perkapalan', 'Fakultas Teknik'],
    '314': ['S1 Teknik Elektro', 'Fakultas Teknik'],

    // FISIP
    '411': ['S1 Ilmu Komunikasi', 'Fakultas Ilmu Sosial dan Politik'],
    '412': ['S1 Hubungan Internasional', 'Fakultas Ilmu Sosial dan Politik'],
    '413': ['S1 Ilmu Politik', 'Fakultas Ilmu Sosial dan Politik'],
    '414': ['S1 Sains Informasi', 'Fakultas Ilmu Sosial dan Politik'],

    // FIK
    '501': ['D3 Sistem Informasi', 'Fakultas Ilmu Komputer'],
    '511': ['S1 Informatika', 'Fakultas Ilmu Komputer'],
    '512': ['S1 Sistem Informasi', 'Fakultas Ilmu Komputer'],

    // FH
    '611': ['S1 Hukum', 'Fakultas Hukum'],

    // FIKES
    '701': ['D3 Keperawatan', 'Fakultas Ilmu Kesehatan'],
    '702': ['D3 Fisioterapi', 'Fakultas Ilmu Kesehatan'],
    '711': ['S1 Ilmu Keperawatan', 'Fakultas Ilmu Kesehatan'],
    '713': ['S1 Kesehatan Masyarakat', 'Fakultas Ilmu Kesehatan'],
    '714': ['S1 Ilmu Gizi', 'Fakultas Ilmu Kesehatan'],
  }

  return mapping[code] || [null, null]
}

exports.register = async (req, res) => {
  const { nim, nama, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and confirm password do not match' });
  }
  
  const [program_studi, fakultas] = getProdiFakultas(nim)

  if (!program_studi || !fakultas) {
    return res.status(400).json({ message: 'NIM format is invalid or unsupported' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { nim } });
    if (existingUser) return res.status(400).json({ message: 'NIM already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { nim, nama, email, password: hashedPassword, program_studi, fakultas, role: 1 }
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
