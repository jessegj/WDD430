import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectPage } from './project-page.model';
import { ProjectPageService } from './project-page.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  term!: string;
  onSelected(page: ProjectPage) {
    this.pageService.pageSelectedEvent.emit(page);
  }

  inventories: ProjectPage[] = [];
  subscription: Subscription | any;
  constructor(private pageService: ProjectPageService) {}

  ngOnInit(): void {
    this.inventories = this.pageService.getPieces();
    this.pageService.pageChangedEvent.subscribe(
      (inventories: ProjectPage[]) => {
        this.inventories = inventories;
      }
    );
    this.subscription = this.pageService.pageListChangedEvent.subscribe(
      (pageList: ProjectPage[]) => {
        this.inventories = pageList;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }

}
