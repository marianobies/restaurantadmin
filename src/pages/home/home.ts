import { Observable } from 'rxjs/Observable';
import { RealtimedbProvider } from './../../providers/realtimedb/realtimedb';
import { PopoverMenu } from './../popovermenu/popovermenu';
import { Component, NgZone } from '@angular/core';
import { NavController, PopoverController, AlertController } from 'ionic-angular';
import { strings } from "../../globales/values";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<Array<any>>;
  tiempo: string;
  myDate: Date;
  showSearch: boolean = false;
  buttonRemove: any = [];
  constructor(
    public popover: PopoverController,
    public navCtrl: NavController,
    public mydb: RealtimedbProvider,
    public alertCtrl: AlertController,
    private _zone: NgZone
  ) {
    this.mydb.init('restaurant');
    this.mydb.list().subscribe(
      (data) => {
        this._zone.run(() => this.items = data);
      }
    );
  }


  popoverMenu(e) {
    this.popover.create(PopoverMenu).present({
      ev: e
    });

  }


  createTodo() {
    var todo = { nombre: 'Dominguez' }
    this.mydb.post(todo)
  }

  remove(item) {
    this.alertCtrl.create({
      title: strings.borrar,
      subTitle: strings.pregunta_borrar,
      message: 'Pedido #' + item._id,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: strings.borrar,
          handler: () => {
            this.mydb.remove(item)
          }
        }
      ]
    }).present();
  }






}
