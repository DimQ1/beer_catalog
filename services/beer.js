const get = require('lodash.get');
const omit = require('lodash.omit');

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

    async getById(userId, id) {
        const beer = await beerRepository.findById(id, userId);
        if (!beer) {
            return null;
        }

        return beer;
    }

    async getAll(userId, query) {
        const limit = get(query, 'query.limit', 10);
        const skip = get(query, 'query.skip', 0);
        const findQuery = omit(query, ['limit', 'skip']);

        const allBeers = await beerRepository.getAllWithFavoriteField(findQuery, userId, limit, skip);
        if (!allBeers) {
            return null;
        }

        const allBeersResult = {
            limit,
            skip,
            items: allBeers.findResult.length,
            count: allBeers.count,
            beers: allBeers.findResult
        };

        return allBeersResult;
    }
}

module.exports = new BeerService();
