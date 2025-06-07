const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger');

dotenv.config();
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const fasilitasRoutes = require('../routes/fasilitasRoutes');
const peminjamanRoutes = require('../routes/peminjamanRoutes');
const riwayatPeminjamanRoutes = require('../routes/riwayatPeminjamanRoutes');

const app = express();

app.get("/", (req, res) => {
  res.send("Back-End FAST UPNVJ\nCapstone Project\nStudy Club KSM Android 2025");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fasilitas', fasilitasRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/riwayat-peminjaman', riwayatPeminjamanRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});