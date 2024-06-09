import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  isLoggedIn: boolean = true;

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.usuarioService.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
