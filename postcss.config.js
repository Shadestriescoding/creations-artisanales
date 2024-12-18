module.exports = {
    plugins: [
        require('postcss-preset-env')({
            stage: 3,
            features: {
                'nesting-rules': true,
                'custom-media-queries': true,
                'media-query-ranges': true
            },
            autoprefixer: {
                grid: true
            }
        }),
        process.env.NODE_ENV === 'production' && require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
                normalizeWhitespace: false,
            }]
        })
    ].filter(Boolean)
}; 