require('dotenv').config()
import request from 'superagent'
import {
  buildURL,
  retrieveData,
  insertData,
  searchData,
  putData,
  makeRequest,
  patchData,
  deleteData,
  getEndpoint} from '../utils/network/index'
import { endpoint, userPoolId, clientAppId } from '../config.js'
import fs from 'fs'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import expandTilde from 'expand-tilde'

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientAppId
})
let stage = 'staging'
let token
let credPath

/**
 * !This is an internal function that should not be called by the end user!
 * 
 * Insert csv data into database
 * @function csvUpload
 * @param {string} csv 
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 */

//var csv is the CSV file with headers
export function csvUpload({AMaaSClass, AMId, csv}, callback){
    
  let url
  try {
    url = buildURL({
      AMaaSClass,
      AMId
      //resourceId
    })
  } catch (e) {
    if (typeof callback !== 'function') {
      return Promise.reject(e)
    }
    callback(e)
    return
  }
  
  var lines=csv.split("\n");
  
  var headers=lines[0].split(","); //find headers

  for(var i=1;i<lines.length;i++)
  {
    var obj = {}; //declare object for each header
    var currentline=lines[i].split(",");

    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }

    let data;
    data=JSON.parse(JSON.stringify(obj));
    insertData({AMaaSClass, AMId, data});
  }

}
