import { retrieveData, insertData, patchData, putData, searchData, deleteData } from '../utils/network'
import { Transaction } from '../transactions'
import retrieve from '../utils/transactions/index'
/**s
 * Pull lists of transactions to excel
 * @function exportToExcel
 * @memberof module: api.Transactions
 * @static
 * @param {object} params -Object of parameters:
 * @param {number} params.AMId
 */

export function exportToExcel({AMId, bookId})
{
   const params ={
     AMId,
     bookId
   }
   //retrieve data from database by AMId/bookId 
   //result is an array
  /*var result = [
                 ["Type", "Estimate"],
                 ["Transportation", 1670]
                 ];*/
  var result=retrieve(params);
  //num of elements in results
  var num=result.length;
  var lastCol;
  if(num<26)
  {
    lastCol=String.fromCharCode(65+num);
  }
  else
  {
    lastCol='A'+String.fromCharCode(65+num-25);
  }
  //get access to excel 
  var ctx = new exportToExcel.RequestContext();
  Excel.run(function (ctx)
  {
    //create a proxy object for the sheet
    var sheet = ctx.workbook.worksheets.getActiveWorksheet();
    //create a proxy object for the range 
    var range = sheet.getRange("A1:"+lastCol);//for example, in fact there are 28 colnums 
    //assign array value to the proxy object's values property 
    range.values=result;
    //Synchronize the state between Javascript proxy objects and executing instructions queued on the context
    return ctx.syn().then(function(){
      console.log("Done");
    });
  }).catch(function(error){
    console.log("Error: "+error);
    if (error instanceof OfficeExtension.Error){
      console.log("Debug info: "+JSON.stringify(error.debugInfo));
    }
  });
}
