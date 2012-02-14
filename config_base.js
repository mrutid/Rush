
// redis host
exports.queue= {};
exports.queue.redis_host = '10.95.8.182';

exports.dbrelayer = {}
exports.dbrelayer.key_prefix = 'wrH:';
exports.dbrelayer.redis_host = '10.95.8.182';
exports.dbrelayer.expire_time = 60;

exports.logger = {};
exports.logger.BUFFER_SIZE = 1000;
exports.logger.PORT = 3081;

exports.stats = {};
exports.stats.PORT = 3080;
