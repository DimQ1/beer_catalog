const favoriteRepository = require('../dataAccess/favoriteRepository');

class FavoriteService {
    async getAll(userId, limit = 10, skip = 0) {
        const favorites = await favoriteRepository.getAll({ user: userId }, limit, skip);

        return favorites;
    }

    async addFavorite(userId, beerId) {
        const addResult = await favoriteRepository.addFavorite(userId, beerId);

        return addResult;
    }

    async removeFavorite(userId, beerId) {
        const removeResult = await favoriteRepository.removeFavorite(userId, beerId);

        return removeResult;
    }
}

module.exports = new FavoriteService();
