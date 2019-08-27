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

        if (beers) {
            res.json(beers);
        } else {
            res.status(204)
                .send();
        }
    }

    async create(req, res) {
        const { body } = req;

        const createResult = await beerService.create(body);
        res.json(createResult);
    }

    async deleteById(req, res) {
        const { params } = req;

        const deleteResult = await beerService.deleteById(params.id);

        if (deleteResult) {
            res.json(deleteResult);
        } else {
            res.status(204)
                .send();
        }
    }
}

module.exports.beerController = new BeerController();
