import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestapiService } from 'src/app/restapi.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  uploadState: any;
  nameState: any;
  try:any={name:''};
  getImageData: any;
  constructor(private fb: FormBuilder, private RestapiService: RestapiService) { this.uploadState = [] }
  imageForm : any = this.fb.group({
    imagename: [''],
    imagepath: ['']
  })

  //upload 
  onUpload(event: any){
    console.log("onupload", this.imageForm.value.imagename )
    if(event.target.files.length > 0){
      this.uploadState = event.target.files[0];
      console.log("Upload State", this.uploadState);
      this.nameState = this.imageForm.value.imagename;
      console.log("Name State", this.nameState)

    }

  }
// upload imagedata
  async onSubmit(){
    console.log(this.nameState)
    const formData = new FormData();
    formData.append('imagename', this.nameState);
    formData.append('imagepath', this.uploadState);
    //formData.append('imgPath', this.uploadImage.get('imgPath').value);
    console.log("formData",formData)
    this.imageForm.value.imgPath = formData;
    console.log("this.uploadImage.value.imgPath",this.imageForm.value.imagepath)
    // console.log(this.uploadImage.value,"gdgdgd")
    // console.log()
    //{ file: this.uploadImage?.value?.imgPath, altText: this.uploadImage?.value?.imgName}
    this.RestapiService.postImage(formData).subscribe(event =>{
      //console.log("data", data);
      // if (typeof (event) === 'object') {
      //   console.log(event.body);
      //    console.log("image added")
      //   alert("Image added successfully");
      // }
    });
    alert("image added succesfully");
    await this.getImage();

  }

  //delete image
  deleteImage(id: any){
    this.RestapiService.deleteImage(id).subscribe(async res=>{
      console.log(`Data delete from${id}`);
      await this.getImage();
    })
  }

  async getImage(){
    await this.RestapiService.getImage().subscribe(data=>{
      this.getImageData = data;
      console.log("Get data successfully", this.getImageData);
    })
  }

  ngOnInit(): void {
    this.getImage();
  }

}
