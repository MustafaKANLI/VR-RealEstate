import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCAGc53YTFg_7iHEuH0kl86H1bkqXEHF78",
    }),
  ],
})
export class HomeModule {}
