import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { HouseService } from "src/app/shared/services/house.service";
import { NgbPopoverConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbPopoverConfig], // add NgbPopoverConfig to the component providers
})
export class HomeComponent implements OnInit {
  constructor(
    private houseService: HouseService,
    config: NgbPopoverConfig,
    private fb: FormBuilder
  ) {
    config.placement = "right";
    config.triggers = "click";
  }

  clickedMarker: boolean = false;
  public icon = {
    url: "https://cdn.icon-icons.com/icons2/1258/PNG/512/1495574609-map-location-solid-style-23_84564.png",
    scaledSize: {
      width: 75,
      height: 85,
    },
  };

  public locations: any = [];
  public addHouseForm: FormGroup;
  public clickedHouse: any;

  async ngOnInit() {
    // if there is no location id = 0, get the current location
    if (!this.locations.find((x) => x.id === 0)) {
      console.log("no location");
      this.getCurrentPosition(this.locations);
    }

    await this.houseService.getHouses().subscribe((res: any) => {
      console.log(res);
      this.locations = res.data;
    });

    this.addHouseForm = this.fb.group({
      price: [""],
      latitude: [""],
      longitude: [""],
      squareMeter: [""],
      furnished: [""],
      floor: [""],
      assetLink: [""],
      imageLink: [""],
      description: [""],
    });
  }

  updatePage() {}

  getCurrentPosition(locations) {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        console.log(location);

        const myLocation = {
          id: -1,
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };

        locations.push(myLocation);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  mapClick(event) {
    console.log(event);
  }

  public location: any;
  doubleClicked = false;
  public house: any;

  mapDblClick(event) {
    this.doubleClicked = true;
    this.clickedMarker = false;
    this.house = {
      ...this.house,
      latitude: String(event.coords.lat),
      longitude: String(event.coords.lng),
    };

    this.locations.push(this.house);
  }

  async addHouse() {
    this.house = {
      ...this.house,
      price: Number(this.addHouseForm.value.price),
      squareMeter: Number(this.addHouseForm.value.squareMeter),
      furnished: Boolean(this.addHouseForm.value.furnished),
      floor: Number(this.addHouseForm.value.floor),
      assetLink: this.addHouseForm.value.assetLink,
      imageLink: this.addHouseForm.value.imageLink,
      description: this.addHouseForm.value.description,
    };

    //console.log(this.house);

    await this.houseService.postHouse(this.house).subscribe({
      next: (res) => {
        //console.log(res);
        alert("House added");
        this.doubleClicked = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async markerClick(event) {
    this.clickedMarker = true;
    this.doubleClicked = false;

    console.log(event);
    await this.houseService.getHouseById(event.id).subscribe((res: any) => {
      console.log(res);
      this.clickedHouse = res.data;
    });
  }

  markerRightClick(event) {
    //remove marker
    console.log(event);
    let index = this.locations.findIndex((item) => item.id == event.id);

    console.log(event.id);
    if (index !== -1 && event.id !== 0) {
      this.locations.splice(index, 1);
      localStorage.setItem("locations", JSON.stringify(this.locations));
    }
  }

  mapRightClick(event) {
    console.log(event);
    // const obj = {
    //   lat: event.coords.lat,
    //   lng: event.coords.lng,
    // };
    // this.locations.push(obj);
  }

  togglePopover() {
    console.log("toggle");
  }
}
