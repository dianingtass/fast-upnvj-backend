const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fasilitasRoutes = require('./routes/fasilitasRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fasilitas', fasilitasRoutes);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
