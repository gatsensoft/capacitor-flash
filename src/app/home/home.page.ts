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

  async ngOnInit() {
    await this.platform.ready().then(async () => {
      await CapacitorFlash.isAvailable().then(async (available) => {
        // auto switch on if available
        if(available.value) {
          
          // This doesn't work, lightOn is always false
          // await CapacitorFlash.switchOn({ intensity: 1 }).then(async () => {
          //   await CapacitorFlash.isSwitchedOn().then((result) => {
          //     this.lightOn = result.value;
          //   });
          // });

          // This works well, lightOn is set to true
          await CapacitorFlash.toggle().then(async () => {
            await CapacitorFlash.isSwitchedOn().then((result) => {
              this.lightOn = result.value;
            });
          });

        } else {

          await Toast.show({ text: 'Flashlight not available!' });

        }
      })
    });
  }

  async toggleLight() {
    await CapacitorFlash.toggle().then(async () => {
      await CapacitorFlash.isSwitchedOn().then((result) => {
        this.lightOn = result.value;
      });
    });
  }

}
