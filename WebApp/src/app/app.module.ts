/********************************************************************************/
/*                   A N G U L A R   L I B R A R I E S                    */
/********************************************************************************/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// *****************************************************************************
// 3 R D   P A R T   L I B R A R I E S
// *****************************************************************************

import { NgxDropzoneModule } from 'ngx-dropzone';

// *****************************************************************************
// A N G U L A R   M A T E R I A L
// *****************************************************************************
// Note: when importing another module within the root then you will have to specify the module name when
// creating a component.
// Example: ng generate component your_component_name --module=app
// import { MaterialModule } from './material.module';

/********************************************************************************/
/*                A P P L I C A T I O N   S E R V I C E S                  */
/********************************************************************************/

import { ImageFileService } from './services/image-file.service';

/********************************************************************************/
/*                A P P   C O M P O N E N T S                  */
/********************************************************************************/

import { FileFormComponent } from './components/file-form/file-form.component';
import { FileTableComponent } from './components/file-table/file-table.component';
import { ImageContainerComponent } from './components/image-container/image-container.component';
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';

@NgModule({
  declarations: [
    AppComponent,
    FileFormComponent,
    FileTableComponent,
    ImageContainerComponent,
    FileDropzoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
  //   MaterialModule,

    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  providers: [ImageFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
