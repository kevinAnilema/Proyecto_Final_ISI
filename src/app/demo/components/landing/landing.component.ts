import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = false;
  tienePermisoMatricula: boolean = false; // Agregar propiedad para verificar permiso de matrícula

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private usuarioService: UserService,
    private UserService: UsuarioService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.UserService.isLoggedIn();
    console.log(this.isLoggedIn);
    this.tienePermisoMatricula = this.usuarioService.getpermisoMatricula();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
