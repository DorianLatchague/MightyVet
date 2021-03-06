import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  constructor(private _http: HttpClient) { }
  //------------------meetings--------------------------
  getMeetings(id, bool){ //user id and isMentor
    if(bool){
      return this._http.get(`/api/meetings/mentor/${id}`);
    }
    else{
      return this._http.get(`/api/meetings/mentee/${id}`);
    }
  }
  addMeeting(user_id, newMeeting) {
    return this._http.post('/api/meetings/'+user_id, newMeeting);
  }
  meetingUpdate(id, meetingUpdate) {
    return this._http.put('/api/meetings/' + id, meetingUpdate);
  }
  deleteMeeting(id) {
    return this._http.delete('/api/meetings/' + id);
  }
  updateTime(meeting_id, meetingUpdate) {
    return this._http.put('/api/meetings/changetime/' + meeting_id, meetingUpdate);
  }
  signUp(meeting_id, meetingUpdate) {
    return this._http.put('/api/meetings/signup/' + meeting_id, meetingUpdate);
  }
  cancel(meeting_id, meetingUpdate) {
    return this._http.put('/api/meetings/cancel/' + meeting_id, meetingUpdate);
  }
}
