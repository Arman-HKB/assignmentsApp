import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment.model';

interface Matiere {
  value: string;
  nom: string;
}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // emetteur de l'événement (nouvelAssignment)

  // du formulaire
  nomDevoir: string = '';
  dateDeRendu!: Date;
  matiere!: string;

  matieres: Matiere[] = [
    {value: 'java', nom: 'Programmation Java'},
    {value: 'bdd', nom: 'Base de données'},
    {value: 'web', nom: 'Technologies Web'},
  ]

  constructor(private assignmentsService:AssignmentsService, private router:Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.matiere = this.matiere;
    newAssignment.rendu = false;
    newAssignment.id = Math.floor(Math.random()*100000000);

    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      });

    this.router.navigate(['/home']);
  }
}
