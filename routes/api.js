var express = require('express');
var router = express.Router();
var path = require('path');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var mongoose = require('mongoose');
var Account = require('../models/Account');
var Project = require('../models/Project');
var User = require('../models/User');
var Task = require('../models/Task');
var Timesheet = require('../models/Timesheet');

var ctrlAuth = require('../config/authentication');

var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Not a valid request');
});
//==================

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
//===============================
//========== ACCOUNT ===========
//===============================

router.post('/createAccount', function(req, res, next) {
  var accData = new Account(req.body);
	accData.save(function(err, data){
    if(err){ return next(err); }
		res.json(data);
  });
});

router.get('/accounts', function(req, res, next) {
	Account.find(function(err, acc){
	    if(err){ return next(err); }
		res.json(acc);
	});
});

//===============================
//========== PROJECT ===========
//===============================

router.post('/createProject', function(req, res, next) {
  var projectdata = new Project(req.body);
  Project.count({'projectid': projectdata.projectid}, function(err, count){
    console.log("count: ", count);
    // console.error(err);
    if(count > 0){

      // console.log("Show message that project exist: ");
      // res.send({
      //           message :'Project ID/Job Code already exist!!'
      //       });
      // res.json({ status: 404, message: "Project ID/Job Code already exist!"});
      // res.send({ error: 'something blew up' });
      res.status(500).json({ error: 'Project ID/Job Code already exist' });
      // console.log(res);
     // return next(new Error("Project ID/Job Code already exist!"));
    }else{
      projectdata.save(function(err, projectdata){
        if(err){ return next(err); }
        res.json(projectdata);
      });
    }
  })
  
});

router.get('/projects', auth, function(req, res, next) {
  console.log("-------------");
  // console.log(auth);
  console.log("============");
  console.log("auth---", req.payload._id);
  Project.find(function(err, projects){
    if(err){ return next(err); }

    res.json(projects);
  }).populate('account');
});

router.get('/projectDetails/:id', function(req, res) {
  Project.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  }).populate('account');

});

router.put('/updateProject/:id', function(req, res, next) {
	Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//===============================
//========== USER ===============
//===============================

router.post('/createUser', function(req, res, next) {
  var userdata = new User(req.body);
  userdata.save(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});

router.get('/users', function(req, res, next) {
  User.find(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});

router.get('/userDetails/:id', function(req, res) {
  User.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });

});

router.put('/updateUser/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/userAssignment/:id', function(req, res) {
  //Task.find({'allocation.user': req.params.id}, 'allocation.effort', function (err, data) {
  //Task.find({'allocation.user': req.params.id, 'allocation.date': '2016-07-21T18:22:24.835Z '},  function (err, data) {
  
  // Task.find({'allocation.user': req.params.id, 'allocation.effort': 8},  function (err, data) {
  //   if (err) return next(err);
  //   res.json(data);
  // });

//   Task.aggregate([
//       { "$match": {
//         "project" : '57a851ad299fc4b879ffa9dd'
//     }}
//     ], function (err, results) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(results);
//         }
//     }
// );


});
//http://localhost:3000/api/userAssignment/578a61f4bd637e711c889c5f
//===============================
//========== Task ===============
//===============================

router.post('/createTask', function(req, res, next) {
  var taskdata = new Task(req.body);
  taskdata.save(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});

router.get('/tasks', function(req, res, next) {
  Task.find(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  }).populate('project')
});

router.get('/taskDetails/:id', function(req, res) {
  Task.findById(req.params.id, function (err, data) {
   
    if (err) return next(err);
    res.json(data);
  }).populate('project').populate('allocation.user');

});

router.put('/updateTask/:id', function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/tasksByProject/:projectid', function(req, res) {
  Task.find({'project': req.params.projectid}, function (err, data) {
   if (err) return next(err);
    // console.log(data);
    res.json(data);
  });

});

//===============================
//========== Assignment ===============
//===============================




//===============================
//========== Timesheet ===========
//===============================

router.post('/createTimesheet', function(req, res, next) {
  var tData = new Timesheet(req.body);
  tData.save(function(err, data){
    if(err){ return next(err); }
    res.json(data);
  });
});

router.get('/timesheets', function(req, res, next) {
  Timesheet.find(function(err, tData){
      if(err){ return next(err); }
    // res.json(tData);
  }).populate('user', 'name').populate('task', 'project name')
  .exec(function(err, tData){
     if(err){ return next(err); }
     Timesheet.populate(tData, {
      path: 'task.project',
      select: 'projectid projectname',
      model: 'Project'
     }, 
      function(err, allData){
        if(err){ return next(err); }
        // console.log(allData);
         res.json(allData);
      })
  })
});

//===============================
//========== Donwload ===========
//===============================






router.post('/downloadTimesheet232', function(req, res) {
  // console.log(req.body);
var data = req.body
var csvData = "Date,Effort,Resource Name,Job Code,Project Name,Task Name \n"

// console.log(dt.getDate()+"-"+dt.getMonth()+"-"+dt.getFullYear());
for(var i=0; i<data.length; i++){
  var dt = new Date(data[0].date);
  csvData += (dt.getDate()+"-"+dt.getMonth()+"-"+dt.getFullYear())+","+data[i].effort+","+data[i].user.name+","+data[i].task.project.projectid+","+data[i].task.project.projectname+","+data[i].task.name+"\n"
  
}
// console.log(csvData);
  // var data = "Pooja,,RD,Subu \n F,,M,M";
  fs.writeFile('timesheets.csv', csvData, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("File write successfully!!");
      res.json({"message" : "File saved!"})
      // console.log(res);
      // res.download('timesheets.csv');
      // res.download('test8.csv');
      // res.download(path.resolve(__dirname, 'timesheets.csv'), 'timesheets.csv');
    }
  });

  // res.download('test6.csv', 'test6.csv', function(err){
  //   if (err) {
  //     console.log(err);
  //     // Handle error, but keep in mind the response may be partially-sent
  //     // so check res.headersSent
  //   } else {
  //     // decrement a download credit, etc.
  //   }
  // });

});

