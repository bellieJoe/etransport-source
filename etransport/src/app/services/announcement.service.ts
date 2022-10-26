import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

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
}
