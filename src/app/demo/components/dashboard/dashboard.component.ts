import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;
    public DatosUser: any[]; 
    idSemestre='';
    idmateria='';

    subscription!: Subscription;
    public materias: any[]; // Variable para almacenar las materias

    constructor(
        private productService: ProductService, 
        public layoutService: LayoutService, 
        private materiasService: MateriasService,
        private datosUsuario: UserService,
        private router: Router // Inyecta el enrutador
    )        
    {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.DatosUser = this.datosUsuario.getDatosUser();
    if (this.DatosUser && this.DatosUser.length > 0) {
      const semestre = this.DatosUser[0].semestre;
      this.idSemestre=semestre.idSemestre
    } else {
      console.error('No se encontraron datos de usuario');
    }
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.materiasService.getMaterias(this.idSemestre).subscribe(
            data=>{
                console.log(data);
                this.materias = data; 
            },
            error=>{
                console.log('Error al obtener las materias:', error)
            }
        )
        
    }

    selectMateria(idMateria: string) {
        this.router.navigate(['app/pages/clase/', idMateria]);
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Avance en contenido',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Rendimiento academico',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
