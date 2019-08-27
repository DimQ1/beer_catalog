const favoriteService = require('../../services/favoriteService');

class FavoriteController {
    async getAll(req, res) {
        const { query } = req;
        const { user } = req;
        const { limit, skip } = query || {};

        const beers = await favoriteService.getAll(user.sub, limit, skip);
        res.json(beers);
    }

    async addFavorite(req, res) {
        const { params } = req;
        const { user } = req;

        const addResult = await favoriteService.addFavorite(user.sub, params.id);

        if (addResult) {
            res.json(addResult);
        } else {
            res.status(204)
                .send();
        }
    }

    async removeFavorite(req, res) {
        const { params } = req;
        const { user } = req;

        const removeResult = await favoriteService.removeFavorite(user.sub, params.id);

        if (removeResult) {
            res.json(removeResult);
        } else {
            res.status(204)
                .send();
        }
    }
}

module.exports.favoriteController = new FavoriteController();
