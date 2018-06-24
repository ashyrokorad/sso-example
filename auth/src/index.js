import 'babel-polyfill';

import path from 'path';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import { favicon, passport } from '@midleware';
import { auth, user } from '@router';

const APP_SECRET = process.env.APP_SECRET || 'Encryption/decryption secret';
const APP_PORT = process.env.APP_PORT || 8080;
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

const app = express();
const guard = passport(APP_SECRET)
    .authenticate('jwt', { session: false });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// app.use(session({ secret: APP_SECRET, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/auth', auth(APP_SECRET));
app.use('/user', guard, user);

//curl -d '{"username":"sso", "password":"sso"}' -H "Content-Type: application/json" -X POST http://localhost:8080/login
// app.get('/', (req, res) => );
// app.post('/login', redirect);

// app.get('/user', guard, (req, res) =>
//     res.send({ user: req.user }).end());

// app.get('/logout', guard, (req, res) => {
//     req.logout();
//     res.redirect('/login');
// });

app.listen(APP_PORT, () =>
    console.log(`Listening on port ${APP_PORT}`));
