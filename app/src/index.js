import 'babel-polyfill';

import path from 'path';
import logger from 'morgan';
import express from 'express';

const APP_PORT = process.env.APP_PORT || 8080;
const app = express();

app.use(logger('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => res.render('index'));

app.listen(APP_PORT, () =>
    console.log(`Listening on port ${APP_PORT}`));