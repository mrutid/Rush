//
// Copyright (c) Telefonica I+D. All rights reserved.
//
//


/**
 * Level for logger
 * debug
 * warning
 * error
 *
 * @type {String}
 */
exports.logger = {};
exports.logger.logLevel = 'debug';
exports.logger.inspectDepth = 1 ;
exports.logger.Console = { 
    level: 'debug', timestamp:true
};
exports.logger.File ={ 
    level:'debug', filename:'pditclogger.log', timestamp:true, json:false ,
    maxsize: 100,
    maxFiles: 3
};

// redis host
exports.queue= {};
exports.queue.redis_host = 'localhost';

exports.dbrelayer = {};
exports.dbrelayer.key_prefix = 'wrH:';
exports.dbrelayer.redis_host = 'localhost';
exports.dbrelayer.logLevel = 'warning';
exports.expire_time = 60;

exports.consumer_id = "consumerA:";

exports.ev_lsnr = {};
exports.ev_lsnr.mongo_host = "localhost";
exports.ev_lsnr.mongo_port = 27017;
exports.ev_lsnr.mongo_db =  'rush';
exports.ev_lsnr.collectionState= 'RushState';
exports.ev_lsnr.collectionError= 'RushError';


