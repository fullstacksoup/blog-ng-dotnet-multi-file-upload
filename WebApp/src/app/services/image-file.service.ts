import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface ResultsObj {
  status?: string;
  msg?: string;
  data?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ImageFileService {

  constructor(private http: HttpClient) { }


  // ********************************************************** */
  // * A D D   I M A G E   T O   D A T A B A S E  (Local MDF file under App_Data folder in Web API)
  // ?
  // ********************************************************** */

  addImageToDB(fileForm: any, files: any): string {
    const URL = `${environment.baseUrl}/api/product/add`;

    const formData = new FormData();
    // Add Record Title
    formData.append('Title', fileForm.Title);
    // Add the file

    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i])
    }

    // formData.append('Description', fileForm.Description);
    let status = '';

    // Use a promise for this example
    const promise = new Promise((resolve, reject) => {
      this.http.post(URL, formData)
        .toPromise()
        .then(
          res => { // Success
            console.log(res);
            status = 'resolved';
          }
        )
        .catch((err) => {
          console.error(err);
          status = 'rejected';
        });
    });
    return status;
  }


  getImages(): Observable<ResultsObj> {
    const URL = `${environment.baseUrl}/api/product/get`;
    console.log(URL);
    return this.http.get(URL);
  }


  removeImage(id: number): Observable<ResultsObj> {
    const URL = `${environment.baseUrl}/api/product/removeimage/${id}`;
    console.log(URL);
    return this.http.get(URL);
  }

}
