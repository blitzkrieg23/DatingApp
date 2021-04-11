import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
//import * as EventEmitter from 'node:events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();
  model:any ={};
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.model);
    this.accountService.register(this.model).subscribe(response=>{
      console.log(response);
      this.cancel();
    }, error =>{
      console.log(error);
    });
  }

  cancel(){
    //console.log("Cancelled");
    this.cancelRegister.emit(false);
  }
}