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

  constructor(private dataService: ProjectDataService) {
    this.loadProjects();
  }

  ngOnInit(): void {
  }

  onDelete(id: string) {
      this.dataService.deleteProject(id).subscribe(res => {
        this.loadProjects();
      });
  }

  loadProjects(){
    this.dataService.getProjects().subscribe(res => {
      this.projects = res;
    });
  }

}

