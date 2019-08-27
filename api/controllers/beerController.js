const beerService = require('../../services/beerService');

class BeerController {
    async getAll(req, res) {
        const beers = await beerService.getAll(req.user.sub, req.query);
        res.json(beers);
    }

    async getById(req, res) {
        const beers = await beerService.getById(req.user.sub, req.params.id);

        if (beers) {
            res.json(beers);
        } else {
            res.status(204)
                .send();
        }
    }

    async create(req, res) {
        const createResult = await beerService.create(req.body);
        res.json(createResult);
    }

    async deleteById(req, res) {
        const deleteResult = await beerService.deleteById(req.params.id);

        if (deleteResult) {
            res.json(deleteResult);
        } else {
            res.status(204)
                .send();
        }
    }
}

module.exports.beerController = new BeerController();
