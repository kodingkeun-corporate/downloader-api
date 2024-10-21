const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');

const indexRouter = require('./src/routes/index.js');
const { APP_URL, PORT, IS_DEV } = require('./src/config/constants.config.js');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('json spaces', 2);

// Rate limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((_, __, next) => {
    next(createError(404));
});

// Error handler
app.use((err, _, res) => {
    res.locals.message = err.message;
    res.locals.error = IS_DEV ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.json({ message: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`🔥 Server listening on ${APP_URL}`);
});

module.exports = app;
