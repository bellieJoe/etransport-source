import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../helpers/error-handler.service';
import { NotificationService } from './notification.service';

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
    private errorHandler : ErrorHandlerService,
    private toastController : ToastController,
    private loadingController : LoadingController,
    private notificationService : NotificationService
  ) { }

  async getRefundsByUserAdministratorId(user_id : any){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/refunds/get-refunds-by-user-administrator-id/${user_id}`);
      return res.data;
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async getRefundsByUserCustomerId(user_id : any){
    try {
      const res = await axios.get(`${environment.apiUrl}/api/refunds/get-refunds-by-user-customer-id/${user_id}`);
      return res.data;
    } catch (error) {
      this.errorHandler.handleError(error)
    }
  }

  async approveRefund(refund : any){
    const loader = await this.loadingController.create({
      message : 'Processing refund',
      spinner: 'circular',
      backdropDismiss: false
    });
    try {
      await loader.present()
      const res = await axios.post(`${environment.apiUrl}/api/refunds/approve/${refund.refund_id}, {refund}`);
      await loader.dismiss();
      const toast = await this.toastController.create({
        message: 'A refund has been approved',
        duration: 1000
      });
      await this.notificationService.addNotification({
        link: '/customer-refunds',
        link_fragment: 'none',
        notification_message: 'Your refund request has been approved by the operator.',
        notification_title: 'Refund',
        user_id: refund.payment.user_id
      });
      await toast.present();
      return res.data;
    } catch (error) {
      console.log(error);
      
      await loader.dismiss()
      this.errorHandler.handleError(error)
      return false;
    }

  }

  async disapproveRefund(refund : any){
    const loader = await this.loadingController.create({
      message : 'Processing refund',
      spinner: 'circular',
      backdropDismiss: false
    });
    try {
      await loader.present()
      const res = await axios.post(`${environment.apiUrl}/api/refunds/disapprove/${refund.refund_id}`, {refund});
      await loader.dismiss();
      const toast = await this.toastController.create({
        message: 'A refund has been disapproved',
        duration: 1000
      });
      await this.notificationService.addNotification({
        link: '/customer-refunds',
        link_fragment: 'none',
        notification_message: 'Your refund request has been disapproved by the operator. You can message the operator to further explain the reason for your refund.',
        notification_title: 'Refund Failed',
        user_id: refund.payment.user_id
      });
      await toast.present();
      return res.data;
    } catch (error) {
      console.log(error);
      
      await loader.dismiss()
      this.errorHandler.handleError(error)
      return false;
    }

  }
}
