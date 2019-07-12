import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  { DetailsService } from './details.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private detailsService:DetailsService) { }
  baseURL: string ='http://localhost:3000';
  display: string ='none';
  commentText: string;
  bulletin: any = [];
  bulletinId: any;
  commentsArray: any = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.bulletinId = params.id;
      this.detailsService.getBulletinById(this.bulletinId).subscribe(
        data=>{
          this.bulletin = data.Data;
          this.commentsArray = this.bulletin.comments != undefined ? this.bulletin.comments : [];
        },
        err=>{
          console.log(err);
        })
      // this.router.navigate(['business']);
    });
  }

  postComment() {
    this.onCloseHandled();
    this.detailsService.postComment(this.commentText, this.bulletinId).subscribe(data => {
        this.commentText = "";
        this.commentsArray = data.Data;
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
  onCloseHandled(){
    this.display='none'; 
  }


}
