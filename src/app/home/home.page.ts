import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Toast } from '@capacitor/toast';

import { CapacitorFlash } from 'capacitor-flash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  lightOn: boolean;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      CapacitorFlash.isAvailable().then(async (result) => {
        // auto switch on if available
        if(result.value) {
          await CapacitorFlash.switchOn({ intensity: 0.45 }).then(async () => {
            const { value } = await CapacitorFlash.isSwitchedOn();
            this.lightOn = value;
          });
        } else {
          await Toast.show({ text: 'Flashlight not available!' });
        }
      })
    });
  }

  toggleLight() {
    CapacitorFlash.isSwitchedOn().then(async (result) => {
      if(result.value) {
        await CapacitorFlash.switchOff();
      } else {
        await CapacitorFlash.switchOn({ intensity: 1 });
      }
      this.lightOn = !result.value;
    });
  }

}
