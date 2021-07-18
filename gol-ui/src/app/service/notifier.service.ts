import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private xPos: MatSnackBarHorizontalPosition = 'start';
  private yPos: MatSnackBarVerticalPosition = 'bottom';
  private duration: number = 5000;
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  notify(message: string) {
    this.zone.run(() => {
      this.snackBar.open(message, undefined, {
        horizontalPosition: this.xPos,
        verticalPosition: this.yPos,
        duration: this.duration,
      });
    });
  }
}
