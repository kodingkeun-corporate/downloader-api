const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('json spaces', 2);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ message: err.message });
});

app.listen(PORT, () => {
    console.log('SERVER LISTEN ON PORT:', PORT);
});

module.exports = app;
