import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';

const routes:Routes=[
  {path:'',redirectTo:'welcome',pathMatch:'full'},
  {path:'welcome',component:WelcomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'bucketlist',component:BucketlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomeComponent,RegisterComponent,LoginComponent,WelcomeComponent ,BucketlistComponent ]
