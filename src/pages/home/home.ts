import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
import { MenuPrincipalPage } from '../menuPrincipal/menuPrincipal';
import { ClientapiService } from '../../services/clientapi.service';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  reponseAuth: any;
  id_cli : any=[];
  email: string;
  password: string;

  constructor(private sqlite : SQLite,private nativeStorage: NativeStorage,public navCtrl: NavController,public alertCtrl: AlertController, private events: Events, private clientapiService: ClientapiService) { //methode appelée quand la vue est construite
       
  }

  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: 'Email et le mot de passe ne correspondent pas',
      buttons: ['OK']
    });
    alert.present();
  }

  private showInscription(){
    this.navCtrl.push(InscriptionPage);
  }

  private showMenuPrincipal(email, password){
    var authInfo = {
      email : email,
      password : password
    }

    this.clientapiService.getProfil(authInfo)
      .then(reponseAuthFetched => {
        
      console.log("*********************************");
      console.log(reponseAuthFetched);
        if(reponseAuthFetched == null || reponseAuthFetched.nom == null){
                  this.showAlert();
        }else{
              this.navCtrl.setRoot(MenuPrincipalPage, {
                user : reponseAuthFetched
              }); 
        }
                      
      });
  }
}
