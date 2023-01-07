import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-vhod',
  templateUrl: './vhod.component.html',
  styleUrls: ['./vhod.component.css']
})
export class VhodComponent implements OnInit {

  vhodhtml: string;
 

  user: User | undefined;
 
  constructor(private http: HttpClient){}
    
  ngOnInit(){
        
      this.http.get('assets/text/user.json').subscribe({next:(data:any) => this.user=new User(data.specification)});
  }
  vhod(){
    
//     var myApp = angular.module("myApp", []);
// myApp.controller("mainController", function($scope, $http){
 
 
 
//  $http.get('/assets/text/1.txt',).then(function(data) {
//     $scope.countries = data.data;
//     console.log(data.data)
//   });
 
 
// });
// return this.http.get('');
//  getJson().subscribe( ( data ) => {});
  }
}