router.get('/downloadTimesheet', function(req, res, next) {
  Timesheet.find(function(err, tData){
      if(err){ return next(err); }
    // res.json(tData);
  }).populate('user', 'name').populate('task', 'project name')
  .exec(function(err, tData){
     if(err){ return next(err); }
     Timesheet.populate(tData, {
      path: 'task.project',
      select: 'projectid projectname',
      model: 'Project'
     }, 
      function(err, data){
        if(err){ return next(err); }
        // console.log(data);
        var csvData = "Date,Effort,Resource Name,Job Code,Project Name,Task Name \n"
        // console.log(dt.getDate()+"-"+dt.getMonth()+"-"+dt.getFullYear());
        for(var i=0; i<data.length; i++){
          var dt = new Date(data[i].date);
          var dt2 = dt.getDate()+"-"+dt.getMonth()+"-"+dt.getFullYear();
          console.log(dt2);
          csvData += dt2+","+data[i].effort+","+data[i].user.name+","+data[i].task.project.projectid+","+data[i].task.project.projectname+","+data[i].task.name+"\n"
          
        }
        fs.writeFile('timesheets.csv', csvData, function(err){
            if(err){
              console.log(err);
            }else{
              console.log("File write successfully!!");
              // res.json({"message" : "File saved!"})
              // console.log(res);
              res.download('timesheets.csv');
              // res.download('test8.csv');
              // res.download(path.resolve(__dirname, 'timesheets.csv'), 'timesheets.csv');
            }
          });

      })
  })




  // var data2 = "PoojaK,,RDX,Subodh \n F,,M,M";
  // fs.writeFile('temp.csv', data2, function(err){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     res.download('temp.csv');
  //   }
  // });
  
});
//===============================
//========== Donwload ===========
//===============================

// router.param('projectid', function(req, res, next, id) {
//   var query = Project.findById(id);

//   query.exec(function (err, prj){
//     if (err) { return next(err); }
//     if (!prj) { return next(new Error('can\'t find project')); }

//     req.prj = prj;
//     return next();
//   });
// });

//curl --data 'projectid=1501&projectname=AOL Capital One&account=Sizmek' http://localhost:3000/api/setData

//curl --data 'name=Siz&status=1' http://localhost:3000/api/createAccount
// http://localhost:3000/api/tasksByProject/578b579957dc2cba328b05ca



module.exports = router;
