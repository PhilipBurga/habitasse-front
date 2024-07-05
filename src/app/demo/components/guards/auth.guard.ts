import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const authenticated = this.authService.isAutenticated();
        const confirmed = this.authService.isAccountConfirmed();

        if (confirmed) {
            if (authenticated) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                return false;
            }
        } else {
            this.router.navigate(['auth/verification']);
            return false;
        }
    }
}
