import { Component } from '@angular/core';
import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UploadService ]
})
export class AppComponent {
  title = 'cloudinary';

  files: File[] = [];

constructor( private _upLoadService: UploadService){}

onSelect(event: { addedFiles: any; }) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

onUpLoad() {
  if (!this.files || this.files.length === 0) {
    throw new Error('No ha cargado imagen');
  }

  //upload img a cloudinary
 const file_data = this.files[0];
 const data= new FormData();
 data.append('file', file_data);
 data.append('upload_preset', 'images')// preset en cloudinary
 data.append('cloud_name','prodelevatepf')

this._upLoadService.upLoadImage(data).subscribe( (response) => { 

  if(response){
    console.log(response.secure_url)
  }
 })
}



}
