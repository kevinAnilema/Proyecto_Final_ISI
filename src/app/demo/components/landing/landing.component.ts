import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = true;
  tienePermisoMatricula: boolean = false; // Agregar propiedad para verificar permiso de matrícula

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private usuarioService: UserService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.usuarioService.isLoggedIn();
    console.log(this.isLoggedIn);

    // Verificar permiso de matrícula al inicializar el componente
    this.tienePermisoMatricula = this.usuarioService.getpermisoMatricula(); // Puedes ajustar según cómo verifiques el permiso
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
