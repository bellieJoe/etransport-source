import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../helpers/error-handler.service';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';


@Injectable({
  providedIn: 'root'
})
export class RefundsService {

  constructor(
    private errorHandler : ErrorHandlerService
  ) { }

  async getRefundsByUserAdministratorId(user_id : any){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/refunds/get-refunds-by-user-administrator-id/${user_id}`);
      return res.data;
    } catch (error) {
      this.errorHandler.handleError(error)
    }

  }
}
