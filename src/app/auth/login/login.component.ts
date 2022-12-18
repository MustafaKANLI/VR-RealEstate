import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        // Save the JWT token in a cookie or local storage for later use.

        console.log(res);

        var token: any = res.data.jwToken;
        sessionStorage.setItem("token", token);
        this.router.navigateByUrl("/");
      },
      (error) => {
        // Handle the error.
      }
    );
  }
}
