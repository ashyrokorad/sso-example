import 'babel-polyfill';

import path from 'path';
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

import passport from './Auth';
import { redirect } from './Auth';
import { guard } from './Auth';

const APP_SECRET = process.env.APP_SECRET || 'Session encryption/decryption secret';
const APP_PORT = process.env.APP_PORT || 8080;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { domain: '.example.com' },

}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => res.render('login'));
app.post('/login', redirect, (req, res) => {
    const uri = req.cookies.redirect;
    if (uri) return res.redirect(uri);
    res.send({ user: req.user }).end();
});

app.get('/user', guard, (req, res) =>
    res.send({ user: req.user }).end());

app.get('/logout', guard, (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.listen(APP_PORT, () =>
    console.log(`Listening on port ${APP_PORT}`));
