
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
  public Filename: string;
  public UploadDate: any;
  public Size: number;
  public MimeType: string;
  public imageURL: string;
  public imagePreview: any;
  public message: string;
  public imageForm: FormGroup;
  public imgURL: string | ArrayBuffer;
  files: File[] = [];
  constructor(private fb: FormBuilder,
              private fileSVC: ImageFileService) { }


  // ************************************************************************************************************************
  // * NG EVENTS
  // ************************************************************************************************************************

  ngOnInit() {
    this.imgURL = 'assets/images/blank_image.jpg';
    this.Size = 0;
    // Create a reactive form. Label and Image is required.
    this.imageForm = this.fb.group({
      Title: ['', [Validators.required]],
      // description: [''],

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
    // this.imageFormData.Description = this.imageForm.controls.description.value;

    this.fileSVC.addImageToDB(this.imageFormData, this.files);

    this.onSubmitForm.emit(this.imageForm);
    this.imageForm.reset();
    this.removeImage();
    this.imageForm.controls.Title.setValue('');
//    this.imageForm.controls.description.setValue('');
    this.imageForm.controls.Title.setErrors(null);
  //  this.imageForm.controls.description.setErrors(null);

  }



  removeImage(): void {
    this.Filename = '';
    this.UploadDate = '';
    this.MimeType = '';
    this.Size = 0;
    this.imgURL = 'assets/images/blank_image.jpg';
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
