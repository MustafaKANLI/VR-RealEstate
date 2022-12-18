import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  public baseUrl = "https://vrrealestateapi.azurewebsites.net/api";

  private header() {
    let user = JSON.parse(sessionStorage.getItem("user"));

    var reqHeader = new HttpHeaders({
      "content-type": "application/json",
      Authorization: "Bearer " + user.token,
    });

    return reqHeader;
  }

  getById(id: number): Observable<number> {
    const header = this.header();
    return this.http.get<number>(this.baseUrl + `/user/getbyid=${id}`, {
      headers: header,
    });
  }
}
