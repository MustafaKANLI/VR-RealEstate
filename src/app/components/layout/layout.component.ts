import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "../../shared/services/layout.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, public layout: LayoutService) {
    this.route.queryParams.subscribe((params) => {
      this.layout.config.settings.layout = params.layout
        ? params.layout
        : this.layout.config.settings.layout;
    });
  }

  ngOnInit(): void {}

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  get layoutClass() {
    switch (this.layout.config.settings.layout) {
      case "Dubai":
        return "compact-wrapper";
      case "London":
        return "only-body";
      case "Seoul":
        return "compact-wrapper modern-type";

      case "Paris":
        return "compact-wrapper dark-sidebar";
      case "Tokyo":
        return "compact-sidebar";
      case "Madrid":
        return "compact-wrapper color-sidebar";
      case "Moscow":
        return "compact-sidebar compact-small";
      case "NewYork":
        return "compact-wrapper box-layout";

      case "Rome":
        return "compact-sidebar compact-small material-icon";
    }
  }
}
