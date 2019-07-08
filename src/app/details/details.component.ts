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

  bulletin: any = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params);

      this.detailsService.getBulletinById(params.id).subscribe(
        data=>{
          this.bulletin = data.Data;
          console.log(this.bulletin);
        },
        err=>{
          console.log(err);
        })
      // this.router.navigate(['business']);
    });
  }

}
