const db = Object.freeze([
    { id: 1, permissions: { app: [1, 2, 4, 8] } },
    { id: 2, permissions: { app: [1] } }
]);

export default class Permissions {

    find = async userId => {
        const o = db.find(({ id }) => id === userId);
        return o ? p.permissions : {};
    };
}