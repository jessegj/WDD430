import { EventEmitter, Injectable } from '@angular/core';
import { Firestore, collectionData, collection,doc, docData, updateDoc } from '@angular/fire/firestore';
import { addDoc} from '@firebase/firestore';
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
    if(projectItem.id && projectItem.id.length > 0)
    {
      const projectDocRef = doc(this.firestore, `project/${projectItem.id}`);
      let promise = updateDoc(projectDocRef, JSON.parse(JSON.stringify(projectItem)));
      return from(promise);
    } else {
      const projectRef = collection(this.firestore, 'project');
      let promise = addDoc(projectRef, JSON.parse(JSON.stringify(projectItem)));
      return from(promise);
    }
  }

  getProjects(): Observable<ProjectPage[]> {
    const projectRef = collection(this.firestore, 'project');
    return collectionData(projectRef, { idField: 'id' }) as Observable<ProjectPage[]>;
  }

  getProject(id:string): Observable<ProjectPage> {
    const projectRef = doc(this.firestore, `project/${id}`);
    return docData(projectRef, { idField: 'id' }) as Observable<ProjectPage>;
  }

  deleteProject(projectItem: ProjectPage) {
    let endPoints = "/project/:id"
    this.http.delete(this.url + endPoints).subscribe((data: any) => {
      console.log(data);
    });
  };
}
