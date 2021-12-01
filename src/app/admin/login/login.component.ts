import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestapiService } from 'src/app/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private RestapiService : RestapiService, private route: ActivatedRoute, private router: Router) { }
  adminLogin : any = this.fb.group({
    username :['', Validators.required],
    password : ['', Validators.required]

  })
  submitData(adminLogin: any){
    const {value:{username, password}} = adminLogin
    console.log("dataaaaa", adminLogin);

    this.RestapiService.loginadmin({username, password}).subscribe(data =>{
      if(data.error === false){
        alert("Right username and password");
        this.router.navigate(['/dashboard']);
      }
      else{
        alert("Wrong username and password");
      }
    })
    
  }

  ngOnInit(): void {
  }

}
