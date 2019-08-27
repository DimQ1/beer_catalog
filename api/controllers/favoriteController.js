const get = require('lodash.get');
const favoriteService = require('../../services/favoriteService');

class FavoriteController {
    async getAll(req, res) {
        const limit = get(req.query, 'limit', 10);
        const skip = get(req.query, 'skip', 0);

        const beers = await favoriteService.getAll(req.user.sub, limit, skip);
        res.json(beers);
    }

    async addFavorite(req, res) {
        const addResult = await favoriteService.addFavorite(req.user.sub, req.params.id);

        if (addResult) {
            res.json(addResult);
        } else {
            res.status(204)
                .send();
        }
    }

    async removeFavorite(req, res) {
        const removeResult = await favoriteService.removeFavorite(req.user.sub, req.params.id);

        if (removeResult) {
            res.json(removeResult);
        } else {
            res.status(204)
                .send();
        }
    }
}

module.exports.favoriteController = new FavoriteController();
