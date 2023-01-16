import { Component, ViewChild, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  columnsToDisplay = ['matiere', 'nom', 'dateDeRendu', 'rendu', 'details'];

  titre = 'Mon application sur les assignments';

  assignments!: Assignment[];

  assignmentSelectionne!: Assignment;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Assignment>;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentsService
      .getAssignments()
      .subscribe((tableauDesAssignmentsObservable) => {
        this.assignments = tableauDesAssignmentsObservable;
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.assignments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Assignments par page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
  }

  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
