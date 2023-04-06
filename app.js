const express = require('express');
const db = require('./config/db-config');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const analyticRouter = require('./routes/analytic');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const positionRouter = require('./routes/position');
const app = express();

db.connect((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Mysql connected');
    }
})

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/analytic', analyticRouter)
app.use('/api/category', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/position', positionRouter)

module.exports = app;
