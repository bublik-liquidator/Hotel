import { Component, OnInit } from '@angular/core';
import { SharedServiceShowInfo } from '../SharedServiceShowInfo';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  constructor(private sharedServiceInfo: SharedServiceShowInfo) { }
  info:string="";
  info1:string="";
  info2:string="";
  info3:string="";

  ngOnInit(): void {
    this.info=this.sharedServiceInfo.gerErrorInformation()
  }

}
