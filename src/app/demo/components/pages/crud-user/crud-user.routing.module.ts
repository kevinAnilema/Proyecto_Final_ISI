import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudUserComponent } from './crud-user.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudUserComponent }
	])],
	exports: [RouterModule]
})
export class CrudUserRoutingModule { }
