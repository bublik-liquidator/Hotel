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
import { RoomComponent } from './components/room/room.component';
import { SharedServiceRoomBooking } from './components/SharedServiceRoomBooking';
import { ShowInfoComponent } from './components/show-info/show-info.component';
import { SharedServiceShowInfo } from './components/SharedServiceShowInfo';
import { BookingComponent } from './components/booking/booking.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { EditInfoRoomComponent } from './components/edit-info-room/edit-info-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const appRoutes: Routes = [
  {path:'',component:HotelsComponent},//HotelsComponent StartLoginComponent
  {path:'room',component:RoomComponent},
  {path:'about',component:ContactsComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'account',component:AccountComponent},
  {path:'EditRoomComponent',component:EditRoomComponent},

  
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
    EditManagerComponent,
    RoomComponent,
    ShowInfoComponent,
    BookingComponent,
    EditRoomComponent,
    EditInfoRoomComponent    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), // forRoot which URK addresses are we tracking
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })

    
  ],
  providers: [CookieService,SharedService,SharedServiceUsers,SharedServiceRoomBooking,SharedServiceShowInfo,HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 

  }
