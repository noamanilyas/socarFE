import { Injectable } from '@angular/core';
import  { HttpClient} from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

    constructor(private http:HttpClient) { }

    getBulletinById(id):any {
    	return this.http.get('http://localhost:3000/home/getBulletinById?id=' + id);
    }

    postComment(text: string, id):any {
        const endpoint = 'http://localhost:3000/admin/addNewComment';
        var postData = {
          'bulletinId': id,
          'text': text
        };
        return this.http.post(endpoint, postData);
    }
}