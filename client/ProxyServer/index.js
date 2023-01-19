const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const errorHandler = require('./middleware/error');

const PORT = process.env.PORT || 5000;

const app = express();

// 속도 제한
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 분
    max: 600,
});
app.use(limiter);
app.set('trust proxy', 1);

// cors
app.use(cors());

app.use('/api', require('./routes'));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
