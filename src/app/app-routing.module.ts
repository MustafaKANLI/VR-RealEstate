import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";

const content: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomeModule),
  },
];

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: content,
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {})]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
