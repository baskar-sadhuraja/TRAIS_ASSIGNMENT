import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray: any[]=[];
  isResultLoaded = false;
  isUpdateFormActive = false;
  taskname: string = "";
  iscompleted: string = "false";
  isUpdateInProgress = false;
  checkboxValue: string = "0";
  time: string = "";
  currentTaskId = "";
  apiSubscription: any;
  constructor(private http: HttpClient){
    this.getAllTask();
  }
  ngOnInit(): void {
      
  }
  getAllTask()
  { 
    this.http.get("http://localhost:8081/api/task/")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.taskArray = resultData.data;
    });
  }
  register()
  {
   // this.isLogin = false; 
    let bodyData = {
      "taskname" : this.taskname,
    };
    this.http.post("http://localhost:8081/api/task/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Registered Successfully")
        this.getAllTask();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
  setUpdate(data: any) 
  {
   this.taskname = data.taskname;
  
   this.currentTaskId = data.id;
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "taskname" : this.taskname,
    };
    
    this.http.put("http://localhost:8081/api/task/update"+ "/"+ this.currentTaskId,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Registered Updateddd")
        this.getAllTask();
    });
    
  }
  save()
  {
    if(this.currentTaskId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
       this.getAllTask();
      }
           
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8081/api/task/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Deletedddd")
        this.getAllTask();
    });
  }
  oncheck(id: any){
    this.http.put("http://localhost:8081/api/task/check"+ "/"+ id,{}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Task Completed")
        
    });

  }

  
}
 


  