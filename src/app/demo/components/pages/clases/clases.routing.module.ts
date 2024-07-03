import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClasesComponent } from "./clases.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: ':idMateria', component: ClasesComponent } // Aceptar parámetro idMateria
    ])],
    exports: [RouterModule]
})
export class ClasesRoutingModule {}
