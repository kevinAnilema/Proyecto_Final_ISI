import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatriculaGuard } from 'src/app/guards/matricula.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'registrarse', loadChildren: () => import('./registrarse/registrarse.module').then(m => m.RegistrarseModule)},
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'matricula', loadChildren: () => import('./matricula/matricula.module').then(m => m.matriculaModule), canActivate:[MatriculaGuard] },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
