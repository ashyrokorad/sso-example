const db = Object.freeze([
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'sso', password: 'sso' }
]);

export default class Users {
    authenticate = async (username, password) => db
        .find(({ username: u, password: p }) => u === username && p === password);

    findOne = async userId => db.find(({ id }) => userId === id);
}