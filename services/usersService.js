const users = require('../dataAccess/usersRepository');

class UserService {
    constructor() {
        this._getUserWithoutPassword = (user) => {
            const {
                // eslint-disable-next-line no-unused-vars
                password, _id, __v, ...userWithoutPassword
            } = user.toObject({ virtuals: true });

            return userWithoutPassword;
        };
    }

    async getAll(limit = 10, skip = 0) {
        const allUsers = await users.getAll({}, limit, skip);
        if (!allUsers) {
            return null;
        }
        const allUsersWithoutPasswords = allUsers.findResult.map(user => this._getUserWithoutPassword(user));

        const allUsersResult = {
            limit,
            skip,
            items: allUsersWithoutPasswords.length,
            count: allUsers.count,
            users: allUsersWithoutPasswords
        };

        return allUsersResult;
    }

    async getById(id) {
        const user = await users.findById(id);
        if (!user) {
            return null;
        }

        return this._getUserWithoutPassword(user);
    }

    async create(user) {
        return this._getUserWithoutPassword(await users.create(user));
    }
}

module.exports = new UserService();
