import fs from 'fs'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import expandTilde from 'expand-tilde'
//import {insert} from '../utils/parties'
import Party from '../parties/Party/party'
import Book from '../books/Book/book'
import Asset from '../assets/Asset/asset'
import Relationship from '../relationships/Relationship/index'
import Transaction from '../transactions/Transaction/transaction'
import AssetManager from '../assetManagers/AssetManager/assetManager'
import {insertData} from '../utils/network'

/**
 * !This is an internal function that should not be called by the end user!
 * 
 * Insert csv data into database
 * @function csvUpload
 * @param {string} csv 
 * @param {string} AMaaSClass: class being requested/sent (e.g. Transaction) (required)
 * @param {string} AMId: Asset Manager Id (required)
 */

//var csv is the string
export function csvUpload({AMaaSClass, AMId, csv}, callback){
  //convert csv string to json format
  var insertedCsv=[];
  var lines=csv.split("\n"); 
  var headers=lines[0].split(", "); //find headers

  for(var i=1;i<lines.length;i++)
  {
    var obj = {}; //declare object for each header
    var currentline=lines[i].split(", ");

    for(var j=0;j<headers.length;j++)
    {
      if(isNaN(currentline[j]))
      obj[headers[j]] = currentline[j];//obj is a key-value pair obj
      else 
      obj[headers[j]] = parseInt(currentline[j]);

    }

    const params ={AMaaSClass, AMId, obj}; 
    //testing
    for(var j=0;j<headers.length;j++)
    {
       console.log(Object.keys(obj)[j]+" : "+Object.values(obj)[j]);
    }

    switch (AMaaSClass){ //case should match buildURL
        case "parties": 

                     let promiseParty = insertData(params).then(result => {
                     result = _parseParty(result)
                     if (typeof callback === 'function') {
                        callback(null, result)
                     }
                        return result
                     })
                     if (typeof callback !== 'function') {
                        return promiseParty
                     }
                     promiseParty.catch(error => callback(error))
                     break;

         case "assets": 

                     let promiseAsset = insertData(params).then(result => {
                     result = _parseAsset(result)
                     if (typeof callback === 'function') {
                     callback(null, result)
                     }
                        return result
                     })
                     if (typeof callback !== 'function') {
                        return promiseAsset
                     }
                     promiseAsset.catch(error => callback(error))
                     break;

          case "book":
                    
                     let promiseBook = insertData(params).then(result => {
                     result = _parseBook(result)
                     if (typeof callback === 'function') {
                     callback(null, result)
                     }
                       return result
                     })
                     if (typeof callback !== 'function') {
                       return promiseBook
                     }
                     promiseBook.catch(error => callback(error))
                     break;

            case "relationships":
                    
                     let promiseRelationship = insertData(params).then(result => {
                     result = _parseRelationship(result)
                     if (typeof callback === 'function') {
                     callback(null, result)
                     }
                        return result
                     })
                     if (typeof callback !== 'function') {
                        return promiseRelationship
                     }
                     promiseRelationship.catch(error => callback(error))
                     break;
                    
             case "transactions":
                     
                     let promiseTransaction = insertData(params).then(result => {
                     result = _parseTransaction(result)
                     if (typeof callback === 'function') {
                     callback(null, result)
                     }
                        return result
                     })
                     if (typeof callback !== 'function') {
                        return promiseTransaction
                     }
                     promiseTransaction.catch(error => callback(error))
                     break;

            default: console.log("no such class");    

    }  
  }

}
