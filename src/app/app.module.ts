import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/Contacts/Contacts.component';
import { HeaderComponent } from './components//header/header.component';
import { FooterComponent } from './components/footer/footer.component';


import { CookieService } from 'ngx-cookie-service';
//import { VhodComponent } from './components/vhod/vhod.component';
import { AdminComponent } from './components/admin/admin.component';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './components/SharedService';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HttpClientModule }   from '@angular/common/http';
import { AccountComponent } from './components/account/account.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { SharedServiceUsers } from './components/SharedServiceUsers';
import { ManagerComponent } from './components/Manager/manager.component';
import { EditManagerComponent } from './components/edit-manager/edit-manager.component';

const appRoutes: Routes = [
   {path:'',component:HotelsComponent},//HotelsComponent StartLoginComponent
  {path:'home',component:HotelsComponent},
  {path:'about',component:ContactsComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'account',component:AccountComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    HeaderComponent,
    FooterComponent,
    //VhodComponent,
    AdminComponent,
    PopUpComponent,
    LoginComponent,
    RegistrationComponent,
    AccountComponent,
    HotelsComponent,
    ManagerComponent,
    EditManagerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), // forRoot какие юрд адреса отслеживаем
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule
    
    
  ],
  providers: [CookieService,SharedService,SharedServiceUsers,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 

  }
