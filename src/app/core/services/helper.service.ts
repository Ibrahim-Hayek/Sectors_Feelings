import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private rendererFactory: RendererFactory2,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }


  private renderer: Renderer2;
  public requestsNumber = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getCurrentLanguage(): string {
    return localStorage.getItem('currentLanguage') || 'en'
  }

  startLoader() {
    this.requestsNumber++;
    this.renderer.addClass(document.querySelector('.loader-wrapper'), 'show');
  }

  stopLoader() {
    this.requestsNumber--;
    if (this.requestsNumber <= 0) {
      this.requestsNumber = 0;
      this.renderer.removeClass(document.querySelector('.loader-wrapper'), 'show');
    }
  }

  showSuccessToastr(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true
    });
  }

  showFaildToastr(message: string, title: string) {
    this.stopLoader();
    this.toastr.error(message, title, {
      timeOut: 3000,
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

}

