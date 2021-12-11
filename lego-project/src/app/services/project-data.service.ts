import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import { ProjectPage } from '../project-page/project-page.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private firestore: Firestore) { }
  saveProject(projectItem: ProjectPage): Observable<any> {
    const projectRef = collection(this.firestore, 'project');
    let promise = addDoc(projectRef, JSON.parse(JSON.stringify(projectItem)));
    return from(promise);
  }

  getProjects(): Observable<ProjectPage[]> {
    const projectRef = collection(this.firestore, 'project');
    return collectionData(projectRef, {idField: 'id'}) as Observable<ProjectPage[]>;
    }
}
