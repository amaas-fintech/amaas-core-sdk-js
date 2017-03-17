'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildURL = buildURL;
exports.retrieveData = retrieveData;
exports.insertData = insertData;
exports.putData = putData;
exports.patchData = patchData;
exports.deleteData = deleteData;
exports.searchData = searchData;

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { baseURL } from './constants.js'
// import * as types from '../../core/types.js'
require('dotenv').config();

/***
 * !This is an internal function that should not be called by the end user!

 * Builds a URL for HTTP request
 * @param {object} anonymous: anonyous object with arguments:
 * @param {string} type: type of HTTP request (GET, POST, etc). Used for validation of parameters
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
function buildURL(_ref) {
  var AMaaSClass = _ref.AMaaSClass,
      AMId = _ref.AMId,
      resourceId = _ref.resourceId;

  var baseURL = void 0;
  switch (AMaaSClass) {
    case 'book':
      // baseURL = process.env.booksURL
      baseURL = _config2.default.books + '/books';
      break;
    case 'parties':
      // baseURL = process.env.partiesURL
      baseURL = _config2.default.parties + '/parties';
      break;
    case 'assetManagers':
      baseURL = _config2.default.assetManagers + '/asset_managers';
      break;
    case 'assets':
      baseURL = _config2.default.assets + '/assets';
      break;
    case 'positions':
      baseURL = _config2.default.transactions + '/positions';
      break;
    default:
      // baseURL = process.env.booksURL
      baseURL = _config2.default.books + '/books';
  }
  if (!AMaaSClass) {
    throw new Error('Class is required to build URL');
  } else if (!AMId) {
    return baseURL + '/';
  } else if (!resourceId) {
    return baseURL + '/' + AMId;
  } else {
    return baseURL + '/' + AMId + '/' + resourceId;
  }
}

/***
 * !This is an internal function that should not be called by the end user!
 * !Wrapper functions are exposed for the individual asset classes for consumption!

 * Base function for retrieval of data from the database (GET request)
 * @param {object} anonymous: anonymous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} resourceId: Id of the resource being requested (e.g. book_id)
*/
function retrieveData(_ref2, callback) {
  var AMaaSClass = _ref2.AMaaSClass,
      AMId = _ref2.AMId,
      resourceId = _ref2.resourceId;

  // callback(err, result)
  // Class and AMId needed to build the Url and for authorization
  if (!AMaaSClass || !AMId) {
    throw new Error('Both class and AMId are required');
  }
  // If resourceId is supplied, append to url. Otherwise, return all data for AMId
  var url = buildURL({ AMaaSClass: AMaaSClass, AMId: AMId, resourceId: resourceId });
  // const url = resourceId ? `${baseURL}${AMaaSClass}/${AMId}/${resourceId}` : `${baseURL}${AMaaSClass}/${AMId}/`

  _superagent2.default.get(url).set('Authorization', 'CHNaS6Kuk9A5wAmV86PnKQJxp0WKwwL2OgqFYYYBBxSDwIKA60ibFQDYFmPokMOl').end(function (error, response) {
    if (!error && response.status == 200) {
      callback(null, response.body);
    } else {
      var statusCode = response ? response.status : '';
      var requestError = {
        statusCode: statusCode,
        error: error
      };
      callback(requestError);
    }
  });
}

/***
 * !This is an internal function that should not be called by the end user!
 * !Wrapper functions are exposed for the individual asset classes for consumption!

 * Base function for insertion of data to the database (POST request)
 * @param {object} anonymous: anonymous object with arguments:
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 * @param {string} data: data to insert into database
*/
function insertData(_ref3, callback) {
  var AMaaSClass = _ref3.AMaaSClass,
      AMId = _ref3.AMId,
      data = _ref3.data;

  // if (!AMaaSClass || !AMId || !data) {
  //   throw new Error('Class, AMId and data to insert are required')
  // }
  var url = buildURL({
    AMaaSClass: AMaaSClass,
    AMId: AMId
  });
  // Data is object with required key value pairs for that class
  // const am = 'asset_manager_id'
  // data[am] = AMId
  var params = {
    url: url,
    json: data
  };
  _superagent2.default.post(url).send(data).end(function (error, response) {
    _networkCallback(error, response, response.body, callback);
  });
}

function putData(_ref4, callback) {
  var AMaaSClass = _ref4.AMaaSClass,
      AMId = _ref4.AMId,
      resourceId = _ref4.resourceId,
      data = _ref4.data;

  var url = buildURL({
    AMaaSClass: AMaaSClass,
    AMId: AMId,
    resourceId: resourceId
  });
  var params = {
    url: url,
    json: data
  };
  _superagent2.default.put(url).send(data).end(function (error, response) {
    _networkCallback(error, response, response.body, callback);
  });
}

function patchData(_ref5, callback) {
  var AMaaSClass = _ref5.AMaaSClass,
      AMId = _ref5.AMId,
      resourceId = _ref5.resourceId,
      data = _ref5.data;

  var url = buildURL({
    AMaaSClass: AMaaSClass,
    AMId: AMId,
    resourceId: resourceId
  });
  var params = {
    url: url,
    json: data
  };
  _superagent2.default.patch(url).send(data).end(function (error, response) {
    _networkCallback(error, response, response.body, callback);
  });
}

function deleteData(_ref6, callback) {
  var AMaaSClass = _ref6.AMaaSClass,
      AMId = _ref6.AMId,
      resourceId = _ref6.resourceId;

  var url = buildURL({
    AMaaSClass: AMaaSClass,
    AMId: AMId,
    resourceId: resourceId
  });
  _superagent2.default.delete(url).end(function (error, response) {
    _networkCallback(error, response, response.body, callback);
  });
}

function searchData(_ref7, callback) {
  var AMaaSClass = _ref7.AMaaSClass,
      queryKey = _ref7.queryKey,
      queryValue = _ref7.queryValue;

  var url = buildURL({
    AMaaSClass: AMaaSClass
  });
  var qString = {};
  var qValueString = queryValue.join();
  qString[queryKey] = qValueString;
  var params = {
    url: url,
    qs: qString
  };
  _superagent2.default.get(url).query(qString).end(function (error, response) {
    _networkCallback(error, response, response.body, callback);
  });
}

function _networkCallback(error, response, body, callback) {
  if (!error && response.status === 200) {
    callback(null, body);
  } else if (error) {
    callback(error);
  } else {
    callback({ response: response, body: body });
  }
}