import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotifierService } from '../page/component/notifier/notifier.service';
import { SpinnerService } from '../page/component/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private notifierService : NotifierService,
    private spinner : SpinnerService,
  ) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let token =localStorage.getItem(environment.TOKEN_NAME);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${ token }`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      catchError(this.manejoError)
    );
    
  }

  manejoError(error= HttpErrorResponse){
    console.log(error);

    // this.notifierService.showNotification(2,'Mensaje',error.name);
    // this.spinner.hideLoading();

    return throwError("Error personalizado");
    
  }
}
