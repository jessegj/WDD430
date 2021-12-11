import { EventEmitter, Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { from, Observable, Subject } from 'rxjs';
import { ProjectPage } from '../project-page/project-page.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  url: string;
  httpClient: any;
  projectItems: ProjectPage[];

  constructor(private firestore: Firestore, private http: HttpClient) {
    this.url = "https://capstone-project-planner-default-rtdb.firebaseio.com"
  }

  saveProject(projectItem: ProjectPage): Observable<any> {
    const projectRef = collection(this.firestore, 'project');
    let promise = addDoc(projectRef, JSON.parse(JSON.stringify(projectItem)));
    return from(promise);
  }

  getProjects(): Observable<ProjectPage[]> {
    const projectRef = collection(this.firestore, 'project');
    return collectionData(projectRef, { idField: 'id' }) as Observable<ProjectPage[]>;
  }
  deleteProject(projectItem: ProjectPage) {
    if (!projectItem) {
      return;
    }

    const pos = this.projectItems.findIndex(p => p.id === projectItem.id);

    if (pos < 0) {
      return;
    }
    let endPoints = "/project/:id"
    this.http.delete(this.url + endPoints).subscribe((data: any) => {
      console.log(data);
    });
  };
}
