const BaseRepository = require('./baseRepository');
const Beer = require('./models/beer');
const favoriteRepository = require('./favoriteRepository');

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
                                        { $eq: ['$user', userId] }
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
        const findResult = await this.Model.findById(id);
        if (!findResult) {
            return null;
        }
        const favorites = favoriteRepository.getAll({ beers: findResult.id, user: userId });
        if (favorites) {
            findResult.favorite = true;
        } else {
            findResult.favorite = false;
        }

        return findResult;
    }
}
module.exports = new BeerRepository();
