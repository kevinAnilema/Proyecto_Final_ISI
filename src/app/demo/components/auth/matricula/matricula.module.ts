import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MatriculaComponent } from './matricula.component';
import { matriculaRoutingModule } from './matricula.routing.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
    imports: [
        CommonModule,
        matriculaRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        MessagesModule,
        ToastModule,
        MessageModule,
        DropdownModule,
    ],
    declarations: [MatriculaComponent]
})
export class matriculaModule { }
