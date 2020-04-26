const env = process.env.type;// build/dev
const ENV_DEV = 'dev';
const ENV_BUILD = 'build';

exports.isDev = () => env === ENV_DEV
exports.isBuild = () => env === ENV_BUILD
