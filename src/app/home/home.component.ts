import { Component, OnInit } from '@angular/core';
import {RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
name='';
token='';
message='';
data:any;
page=1;
total='';
loggedin=false;
  constructor(private restService:RestService,private router:Router) {
    let user=localStorage.getItem('user');
    let userjson=JSON.parse(user);
    this.token=localStorage.getItem('token');
    this.name=userjson.f_name+' '+userjson.l_name;
    if(this.token){
      this.loggedin=true;
    }
    else{
      this.router.navigate(['/login']);
    }

   }


  ngOnInit() {
    this.restService.getbuckets(this.token,1).then(data=>{
      let rs=JSON.parse(JSON.stringify(data));
      this.data=rs.buckets;
      this.total=rs.total;
      this.page=parseInt(rs.pagenum);
      console.log(rs);
    });
  }

  createBucket(){
    var name = prompt("Please enter bucket name", "Bucketlist");
    this.restService.createbucket(this.token,name).then(data=>{
      this.message=data[0];
    });
  }

  editbucket(bid){
    var name = prompt("Please enter new name for bucket", "Bucketlist");
    this.restService.editbucket(this.token,bid,name).then(data=>{
      this.message=data[0];
    });
  }

  deletebucket(bid){
    var r = confirm("Are you sure you want to delete this bucket?");
    if (r == true) {
      this.restService.deletebucket(this.token,bid).then(data=>{
        this.message=data[0];
      });
    } else {
        this.message = "Deletion cancelled";
    }
    
  }

  setlimit(){
    var limit = prompt("Enter limit", "5");
    if(!(limit=='')){
      localStorage.setItem('limit',limit);
    }
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  next(page,total){
    if(page<total){
      page+=1;
    }
    this.restService.getbuckets(this.token,page).then(data=>{
      let rs=JSON.parse(JSON.stringify(data));
      this.data=rs.buckets;
      this.total=rs.total;
      this.page=parseInt(rs.pagenum);
      console.log(data);
    });
  }
  previous(page){
    if(page>1){
      page-=1;
    }
    this.restService.getbuckets(this.token,page).then(data=>{
      let rs=JSON.parse(JSON.stringify(data));
      this.data=rs.buckets;
      this.total=rs.total;
      this.page=parseInt(rs.pagenum);
      console.log(data);
    });
  }

  loadurl(id){
    this.router.navigate(['/bucketlist',{bucketId:id}]);
  }

}
