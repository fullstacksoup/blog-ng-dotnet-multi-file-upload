import { Component, ViewChild } from '@angular/core';
import { FileTableComponent } from './components/file-table/file-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(FileTableComponent, {static: false}) childTableComponent: FileTableComponent;

  // Update the File Table Component when a new image is added
  onImageAdded($event): void {
    // Delay is set since the promise may take a couple of seconds to update the table
    // This is not ideal.  If requested , a better solution will be added to this repository
    setTimeout(() => {
      this.childTableComponent.onLoadData();
    }, 2000);
  }
}
