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
    _id: {type: mongoose.Schema.ObjectId, select: false},
    __v: {type: Number, select: false},
        
 },{ collection : 'AnalysisReports_copy' } );
AnalysisAndReportsSchema.set('collection', 'AnalysisReports_copy');
var collectionName = 'AnalysisReports_copy'

module.exports = mongoose.model("analysisReports_copy", AnalysisAndReportsSchema);

