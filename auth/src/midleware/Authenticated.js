import Status from 'http-status-codes';

/** 
 * Exceptions is a list of methods(paths) which are allowed for non 
 * authenticated users. Request path must match path value exactly as
 * it's represented in the array, wild card is not supported for 
 * security purpose.
 */
const exceptions = [
    '/login'
];

/**
 * Middleware checks whether client is authenticated or not. All requests
 * will be blocked(except {@code exception} list) if the user is not 
 * authenticated.
 */
export default (req, res, next) => {
    if (req.isAuthenticated()) return next();

    const path = req.path.toLowerCase();
    const hasAcces = exceptions.includes(path);
    if (hasAcces) return next();

    res.status(Status.UNAUTHORIZED).end();
};