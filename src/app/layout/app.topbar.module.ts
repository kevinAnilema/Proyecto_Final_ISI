import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { AppTopBarComponent } from './app.topbar.component';
@NgModule({
	imports: [
		CommonModule,
		BreadcrumbModule,
		MenubarModule,
		TabMenuModule,
		StepsModule,
		TieredMenuModule,
		MenuModule,
		ButtonModule,
		ContextMenuModule,
		MegaMenuModule,
		PanelMenuModule,
		InputTextModule,
		RouterModule.forChild([
			{
				path: '', component: AppTopBarComponent, children: [
					{ path: '', redirectTo: 'personal', pathMatch: 'full' },
					{ path: 'personal', component: AppTopBarComponent }
				]
			}
		])
	],
	declarations: [AppTopBarComponent],
	exports: [RouterModule]
})
export class MenusModule { }