import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }
  
  announcements : any = [];

  async getAnnouncementsUser(user_id){
    const res = await axios.get(`${environment.apiUrl}/api/announcements/get-announcements-by-user-id/${user_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async postAnnouncement(data : PostAnnouncementData){
    const res = await axios.post(`${environment.apiUrl}/api/announcements`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }


  async updateAnnouncement(data : PostAnnouncementData){
    const res = await axios.put(`${environment.apiUrl}/api/announcements/${data.announcement_id}`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async deleteAnnouncement(announcement_id){
    const res = await axios.delete(`${environment.apiUrl}/api/announcements/${announcement_id}`)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

  async posComment(data : PostCommentData){
    const res = await axios.post(`${environment.apiUrl}/api/announcements/comments`, data)
    .then(res => res)
    .catch(err => err.response);
    return res;
  }

}

class PostAnnouncementData {
  announcement_id? : any
  announcement_title : string
  announcement_content : string
  viewer_role : string
  user_id : any
}

class PostCommentData {
  announcement_id : any
  user_id : any
  comment : any
}
