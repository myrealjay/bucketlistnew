import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl,FormControl } from '@angular/forms';
import {RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
data='';
error:any;
  email='';
  password='';
  regForm: FormGroup;
  constructor(
    private router: Router,private route: ActivatedRoute,private formBuilder:FormBuilder,
    private restService:RestService
  ) { 
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['term']) { 
        this.data=params['term'];
      }
    });

    this.regForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+[\.][a-zA-Z0-9\.]+'), Validators.minLength(5), Validators.maxLength(100)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  onSubmit(value: any): void { 
    this.password=value.password;
    this.email=value.email;

    this.restService.login(this.email,this.password).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      if(resp.error){
        this.error=resp.error.error;
      }
      else{
        let token=resp.token;
        let user=resp.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      }
    });
  }


  ngOnInit() {
  }

}
