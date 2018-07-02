import passport from 'passport';
import { Strategy } from 'passport-local';
import Status from 'http-status-codes';

const users = Object.freeze([
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'user', password: 'user' }
]);

const findOne = (username, password) => users
    .find(({ username: u, password: p }) => u === username && p === password);

const findOneById = id => users
    .find(({ id: userId }) => `${id}` === `${userId}`);

/** 
 * Exceptions is a list of methods(paths) which are allowed for non 
 * authenticated users. Request path must match path value exactly as
 * it's represented in the array, wild card is not supported for 
 * security purpose.
 */
const exceptions = [
    '/login'
];

passport.use(new Strategy({ session: true }, (username, password, done) => {
    const user = findOne(username, password);
    if (user) return done(null, user);
    done(`Could not find user ${username}`);
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = findOneById(id);
    if (user) return done(null, user);
    done(`Could not find user by Id: ${id}`);
});

/**
 * Middleware defined behavior and redirection policy for failed and success
 * logins.
 */
export const redirect = passport.authenticate('local', { failureRedirect: '/login' });

/**
 * Middleware checks whether client is authenticated and if not - blocks
 * incoming request.
 */
export const guard = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    const path = req.path.toLowerCase();
    const hasAcces = exceptions.includes(path);
    if (hasAcces) return next();

    res.status(Status.UNAUTHORIZED).end();
};

export default passport;