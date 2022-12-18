import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HouseService {
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
    return this.http.get<HttpResponse<Object>>(this.baseUrl + "/House", {
      headers: header,
    });
  }

  getHouseById(id): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.get<HttpResponse<Object>>(this.baseUrl + `/House/${id}`, {
      headers: header,
    });
  }

  getRealEstateAgentHouses(): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.get<HttpResponse<Object>>(this.baseUrl + "/House/GetRealEstateAgentHouses", {
      headers: header,
    });
  }
  
  postHouse(data): Observable<HttpResponse<Object>> {
    const header = this.header();
    return this.http.post<HttpResponse<Object>>(this.baseUrl + "/House", data, {
      headers: header,
    });
  }
}
