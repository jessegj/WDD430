import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectPage } from '../project-page/project-page.model';
import { ProjectDataService } from '../services/project-data.service';

@Component({
  selector: 'app-project-data',
  templateUrl: './project-data.component.html',
  styleUrls: ['./project-data.component.css']
})
export class ProjectDataComponent implements OnInit {
  projects:ProjectPage[] = [];
  projectItem: ProjectPage;
  router: any;
  id: any;

  constructor(private dataService: ProjectDataService) {
    
    this.dataService.getProjects().subscribe(res => {
      console.log(res);
      this.projects = res;
    })
  }

  ngOnInit(): void {
  }
  onDelete() {
      this.dataService.deleteProject(this.projectItem)
      //this.router.navigate(['/project-list']);
  }

}

