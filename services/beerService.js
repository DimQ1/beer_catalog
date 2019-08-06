const beerRepository = require('../dataAccess/beerRepository');

class BeerService {
    async create(beer) {
        const createResult = await beerRepository.create(beer);

        return createResult;
    }

    async deleteById(id) {
        const deleResult = await beerRepository.deleteById(id);
        if (!deleResult) {
            return null;
        }

        return deleResult;
    }

    async getById(id, userId) {
        const beer = await beerRepository.findById(id, userId);
        if (!beer) {
            return null;
        }

        return beer;
    }

    async getAll(query, userId) {
        const { limit, skip, ...findQuery } = query || {};
        const allBeers = await beerRepository.getAllWithFavoriteField(findQuery, userId, limit || 10, skip || 0);
        if (!allBeers) {
            return null;
        }

        const allBeersResult = {
            limit: limit || 10,
            skip: skip || 0,
            items: allBeers.findResult.length,
            count: allBeers.count,
            beers: allBeers.findResult
        };

        return allBeersResult;
    }
}

module.exports = new BeerService();
