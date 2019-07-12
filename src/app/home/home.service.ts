import { Injectable } from '@angular/core';
import  { HttpClient} from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getAllBulletin():any{
  	return this.http.get('http://localhost:3000/home/getAllBulletin');
  }

  postFile(fileToUpload: File, fileTitle: string, title, content):any {
        const endpoint = 'http://localhost:3000/admin/addBulletin';

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type':  'application/json'
        //     })
        //   };

        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        formData.append('title', title);
        formData.append('content', content);
        return this.http.post(endpoint, formData);
    }
  uploadArticle(title: string, text: string, userId: number) {
      const endpoint = 'http://localhost:3000/admin/addNewArticle';

      var data = {
        Title: title,
        Text: text,
        Id: userId
      }
      return this.http.post(endpoint, data);
  }
  postAudioFile(fileToUpload: File, fileTitle: string, userId: number) {
    const endpoint = 'http://localhost:3000/admin/addNewAudioFile?title='+fileTitle+'&id='+userId;

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
}
}