const mongoose = require('mongoose');

const BaseRepository = require('./baseRepository');
const beerRepository = require('./beerRepository');
const Favorite = require('./models/favorite');


class FavoriteRepository extends BaseRepository {
    constructor() {
        super(Favorite);
    }

    async addFavorite(userId, beerId) {
        const userFavorite = await this.findOne({ user: userId });
        const beer = await beerRepository.findOne({ _id: beerId });
        if (!beer) {
            return null;
        }
        const { ObjectId } = mongoose.Types;
        const beerObjectId = new ObjectId(beer.id);

        if (userFavorite) {
            const updateResult = await this.updateBy(
                {
                    user: userId, beers: { '!': [beerObjectId] }
                },
                {
                    $push: {
                        beers: beerId
                    }
                }
            );

            return updateResult;
        }

        const favorite = { user: userId, beers: [beerObjectId] };
        const createResult = await this.create(favorite);

        return createResult;
    }

    async removeFavorite(userId, beerId) {
        const userFavorite = await this.findOne({ user: userId });
        if (!userFavorite) {
            return null;
        }

        const updateResult = await this.updateBy(
            {
                user: userId
            },
            {
                $pull: {
                    beers: beerId
                }
            }
        );

        return updateResult;
    }
}
module.exports = new FavoriteRepository();
