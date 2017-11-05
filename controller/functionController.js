var mongo = require('mongoose');
var $ = require('jquery');
var mongodbResult;
var reportList = [];
var _ = require('underscore');

var yargs = require('yargs');
var FinalResult = [];
var request = require('request');
var globalFunc = require('../Helper/GlobalFunc');
var ARCon=require('../Collection/ARCollection');
console.log(yargs.argv)
// var AnlysisReportsModel = require('../Collection/ARCollection');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/DWS";
var GenerateSchema = require('generate-schema')
var Schema = mongo.Schema;
var Protocols=[];
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   db.collection("AnalysisReports").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

mongo.connect('mongodb://localhost:27017/DWS');



function arrayss(arr) {
    let stringArray = "[";
    if (arr.length > 0) {
        let stringArray = "[";
        arr.forEach(function(element) {
            stringArray += "'" + element + "',";
        })

        stringArray = stringArray.slice(0, -1);

        stringArray += "]";

        return stringArray
    } else {
        return "[]";
    }
}

function GetProtocols(req, res) {
 

    if (req.body.DefaultView == true) {
        console.log("Hooooooooooooooooo")
        mongo.connection.db.eval("GetUserReports('2016-01-01','2020-01-01','RASHA.SAYED','CP',0,10000)")
            .then(function(_res) {
                Protocols=[];
                Protocols=_res;
           //     tests(_res)

                res.status(201).send({ ProtocolCount: FinalResult.ProtocolCount, ReportCount: FinalResult.ReportCount, Reports: FinalResult.Reports })
            }).catch(function(reason) {
                console.log(reason)
            });

    } else {

        let NeededByFrom = null
        if ((req.body.NeededByFrom)) {
            let reqNeededByFrom = new Date(req.body.NeededByFrom);
            NeededByFrom = `'${reqNeededByFrom.toISOString()}'`
         }
        let NeededByTo = null;
        console.log(req.body.NeededByTo)

        if ((req.body.NeededByTo)) {


            console.log(req.body.NeededByTo)
            let reqNeededByTo = new Date(req.body.NeededByTo);
            console.log(reqNeededByTo)

            console.log(new Date(reqNeededByTo).getDate())

            reqNeededByTo = new Date(reqNeededByTo).setDate(reqNeededByTo.getDate() + 1);
            console.log(new Date(reqNeededByTo))

            reqNeededByTo = new Date(reqNeededByTo).setMilliseconds(-1)
            console.log(reqNeededByTo)

            reqNeededByTo = new Date(reqNeededByTo);
            console.log(reqNeededByTo)

            console.log(reqNeededByTo.getHours())

            // NeededByTo = `${reqNeededByTo.getFullYear()}-${reqNeededByTo.getMonth()+1}-${reqNeededByTo.getDate()} ${reqNeededByTo.getHours()}:${reqNeededByTo.getMinutes()}:${reqNeededByTo.getMilliseconds()}`
            NeededByTo = `'${reqNeededByTo.toISOString()}'`

            console.log(NeededByTo)
        }
        let ShortNames = [];
        let FunctionMessage = ` FilterReports('2016-01-01','2020-01-01','${req.body.BusinessUnit}',
        ${NeededByFrom},${NeededByTo},${arrayss(req.body.ShortNames)},${arrayss(req.body.TrialStartYears)}
       ,${arrayss(req.body.Disciplines)},${arrayss(req.body.Owners)},${arrayss(req.body.Contributors)},${arrayss(req.body.Reviewers)},${arrayss(req.body.Regions)},${arrayss(req.body.Territories)},${arrayss(req.body.Countries)},0,5000)`;
        console.log('"' + FunctionMessage + '"')
        mongo.connection.db.eval(FunctionMessage)
            .then(function(_res) {
                Protocols=[];
                Protocols=_res;
                console.log("Hooooooooooooooosdsdoo")
                
               // tests(_res, req.body.UserId)

              //  res.status(201).send({ ProtocolCount: FinalResult.ProtocolCount, ReportCount: FinalResult.ReportCount, Reports: FinalResult.Reports })
            GetReports(req,res)
            })



    }

}

 function GetReports(req, res) {

    // ARCon.find({}).then(function(_res){
    // console.log(JSON.stringify(_res,undefined,2));
    // res.status(200).send({ reports: _res})
// }
//   )

      MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("AnalysisReportsOLD").find({}).toArray( function(err, _res) {

    if (err) throw err;
    Reports=[];
    Reports=_res; 
    console.log(Protocols.length)
   // Aggregate(Protocols,Reports)
    res.status(200).send({ reports: Aggregate(Protocols,Reports)})
    db.close();
  });
});
 

  
}
function search(nameKey, myArray){
   
    for (var i=0; i < myArray.length; i++) {
        
        if (myArray[i].Name === nameKey) {
            return myArray[i].Values;
            
        }
        else{
            return null 
        }
    }
}
var output=[];
function Aggregate(protocolListDTO , analysisListDTO){
  
    count=1;
     console.log("Aggregate",protocolListDTO.length)
  console.log("Aggregate",analysisListDTO.length)
    
    for (var   report of analysisListDTO)
    {
        for (let protocol of protocolListDTO)
     
      {
       let x =   search("Protocol",report.DataFilterList)
if(x){
   
    if(_.contains(x,protocol.ShortName))
    output.push(
        {
            ProtocolId: protocol.ProtocolId,
            
                        ProtocolTitle: protocol.Title,
            
                        ProtocolShortName: `<a href='${ProtocolURL}${globalFunc.ExtractNumberWithoutZeroAtEndOfString(
                            protocol.ProtocolId)}'target='_blank'>${protocol.ShortName}</a> `,
                        ProtocolOwner: protocol.OwnedBy != null ? protocol.OwnedBy.FirstName +
                            " " + protocol.OwnedBy.LastName : "",
                        Countries: globalFunc.ConvertArrayToString(protocol.ConfirmedDistributionList, "Country", "Name", ","),
                        BusinessUnit: protocol.BusinessUnit,
                        NumberOfTrials: protocol.BusinessUnit.toLocaleLowerCase() == "CP".toLocaleLowerCase() ?
                            globalFunc.GetItemCount(protocol.ConfirmedDistributionList, "ConfirmedDemand") : GetItemCount(protocol.ConfirmedDistributionList, "NumberOfTrials"),
                        Targets: globalFunc.ConvertArrayToString(protocol.ProtocolTargetList, "Target", "Name", ","),
                        Crops: globalFunc.ConvertArrayToString(protocol.ConfirmedDistributionList, "Crops", "Name", ","),
                        Discipline: protocol.Discipline != null ? protocol.Discipline ? protocol.Discipline.Name : "" : "",
                        PiLeadAi: globalFunc.ConvertArrayToString(
                            protocol.ActivityList, 'PILeadAI', "", ","),
                        ReportName: `${report.ReportName},${report.ReportUrl},${report.WorkBookId},${report.ReportId}`,
                        // DatasetUrl: `${ globalFunc.ConvertArrayToString(item.Reports,"DataSetId","",",")},${
                        //         globalFunc.ConvertArrayToString(item.Reports,"DatasetUrl","",",")}`,
                        // ReportId: globalFunc.ConvertArrayToString(item.Reports, "ReportId", "", ","),
                        // ReportType: globalFunc.ConvertArrayToString(item.Reports, "ReportType", "", ","),
                        // ReportStatus: globalFunc.ConvertArrayToString(item.Reports, "ReportStatus", "", ","),
                        // DataFilter: `${globalFunc.ConvertArrayToString(item.Reports[0].DataFilterList,"Name","","/")}:${globalFunc.GetItemCount(item.DataFilterList,"Name")}`,
                        // LastViewDate: item.Reports[0].LastViewDate ? (item.Reports[0].LastViewDate.filter(dd => dd.UserId == userId))[0] : null ? (item.Reports[0].LastViewDate.filter(dd => dd.UserId == "RASHA.SAYED"))[0].Date : null
                   
           
           
        }

    )
}
   
}
}


console.log(output.length,"lk")
return output
}

