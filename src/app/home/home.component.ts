import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  { HomeService } from './home.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService, private router:Router, private domSanitizer: DomSanitizer) { }
  baseURL: string ='http://localhost:3000';
  display: string ='none';
  fileToUpload: File = null;
  fileTitle: string = "";
  fileName: string = "Choose an image.";
  title: string = "";
  content: string = "";
  list: any = [];

  ngOnInit() {

    
    

    this.homeService.getAllBulletin().subscribe(
  		data=>{
  			this.list = data.Data;
        console.log(this.list);
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
    this.onCloseHandled();
    this.homeService.postFile(this.fileToUpload,
      this.fileTitle, 
      this.title, 
      this.content).subscribe(data => {
        this.fileTitle = "";
        this.fileName = "Choose an image.";
        this.title = "";
        this.content = "";

        this.list = data.Data;
        Swal.fire({
          title:'Success',
          text: 'Your data is safe :)',
          type: 'success',
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false
        });

      }, error => {

        Swal.fire({
          title:'Failed!!',
          text: 'Saving have failed :(',
          type: 'error',
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false
        })
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
