const db = new Map();

export default class Sessions {
    invalidate = id => { }

    /**
     * Sets session duration(or session timeout) by it's identifier.
     *
     * @param {string} id session identifier(user id).
     * @param {number} seconds session duration in seconds.
     */
    setTimeout = async (id, seconds) => {
        const exp = new Date();
        exp.setSeconds(exp.getSeconds() + seconds);
        db.set(id, exp);
    }

    /**
     * Checks whether session with specified identifier exists and
     * valid.
     *
     * @param {string} id session identifier(user id).
     * @returns true in case of session exists and alive, false in other cases.
     */
    isValid = async id => {
        const exp = db.get(id);
        if (!exp) return false;
        const today = new Date();
        return today < exp;
    }

    dump = () => console.log(JSON.stringify(db));
} 