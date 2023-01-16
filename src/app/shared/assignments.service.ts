import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logginService:LoggingService,
  private http:HttpClient) { }

 uri = "https://api-cours-angular.herokuapp.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri)

    //return of(this.assignments);
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    /*const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)

    console.log("getAssignment id= " + id + " nom = " + a.nom)*/
    //return of(a);
    console.log("get by id id = "+id)
    return this.http.get<Assignment>(this.uri + "/" + id)
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);

    //this.logginService.log(assignment.nom, "ajouté !");

    //return of("Assignment ajouté");
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    this.logginService.log(assignment.nom, "modifié !");

    return of("Assignment modifié");
  }

  deleteAssignement(assignment:Assignment) :Observable<string> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé !");


    return of("Assignment supprimé")
  }

  /*peuplerBD() {
    bdInitialAssignments.forEach(a => {
    let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
 
      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
 
  }*/
}
