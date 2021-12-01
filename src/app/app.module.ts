import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { FormStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SkypipePipe } from './skypipe.pipe';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { ImageComponent } from './admin/image/image.component';
import { CategoryComponent } from './admin/category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestComponent } from './test/test.component';
import { ProductComponent } from './admin/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SkypipePipe,
    DashboardComponent,
    SidenavComponent,
    ImageComponent,
    CategoryComponent,
    TestComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
