import { Component, OnInit } from '@angular/core';
import {RestService } from '../rest.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ValidatorFn,AbstractControl,FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error:any;
  f_name='';
  l_name='';
  email='';
  password='';

  regForm: FormGroup;

  constructor(private restService:RestService, private formBuilder:FormBuilder,private router:Router) { 
    this.regForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\.]+@[a-zA-Z0-9\.]+[\.][a-zA-Z0-9\.]+'), Validators.minLength(5), Validators.maxLength(100)])],
      f_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(2), Validators.maxLength(50)])],
      l_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(2), Validators.maxLength(50)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  ngOnInit() {
  }

  //wipe error
  wipeError(){
    this.error='';
  }

  onSubmit(value: any): void { 
    this.f_name=value.f_name;
    this.l_name=value.l_name;
    this.password=value.password;
    this.email=value.email;

    this.restService.register(this.f_name,this.l_name,this.email,this.password).then(data=>{
      let resp=JSON.parse(JSON.stringify(data));
      console.log(resp);
      if(resp.errors){
        this.error="an error occured, the email you are using hve been taken";
      }
      else{
        let data='You have successfully registered, please login';
        this.router.navigate(['/login',{term:data}]);
      }
    });
  }



}
