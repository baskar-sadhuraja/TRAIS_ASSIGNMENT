const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbtodo"
 });
db.connect(function (error){
    if(error)
    {
        console.log("Error Connecting to DB");
    }
    else{
        console.log("successfully connected to DB");
    }
})
app.listen(8081,function check(error)
{
    if(error)
        {
            console.log("Error...")
        }
    else{
        console.log("Started.....")
    }
});
app.post("/api/task/add",(req,res) =>{
    let dateObject = new Date();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    let details = {
        taskname: req.body.taskname,
        iscomplete: "false",
        time: date.toString()+"-"+month.toString()+"-"+year.toString()+" "+hours.toString()+":"+minutes.toString()+":"+seconds.toString()
    };
    let sql = "INSERT INTO task SET ?";
    db.query(sql,details,(error)=>{
    if(error)
    {
        console.log(error)
        res.send({status:false,message: "Student created Failed"});
    }
    else{
        res.send({ status: true,message:"student created successfully"});
    }
    });
});
app.get("/api/task", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM task";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
app.put("/api/task/update/:id", (req, res) => {
    let sql =
      "UPDATE task SET taskname='" +
      req.body.taskname +
      "'  WHERE id=" +
      req.params.id;
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send({ status: true, message: "Student Updated successfully" });
      }
    });
  });
  app.put("/api/task/check/:id", (req, res) => {
    let sql =
      "UPDATE task SET iscomplete = true WHERE id=" +
      req.params.id;
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Task Completion is Failed" });
      } else {
        res.send({ status: true, message: "Task Completion is successfully" });
      }
    });
  });
 app.delete("/api/task/delete/:id", (req, res) => {
    let sql = "DELETE FROM task WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());








