import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public baseUrl = "https://vrrealestateapi.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  private header() {
    let token = sessionStorage.getItem("token");

    var reqHeader = new HttpHeaders({
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    });

    return reqHeader;
  }

  getHouses(): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.get<HttpResponse<Object>>(this.baseUrl + "/Room", {
      headers: header,
    });
  }

  getByHouseId(id): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.get<HttpResponse<Object>>(this.baseUrl + `/Room/GetByHouseId/${id}`, {
      headers: header,
    });
  }

  postRoom(data): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.post<HttpResponse<Object>>(this.baseUrl + "/Room", data, {
      headers: header,
    });
  }

}
