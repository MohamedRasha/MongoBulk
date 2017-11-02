var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/DWS');

var ARSchema=new Schema({

    ReportId: {
        type: Number
    },
    WorkBookId: {
        type: Number
    }
});
var AnalysisAndReportsSchema = new Schema({
    ObjectUniqueId:{
        type: String
    },
    EntityType: {
        type: Number
    },
    ReportId: {
        type: Number
    },
    WorkBookId: {
        type: Number
    },
    Size: {
        type: Number
    },
    ReportName: {
        type: String
    },
    ReportType: {
        type: String
    },
    ReportStatus: {
        type: String
    },
    ReportUrl: {
        type: String
    },
    ReportDate: {
        type: Date
    },
    LastViewDate: {
        type: Date
    },
    DataFilterList: [
        {
            Name: {
                type: String
            },
            Values: [{
                type: String
            }]
        }
    ],
    DatasetUrl: {
        type: String
    },
    DataSetId: {
        type: Number
    },
    DataSetLastViewDate: {
        type: Date
    },
       
        
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('AnalysisReports', AnalysisAndReportsSchema);

