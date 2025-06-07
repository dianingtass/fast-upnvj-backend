const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../docs/swagger'); // Import dari file terpisah

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Back-End FAST UPNVJ\nCapstone Project\nStudy Club KSM Android 2025");
});

// API Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/users', require('../routes/userRoutes'));
app.use('/api/fasilitas', require('../routes/fasilitasRoutes'));
app.use('/api/peminjaman', require('../routes/peminjamanRoutes'));
app.use('/api/riwayat-peminjaman', require('../routes/riwayatPeminjamanRoutes'));
app.use('/uploads', express.static('uploads'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
