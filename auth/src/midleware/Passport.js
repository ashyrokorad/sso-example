import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users, Sessions } from '@data';

export default secret => {

    const params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };

    passport.use(new Strategy(params,
        async (payload, callback) => {
            const { id } = payload;

            const valid = await Sessions.isValid(id);
            if (!valid) return callback(new Error('Session has been expired!'));

            const user = await Users.findOne(id);
            if (!user) return callback(new Error(`Could not find user by id: ${id}`));

            callback(null, user);
        }));

    return passport;
};