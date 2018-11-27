import { Component, OnInit } from '@angular/core';
import {RestService } from '../rest.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css']
})
export class BucketlistComponent implements OnInit {
  id=0;
  name='';
token='';
message='';
data:any;
loggedin=false;

  constructor(private router: Router,private route: ActivatedRoute,
    private restService:RestService) {

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


    this.route.params.subscribe(params => {
      if (params['bucketId']) { 
        this.id=params['bucketId'];
        console.log(this.id);
      }
    });
   }

  ngOnInit() {
    this.restService.getitems(this.token,this.id).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      this.data=resp;
      console.log(resp);
    });
  }

  addItem(){
    var name = prompt("Please enter Item name", "Want to do x");
    this.restService.addItem(this.token,this.id,name).then(data=>{
      this.message=data[0];
    });
  }

  edititem(itemid){
    var name = prompt("Are you done with this item? true/false", "true");
    this.restService.edititem(this.token,this.id,name,itemid).then(data=>{
      this.message=data[0];
    });
  }
  
  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  deleteitem(itemid){
    var r = confirm("Are you sure you want to delete this item?");
    if (r == true) {
      this.restService.deleteitem(this.token,this.id,itemid).then(data=>{
        this.message=data[0];
      });
    } else {
        this.message = "Deletion cancelled";
    }
    
  }


}
