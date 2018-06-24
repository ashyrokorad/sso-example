import { Router } from 'express';
import Status from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Users, Sessions } from '@data';
const { OK, INTERNAL_SERVER_ERROR } = Status;
const ONE_DAY_SEC = 60 * 60 * 24;

export default (secret) => {
    const router = new Router();

    router.get('/', (_, res) => res.render('login'))

    router.post('/', async (req, res) => {
        const { username, password } = req.body;
        const user = await Users.authenticate(username, password);
        if (!user) return res.sendStatus(INTERNAL_SERVER_ERROR).end();

        const { id } = user;
        const payload = jwt.sign({ id }, secret);
        Sessions.setTimeout(id, ONE_DAY_SEC);

        res.status(OK)
            .cookie('X-Authorization', `Bearer ${payload}`, { maxAge: ONE_DAY_SEC, httpOnly: true })
            .send({ payload, username }).end();
    });

    return router;
}