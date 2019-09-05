const mongoose = require('mongoose');
const BaseRepository = require('./baseRepository');
const Beer = require('./models/beer');

class BeerRepository extends BaseRepository {
    constructor() {
        super(Beer);
    }

    _convertPropetiesToInteger(query) {
        const integerParametrsQuery = {};
        Object.keys(query)
            .forEach((parametrKey) => {
                const parametr = query[parametrKey];
                switch (parametrKey) {
                    case 'propeties.AlcoholByVolume':
                    case 'propeties.InternationalBitternessUnits':
                    case 'propeties.ColorByEuropeanBreweryConvention':
                    case '>':
                    case '>=':
                    case '<=':
                    case '<':
                        if (parametr instanceof Object) {
                            integerParametrsQuery[parametrKey] = this._convertPropetiesToInteger(parametr);
                        } else {
                            integerParametrsQuery[parametrKey] = +parametr;
                        }
                        break;
                    default:
                        integerParametrsQuery[parametrKey] = parametr;
                }
            });

        return integerParametrsQuery;
    }

    async getAllWithFavoriteField(query, userId, limit, skip) {
        const { ObjectId } = mongoose.Types;
        const userObjectId = new ObjectId(userId);
        const localQuery = this._convertPropetiesToInteger(query);
        const agregateQuery = [
            {
                lookup: {
                    from: 'favorites',
                    let: { beer_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr:
                                {
                                    $and: [
                                        { $in: ['$$beer_id', '$beers'] },
                                        { $eq: ['$user', userObjectId] }
                                    ]
                                }
                            }
                        }

                    ],
                    as: 'id_info'
                }
            },
            {
                addFields: {
                    favorite:
                    {
                        $toBool:
                        {
                            $size: '$id_info'
                        }
                    }
                }
            },
            {
                project: {
                    id_info: 0
                }
            },
            {
                match: this._convertQuery(localQuery)
            }
        ];

        const beers = await this.findByAgregateQuery(agregateQuery, limit, skip);

        return beers;
    }

    async findById(id, userId) {
        const { ObjectId } = mongoose.Types;
        const beerIdObjectId = new ObjectId(id);
        const result = await this.getAllWithFavoriteField({ _id: beerIdObjectId }, userId);
        if (result.count === 0) {
            return null;
        }

        return result.findResult[0];
    }
}
module.exports = new BeerRepository();
