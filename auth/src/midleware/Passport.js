import passport from 'passport';
import { Strategy } from 'passport-local';
import { authenticate } from '@data/User';
import { findOne } from '@data/User';

passport.use(new Strategy({ session: true }, (username, password, done) => {
    const user = authenticate(username, password);
    if (user) return done(null, user);
    done(`Could not find user ${username}`);
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = findOne(id);
    if (user) return done(null, user);
    done(`Could not find user by Id: ${id}`);
});

export default passport;