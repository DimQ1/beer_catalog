const beerService = require('../../services/beerService');


class BeerController {
    async getAll(req, res) {
        const { query } = req;
        const { user } = req;

        const beers = await beerService.getAll(query, user.sub);
        res.json(beers);
    }

    async getById(req, res) {
        const { params } = req;
        const { user } = req;

        const beers = await beerService.getById(params.id, user.sub);
        res.json(beers || { result: 'Not found!' });
    }

    async create(req, res) {
        const { body } = req;

        const createResult = await beerService.create(body);
        res.json(createResult);
    }

    async deleteById(req, res) {
        const { params } = req;

        const deleteResult = await beerService.deleteById(params.id);
        res.json(deleteResult || { result: 'Not found!' });
    }
}

module.exports.beerController = new BeerController();
