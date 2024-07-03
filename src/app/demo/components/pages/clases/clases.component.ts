import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from 'src/app/services/datos.service';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { DomSanitizer } from '@angular/platform-browser';

interface materias {
  idMateria:number
}

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
})
export class ClasesComponent implements OnInit {

  public materias: any[] = []; 
  public clases: any[] = []; // Variable para almacenar las clases
  public idMateria: string; // Variable para almacenar el idMateria
  public selectedMateria: any; // Variable para almacenar la materia seleccionada

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private clasesService: DatosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idMateria = params.get('idMateria');
      console.log(this.idMateria);

      this.materiasService.getMaterias(this.idMateria).subscribe(
        data => {
          console.log(data);
          this.materias = data;
          this.selectedMateria = this.materias.find(materia => materia.idMateria === parseInt(this.idMateria, 10));
          console.log('materia selecciionada',this.selectedMateria);          
          if (this.idMateria!='') {
            const mate:materias = {idMateria:1} ;
            console.log(JSON.stringify(mate));
            this.clasesService.getClases(JSON.stringify(mate)).subscribe(
              data => {
                console.log(data);
                this.clases = data.filter(clase => clase.visible); // Filtro las clases visibles
              },
              error => {
                console.log('Error al obtener las clases:', error);
              }
            );
          }
        },
        error => {
          console.log('Error al obtener las materias:', error);
        }
      );
    });
  }
  getYouTubeEmbedUrl(videoUrl: string): string {
    const videoId = videoUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return 'https://www.youtube.com/embed/' + videoId.substring(0, ampersandPosition);
    }
    return 'https://www.youtube.com/embed/' + videoId;
  }
}
