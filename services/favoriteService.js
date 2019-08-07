const favoriteRepository = require('../dataAccess/favoriteRepository');

class FavoriteService {
    async getAll(userId, limit, skip) {
        const favorites = await favoriteRepository.getAll({ user: userId }, limit || 10, skip || 0);

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
