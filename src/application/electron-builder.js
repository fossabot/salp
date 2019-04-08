module.exports = {
    'productName': 'salp',
    'appId': 'de.hsd.salp',
    'extraMetadata': {
        'name': 'salp'
    },
    'publish': false,
    'files': [
        'src/',
        {
            'from': 'node_modules/@salp/frontend/dist/',
            'to': 'frontend'
        },
        {
            'from': 'node_modules/@salp/course-sandbox/dist/',
            'to': 'course-sandbox'
        },
        {
            'from': 'node_modules/salp-course-example/dist/',
            'to': 'courses/salp-course-example'
        },
        {
            'from': 'node_modules/salp-course-heartbleed/dist/',
            'to': 'courses/salp-course-heartbleed'
        }
    ],
    'extraFiles': [
        {
            'from': 'build/generated/ThirdPartyNotices.txt',
            'to': 'ThirdPartyNotices.txt'
        }
    ]
}
