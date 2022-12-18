import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgbPopoverConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HouseService } from "src/app/shared/services/house.service";
import { RoomService } from "src/app/shared/services/room.service";
import { AuthService } from "src/app/shared/services/auth.service";

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
    private roomService: RoomService,
    private authService: AuthService,
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
  public roomList: any;
  public room: any;
  public user: any = null;
  public location: any;
  public doubleClicked = false;
  public house: any;
  public token: any = null;

  async ngOnInit() {
    // if there is no location id = 0, get the current location
    if (!this.locations.find((x) => x.id === 0)) {
      console.log("no location");
      this.getCurrentPosition(this.locations);
    }

    this.token = sessionStorage.getItem("token");

    this.user = await this.authService.getUser().subscribe((res) => {
      this.user = res;
    });

    if (this.token) {
      await this.houseService
        .getRealEstateAgentHouses()
        .subscribe((res: any) => {
          //console.log(res);
          this.locations = res.data;
        });
    } else {
      await this.houseService.getHouses().subscribe((res: any) => {
        //console.log(res);
        this.locations = res.data;
      });
    }

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
        //console.log(location);

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
    // console.log(event);
  }

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

  cancelAddHouse() {
    this.doubleClicked = false;
    this.locations.pop();
  }

  async markerClick(event) {
    this.clickedMarker = true;
    this.doubleClicked = false;

    // console.log(event);
    await this.houseService.getHouseById(event.id).subscribe((res: any) => {
      // console.log(res);
      this.clickedHouse = res.data;
    });
    await this.roomService.getByHouseId(event.id).subscribe((res: any) => {
      this.roomList = res.data;
      //  console.log("room list", this.roomList);
    });
  }

  async addMeetingRoom() {
    const randomNumber = this.generateSixDigitNumber();
    const id = this.clickedHouse.id;

    this.room = {
      houseID: id,
      roomNumber: randomNumber,
    };

    await this.roomService.postRoom(this.room).subscribe({
      next: (res) => {
        // console.log(res);
        alert("Meeting room added");

        this.roomService.getByHouseId(id).subscribe((res: any) => {
          this.roomList = res.data;
          // console.log("room list", this.roomList);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  generateSixDigitNumber(): number {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  cancelMeetingRoom() {}
}
