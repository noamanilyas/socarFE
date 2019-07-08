import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  { HomeService } from './home.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService, private router:Router) { }
  display: string ='none';
  fileToUpload: File = null;
  fileTitle: string = "";
  fileName: string = "Choose an image.";
  articleTitle: string = "";
  articleText: string = "";
  list: any = [];

  ngOnInit() {

    this.homeService.getAllBooks().subscribe(
  		data=>{
  			this.list = data.Data;
  		},
  		err=>{
  			console.log(err);
  		})

  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileName = files[0].name;

    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.homeService.postFile(this.fileToUpload,this.fileTitle,1).subscribe(data => {
      Swal.fire(
        'Success',
        'Your data is safe :)',
        'success'
      )
      console.log(data);
      // do something, if upload success
      }, error => {
        Swal.fire(
          'Failed!!',
          'Saving have failed :(',
          'error'
        )
        console.log(error);
      });
  }

  getList() {
    this.homeService.postFile(this.fileToUpload,this.fileTitle,1).subscribe(data => {
      Swal.fire(
        'Success',
        'Your data is safe :)',
        'success'
      )
      console.log(data);
      // do something, if upload success
      }, error => {
        Swal.fire(
          'Failed!!',
          'Saving have failed :(',
          'error'
        )
        console.log(error);
      });
  }

  addNew(){
    this.display='block';
  }
  openModal(){
    this.display='block'; 
  }
  onCloseHandled(){
    this.display='none'; 
  }

}
