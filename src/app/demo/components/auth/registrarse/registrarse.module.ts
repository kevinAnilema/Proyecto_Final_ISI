import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        RegistrarseRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
		InputMaskModule,
		InputTextModule,
		ToastModule
    ],
    declarations: [RegistrarseComponent]
})
export class RegistrarseModule { }