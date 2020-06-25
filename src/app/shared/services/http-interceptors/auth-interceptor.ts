import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthenticationService } from '../../../modules/auth/authentication.service';
import { environment } from '../../../../environments/environment';
import { applicationUrl } from '../../enums/application-urls';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    if (req.url === applicationUrl.auth.login) {
      return next.handle(req);
    }
    const authToken = this.auth.getAuthorizationToken();

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
