import { Injectable, EventEmitter } from '@angular/core';
import { ProjectPage } from './project-page.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectPageService {
  pages: ProjectPage[] = [];
  maxProjectPageId: number | any;

  pageSelectedEvent = new EventEmitter<ProjectPage>();
  pageChangedEvent = new Subject<ProjectPage[]>();
  pageListChangedEvent = new Subject<ProjectPage[]>();

  constructor() {
    this.maxProjectPageId = this.getMaxId();
  }

  getPieces(): ProjectPage[] {
    return this.pages;
  }

  getPiece(id: string): ProjectPage | null {
    for (let page of this.pages) {
      if (page.id == id) {
        return page;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId = 0;

    for (let page of this.pages) {
      let currentId = parseInt(page.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addPiece(newPiece: ProjectPage | any) {
    if (!newPiece) {
      return;
    }
    this.maxProjectPageId++;
    newPiece.id = this.maxProjectPageId;
    newPiece.push(this.pages);
    let pageListClone = this.pages.slice();
    this.pageListChangedEvent.next(pageListClone);
  }

  updatepage(originalPiece: ProjectPage, newPiece: ProjectPage) {
    if (!originalPiece || !newPiece) {
      return;
    }

    let pos = this.pages.indexOf(originalPiece);
    if (pos < 0) {
      return;
    }

    newPiece.id = originalPiece.id;
    this.pages[pos] = newPiece;
    let pagesListClone = this.pages.slice();
    this.pageListChangedEvent.next(pagesListClone);
  }

  deletePiece(page: ProjectPage) {
    if (!page) {
      return;
    }

    let pos = this.pages.indexOf(page);
    if (pos < 0) {
      return;
    }
    this.pages.splice(pos, 1);
    let pagesListClone = this.pages.slice();
    this.pageListChangedEvent.next(pagesListClone);
  }
}
