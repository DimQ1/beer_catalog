const BaseRepository = require('./baseRepository');
const Favorite = require('./models/favorite');

class FavoriteRepository extends BaseRepository {
    constructor() {
        super(Favorite);
    }
}
module.exports = new FavoriteRepository();
