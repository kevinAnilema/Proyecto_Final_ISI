import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatriculaComponent } from './matricula.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MatriculaComponent }
    ])],
    exports: [RouterModule]
})
export class matriculaRoutingModule { }