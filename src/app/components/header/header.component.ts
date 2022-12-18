import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  public user: any = null;
  public token: any = null;

  async ngOnInit() {
    this.token = sessionStorage.getItem("token");
    this.user = await this.authService.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  profileClick() {
    this.router.navigateByUrl("/profile");
  }

  logout() {
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }
}
