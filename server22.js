var mongoose = require('mongoose');
var departmentModel = require("./collections/department");
var StudentModel = require('./collections/student');
//connection on DB
mongoose.connect('mongodb://localhost:27017/UI');


StudentModel.find({ name: /^A/ }).then(_result => console.log(_result))



// StudentModel.findByIdAndRemove('58f9cf908c78ed1aecef124f')
//     .then(_result => console.log(_result))



// StudentModel
//     .findByIdAndUpdate('58f9ce740a3e4d13205c6f01',
//     { name: 'Ayman Youssef' }).then(_result => console.log(_result));

// StudentModel.update({ name: 'Ahmed Alaa' },
//     { title: 'eslam' }, { upsert: true }
// ).then(_result => console.log(_result));

// StudentModel.find({
//      age: { $gt: 0, $lte: 20 } 
//     }).then(_result => {
//     console.log(JSON.stringify(_result, undefined, 2));
// })



// var _department = new departmentModel({
//     name: 'UI_FrontEnd',
//     createdAt: new Date(),
//     students: ["58f9ce740a3e4d13205c6f01", "58f9cf908c78ed1aecef124f"]
// }).save();


// var _student = new StudentModel({
//     name: 'Mohamed',
//     age: '20',
//     createdAt: new Date(),
//     address: '74n hbhfe',
//     department: '58f9f6055332c715d47d1271'
// })

// _student.save()
//     .then(function (result) {
//         console.log(result);
//     }).catch(err => console.log(err));




// StudentModel.find({}).populate({
//     path: 'department',
//     select: 'name students -_id',
//     populate: {
//         path: 'students',
//         select: 'name -_id'
//     }
// }).then(_result => console.log(JSON.stringify(_result, undefined, 2)));


// departmentModel.find({})