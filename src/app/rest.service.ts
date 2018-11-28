import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl='http://dry-brook-58949.herokuapp.com/api/v1';

  constructor( private http:HttpClient) { }

  register(f_name,l_name,email,password){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/register',
      { 
        f_name:f_name,
        l_name:l_name,
        email : email,
        password: password
      }, 
      {
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        return err;
      });
    });
  
  }

  login(email,password){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/auth/login',
      { 
        email : email,
        password: password
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  
  }

  createbucket(token,name){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/bucketlists?token='+token,
      { 
        name : name
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  
  }

  getbuckets(token,page){
    let limit=parseInt(localStorage.getItem('limit'));
    if(isNaN(limit)){
      limit=20;
    }
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/bucketlists?token='+token+'&limit='+limit+'&page='+page,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  getitems(token,id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/bucketlists/'+id+'/items?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  addItem(token,id,name){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/bucketlists/'+id+'/items?token='+token,
      {
        name:name
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  editbucket(token,id,name){
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/bucketlists/'+id+'?token='+token,
      {
        name:name
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  deletebucket(token,id){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/bucketlists/'+id+'?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  edititem(token,id,done,itemId){
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'/bucketlists/'+id+'/items/'+itemId+'?token='+token,
      {
        done:done
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  deleteitem(token,id,itemId){
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'/bucketlists/'+id+'/items/'+itemId+'?token='+token,
      {
        headers: { 'Content-Type': 'application/json' }
      }
      ).subscribe(data => {
        resolve(data);
      }, err => {
        resolve(err);
      });
    });
  }

  
  
}
