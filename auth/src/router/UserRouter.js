import { Router } from 'express';
import Status from 'http-status-codes';
import { Sessions, Permissions } from '@data';

const { OK, UNAUTHORIZED } = Status;
const router = new Router();

router.get('/', async (req, res) => {
    const { user } = req;
    if (!user) return res.sendStatus(UNAUTHORIZED).end();
    const ok = await Sessions.isValid(user.id);
    if (!ok) return res.sendStatus(UNAUTHORIZED).end();

    const permissions = await Permissions.find(user.id);
    return res.status(OK).send({ user, permissions }).end();
});

export default router;