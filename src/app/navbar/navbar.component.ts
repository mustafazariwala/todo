import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  signUporLogin = 'signup';

  constructor(
    private modalService: BsModalService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  @Input() sessionKey: string = '';
  modalRef?: BsModalRef;

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  openJoinModal(join: TemplateRef<any>) {
    this.modalRef = this.modalService.show(join);
  }


  async onSignup(){
    let user = await this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password).then((user:any) => user.user)
    console.log(user)
    if(user && user.uid){
      this.toastr.success('Signup Successful', 'Success');
      this.modalRef?.hide()
    } else {
      this.toastr.error('Error Signing In', 'Signup Failed');
    }
  }

  async onLogin(){
    let user = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password).then((user:any) => user.user)
    if(user && user.uid){
      this.toastr.success('Login Successful', 'Success');
      this.modalRef?.hide()
    } else {
      this.toastr.error('Error Logging In', 'Login Failed');
    }
  }
}
