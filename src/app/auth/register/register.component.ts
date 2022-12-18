import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public show1: boolean = false;
  public show2: boolean = false;
  public registerForm: FormGroup;
  public customerList = [];

  constructor(
    public authServ: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.checkRepassword("password", "repassword"),
      }
    );
  }

  checkRepassword(controlName: string, matchingControlName: string) {
    // return (formGroup: FormGroup) => {
    //   const control = formGroup.controls[controlName];
    //   const matchingControl = formGroup.controls[matchingControlName];
    //   if (
    //     matchingControl.errors &&
    //     !matchingControl.errors.confirmedValidator
    //   ) {
    //     return;
    //   }
    //   if (control.value !== matchingControl.value) {
    //     matchingControl.setErrors({ confirmedValidator: true });
    //   } else {
    //     matchingControl.setErrors(null);
    //   }
    // };
  }

  ngOnInit() {}

  showPassword1() {
    this.show1 = !this.show1;
  }
  showPassword2() {
    this.show2 = !this.show2;
  }
  register() {
    var data = this.registerForm.value;
    this.authServ.register(data).subscribe(
      (res) => {
        // Save the JWT token in a cookie or local storage for later use.

        console.log(res);

        // var token: any = res.data.jwToken;
        // sessionStorage.setItem("token", token);
        this.router.navigateByUrl("/auth/login");
      },
      (error) => {
        // Handle the error.
      }
    );
  }
}
