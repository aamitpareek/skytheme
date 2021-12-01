import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestapiService } from 'src/app/restapi.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  getidCategory: any;
  image: any;
  public show: boolean = false;
  public buttonName: any = 'Upload Image';
  chekedImage : any;
  getdataofProduct: any;
  closeResult = '';
  selectUpdateData: any;

  
  constructor(private fb: FormBuilder, private RestapiService: RestapiService,private modalService: NgbModal ) { }

  productForm: any = this.fb.group({
    productName:['', Validators.required],
    productDescription: ['', Validators.required],
    productImage:['', Validators.required],
    productPrice:['', Validators.required],
    productSize: ['', Validators.required],
    productBrand: ['', Validators.required],
    productSpecification:[''],
    categoryid:['', Validators.required]
  })

  // model
  open(content: any) {
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
      return `with: ${reason}`;
    }
  }


//post product data
  submitProduct(){
    this.RestapiService.postProduct(this.productForm.value).subscribe(async data =>{
      console.log("Data", data);
      alert ("Data posted successfully");
      this.productForm.reset();
      await this.getProduct();
    })
  }

  //get data update
    updateDataId(data: any){
      this.selectUpdateData = {...data}
      console.log(this.selectUpdateData,"safdsfsafsaf");
      console.log("image", this.selectUpdateData)
      delete this.selectUpdateData.imagepath;
      delete this.selectUpdateData.imagename;
    }

  //update product data     
  updateProduct(){
    //console.log("imageid", this.selectUpdateData.productImage);

    this.selectUpdateData.productImage = this.chekedImage;
    // if(this.selectUpdateData.productImage === undefined){alert("Image not selected");}
    console.log("this.selectUpdateData",this.selectUpdateData,this.selectUpdateData.id)
    this.RestapiService.updateProduct(this.selectUpdateData.id, this.selectUpdateData).subscribe(async data =>{
      this.productForm.reset();
      await this.getProduct()

    })
  }

  //get category id
  getcatid(){
    this.RestapiService.getcategory().subscribe(data=>{
      this.getidCategory = data;
      // console.log("data", this.getidCategory.data);
    })
  }

  // get image
  toggle(){
    this.show = !this.show;
    if(this.show){
    this.RestapiService.getImage().subscribe(data=>{
      this.image = data;
    })
    this.buttonName = 'select';
    }
    else{
          this.buttonName = 'Upload Image';
          this.productForm.value.productImage = this.selectUpdateData.productImage;
           console.log('this.productForm.value.productImage', this.chekedImage);     
    }                                                                                                                                    
  }
// cheked image
  setchekedImage(event: any, data: any){
  console.log('cheked id', data.id);
    this.chekedImage = data.id;
  }
// get product
  async getProduct(){
   await this.RestapiService.getProduct().subscribe(data =>{
      this.getdataofProduct = data;
    console.log('get product', this.getdataofProduct);
    })    
    }

// delete product
    deleteProduct(id: any){
      this.RestapiService.deleteProduct(id).subscribe(async data=>{
        console.log("Data deleted id", data);
        alert("Data deleted successfully")
        await this.getProduct();

      })
    }
  
  ngOnInit(): void {
    // get categorydata
    this.getcatid();
    // get product
    this.getProduct();
  }

  checkIFImageisSelected(imgID: any) {
    return this.selectUpdateData.productImage == imgID ? true : false
  }

}
