import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageFileService } from 'src/app/services/image-file.service';
@Component({
  selector: 'file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.scss']
})
export class FileTableComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public imagesArr: any;

  constructor(private fileSVC: ImageFileService) { }

  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************

  ngOnInit(): void {
    this.onLoadData();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // ************************************************************************************************************************
  // * COMPONENT FUNCTIONS
  // ************************************************************************************************************************

  onLoadData(): void {
    this.subs.add(this.fileSVC.getImages()
    .subscribe((data) => {
        this.imagesArr = data.data.record;
        console.log('Image Array: ', this.imagesArr);
      },
      (error) => console.log(error)
    ));

  }

  onDeleteImage(id: number): void {
    this.subs.add(this.fileSVC.removeImage(id)
    .subscribe((data) => {
        console.log('Delete Result: ', data);
        this.onLoadData();
      },
      (error) => console.log(error)
    ));
  }

}
