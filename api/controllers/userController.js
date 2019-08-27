const get = require('lodash.get');
const userService = require('../../services/usersService');

class UserController {
    async getAll(req, res) {
        const limit = get(req.query, 'limit', 10);
        const skip = get(req.query, 'skip', 0);
        const users = await userService.getAll(limit, skip);
        res.json(users);
    }

    async getById(req, res) {
        const user = await userService.getById(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(400)
                .json({ message: 'User not found!' });
        }
    }
}

module.exports.userController = new UserController();
