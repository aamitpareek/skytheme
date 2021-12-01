import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './admin/category/category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ImageComponent } from './admin/image/image.component';
import { LoginComponent } from './admin/login/login.component';
import { ProductComponent } from './admin/product/product.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path: 'adminlogin', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'sidenav', component: SidenavComponent},
  {path: 'image', component: ImageComponent},
  {path: 'category', component: CategoryComponent},
  {path: "test", component: TestComponent},
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
