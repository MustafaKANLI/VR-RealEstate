import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public baseUrl = "https://vrrealestateapi.azurewebsites.net/api";

  login(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/Account/authenticate", data);
  }

  register(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/Account/register", data);
  }

  getUser(): Observable<any> {
    const token = sessionStorage.getItem("token");
    const reqHeader = new HttpHeaders({
      Authorization: "Bearer " + token,
    });

    return this.http.get<any>(this.baseUrl + "/Account/get-user", {
      headers: reqHeader,
    });
  }

  logout() {
    // Delete the JWT token from session storage.
    sessionStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }
}
