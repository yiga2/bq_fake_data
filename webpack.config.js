const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bq_fake.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'fakerbq',
  },
  mode: 'production',
};
