import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    password!: string;

    constructor(public layoutService: LayoutService, private router: Router) { }

    login() {
        // Aquí pones la lógica de autenticación
        // Simulando una autenticación exitosa
        const isAuthenticated = true;

        if (isAuthenticated) {
            // Si la autenticación es exitosa, redirige al AppLayout
            this.router.navigate(['/app']);
        } else {
            // Manejar el error de autenticación
            console.error('Autenticación fallida');
        }
    }
}
