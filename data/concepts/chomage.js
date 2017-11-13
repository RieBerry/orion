exports.node = {
    name: 'Chomage',
    modules: [
        {
            type: 'definition',
            data_identifiers: ['chomage_bit'],
        }, {
            type: 'definition',
            data_identifiers: ['chomage_pole_emploi'],
        }, {
            type: 'timeseries',
            data_identifiers: ['chomage_insee', 'chomage_pole_emploi'],
            options: {
                relativisable: true,
                data_identifiers: ['population_totale']
            },
        }
    ]
}

exports.links = [
    'emploi'
]

exports.suggestions = [
    'apprenti'
]