function AddMany(req,res){


}
var ProtocolURL = "http://syngenta1.dev.intra/BioDesign/Protocol/{0}/Overview/Setup";




function tests(res, userId) {
    //console.log("res", res)

    FinalResult = [];
    reportList = [];
    FinalResult.Reports = [];
    let getAllreports = [];
    let ProtocolIds = []
    res.forEach(function(elem) { getAllreports.push(elem.Reports) })
    
    // for (let i = 0; i < getAllreports.length; i++) {

    //     ProtocolIds[i] = getAllreports[i][0].ReportId;
    // }
    FinalResult.ReportCount = _.unique(ProtocolIds).length;

    FinalResult.ProtocolCount = res.length;
    console.log("res", res.length)

    for (item of res) {

        // console.log(item.OwnedBy)
        reportList.push({
            ProtocolId: item.ProtocolId,

            ProtocolTitle: item.Title,

            ProtocolShortName: `<a href='${ProtocolURL}${globalFunc.ExtractNumberWithoutZeroAtEndOfString(
                item.ProtocolId)}'target='_blank'>${item.ShortName}</a> `,
            ProtocolOwner: item.OwnedBy != null ? item.OwnedBy.FirstName +
                " " + item.OwnedBy.LastName : "",
            Countries: globalFunc.ConvertArrayToString(item.ConfirmedDistributionList, "Country", "Name", ","),
            BusinessUnit: item.BusinessUnit,
            NumberOfTrials: item.BusinessUnit.toLocaleLowerCase() == "CP".toLocaleLowerCase() ?
                globalFunc.GetItemCount(item.ConfirmedDistributionList, "ConfirmedDemand") : GetItemCount(item.ConfirmedDistributionList, "NumberOfTrials"),
            Targets: globalFunc.ConvertArrayToString(item.ProtocolTargetList, "Target", "Name", ","),
            Crops: globalFunc.ConvertArrayToString(item.ConfirmedDistributionList, "Crops", "Name", ","),
            Discipline: item.Discipline != null ? item.Discipline ? item.Discipline.Name : "" : "",
            // PiLeadAi: globalFunc.ConvertArrayToString(
            //     item.ActivityList, 'PILeadAI', "", ","),
            // ReportName: `${globalFunc.ConvertArrayToString(item.Reports,"ReportName","",",") },${
            //         globalFunc.ConvertArrayToString(item.Reports,"ReportUrl","",",")},${
            //             globalFunc.ConvertArrayToString(item.Reports,"WorkBookId","",",") },${
            //                 globalFunc.ConvertArrayToString(item.Reports,"ReportId","",",")}`,
            // DatasetUrl: `${ globalFunc.ConvertArrayToString(item.Reports,"DataSetId","",",")},${
            //         globalFunc.ConvertArrayToString(item.Reports,"DatasetUrl","",",")}`,
            // ReportId: globalFunc.ConvertArrayToString(item.Reports, "ReportId", "", ","),
            // ReportType: globalFunc.ConvertArrayToString(item.Reports, "ReportType", "", ","),
            // ReportStatus: globalFunc.ConvertArrayToString(item.Reports, "ReportStatus", "", ","),
            // DataFilter: `${globalFunc.ConvertArrayToString(item.Reports[0].DataFilterList,"Name","","/")}:${globalFunc.GetItemCount(item.DataFilterList,"Name")}`,
            // LastViewDate: item.Reports[0].LastViewDate ? (item.Reports[0].LastViewDate.filter(dd => dd.UserId == userId))[0] : null ? (item.Reports[0].LastViewDate.filter(dd => dd.UserId == "RASHA.SAYED"))[0].Date : null
        })


    }
    // console.log("NewObject.length", newObject.length)
    // fs.writeFile('x.txt', JSON.stringify(newObject, undefined, 2), function(err) {

    // });
    console.log("Finished")
    FinalResult.Reports = reportList;
    return FinalResult;
}

module.exports = { GetProtocols: GetProtocols, GerReports:GetReports };


   