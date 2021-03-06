import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class NewslettersService {

  constructor(private _http: HttpClient) { }
  getNewsletters() {
      return this._http.get(`/api/newsletters`);
  }
  addNewsletter(newNewsletter) {
    return this._http.post('/api/newsletters', newNewsletter);
  }
  newsletterUpdate(id, newsletterUpdate) {
    return this._http.put('/api/newsletters/' + id, newsletterUpdate);
  }
  deleteNewsletter(email) {
    return this._http.delete('/api/newsletters/' + email);
  }
  checkNewsletter(email) {
    return this._http.get('/api/newsletters/email/'+email);
  }
}
