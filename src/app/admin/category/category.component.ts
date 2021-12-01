import { Component, OnInit } from '@angular/core';
import { RestapiService } from 'src/app/restapi.service';
import { FormBuilder, Validators } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  closeResult: string = '';
  getAdminCategory: any;
  selectImage: any;
  public show: boolean = false;
  public buttonName: any = 'Upload Image';
  setchacked: any;
  setUpdateState: any;
  constructor(private RestapiService: RestapiService, private fb: FormBuilder, private modalService: NgbModal) { }
  categoryForm: any = this.fb.group({
    category: ['', Validators.required],
    parentcategory: ['', Validators.required],
    is_active: ['', Validators.required],
    imageid: ['']
  })

  ngOnInit(): void {
    this.getCategory();
  }
// popup model 
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // popup model end
// get category
  async getCategory(){
    await this.RestapiService.getcategory().subscribe(data =>{
      this.getAdminCategory = data;
      console.log("getadmincateogry", this.getAdminCategory);
    })
  }

// delete category
  deleteCategory(id: any){
    let confirmbox = confirm("Do you want to delete data?");
    if(confirmbox){
    this.RestapiService.deleteCategory(id).subscribe(async data=>{
      //alert("Deleted successfully");
      await this.getCategory();
    })
  }
  }
  
// checked image
toggle(){
  this.show = !this.show;
  if(this.show){
    this.RestapiService.getImage().subscribe(data=>{
      this.selectImage = data;
    })
  this.buttonName = "Select";
  }
  else{
    this.buttonName = "Upload Image";
    this.categoryForm.value.imageid = this.setchacked;
    console.log("set checked", this.setchacked);
  }
}

cheked(event: any, data: any){
  console.log(data.id);
  this.setchacked = data.id;

}

// post category
submitCategory(){
  this.RestapiService.postCategory(this.categoryForm.value).subscribe(async data=>{
    console.log("data",data);
    alert("Data posted successfully");
    this.categoryForm.reset();
    await this.getCategory();
  })
}

//setupdate state
  setupdate(data: any){
    this.setUpdateState = {...data};
    console.log(this.setUpdateState,"this.setUpdateState");
    delete this.setUpdateState.imagename;
    delete this.setUpdateState.imagepath;
    this.categoryForm.value = this.setUpdateState;
    //console.log("After delete data", this.setUpdateState)
  }

// update category
updateCategory(){
  this.setUpdateState.imageid = this.setchacked
  this.RestapiService.updateCategory(this.setUpdateState.id,this.setUpdateState).subscribe(async data=>{
    console.log("Data", data);
    await this.getCategory();
    this.categoryForm.reset();

  })
}

checkIFImageisSelected(imgID: any) {
  return this.setUpdateState.productImage == imgID ? true : false
}

}
