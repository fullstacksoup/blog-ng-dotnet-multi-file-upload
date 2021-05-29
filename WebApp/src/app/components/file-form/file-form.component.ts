
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ImageFileService } from 'src/app/services/image-file.service';

class MediaImageClass {
  Title: string;
}
@Component({
  selector: 'file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit, OnDestroy {
  @Output() onSubmitForm = new EventEmitter<any>();

  private subs = new Subscription();
  private imageFormData = new MediaImageClass();
  public message: string;
  public imageForm: FormGroup;
  public files: File[] = [];

  constructor(private fb: FormBuilder,
              private fileSVC: ImageFileService) { }


  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************

  ngOnInit() {
    this.imageForm = this.fb.group({
      Title: ['', [Validators.required]]
    });

  }

  ngOnDestroy(): void {
    if (this.subs) {
     this.subs.unsubscribe();
    }
  }

  // ************************************************************************************************************************
  // * COMPONENT FUNCTIONS
  // ************************************************************************************************************************

  onSubmit($event) {
    this.imageFormData.Title = this.imageForm.controls.Title.value;
    this.fileSVC.addProductImages(this.imageFormData, this.files);

    this.onSubmitForm.emit(this.imageForm);
    // Clear the form and drop zone
    this.files = [];
    this.imageForm.reset();
    this.imageForm.controls.Title.setValue('');
    this.imageForm.controls.Title.setErrors(null);


  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
