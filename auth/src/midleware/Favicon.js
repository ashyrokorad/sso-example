import Status from 'http-status-codes';

export default (req, res, next) => {
    const { originalUrl } = req;
    if (originalUrl !== '/favicon.ico') return next();
    res.status(Status.NO_CONTENT).json({ node: true });
};