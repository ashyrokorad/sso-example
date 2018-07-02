const users = Object.freeze([
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'sso', password: 'sso' }
]);

export const authenticate = (username, password) => users
    .find(({ username: u, password: p }) => u === username && p === password);

export const findOne = id => users
    .find(({ id: userId }) => `${id}` === `${userId}`);