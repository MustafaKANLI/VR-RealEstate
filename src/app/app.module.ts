import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { LayoutComponent } from "./components/layout/layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProfileModule } from "./pages/profile/profile.module";

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
