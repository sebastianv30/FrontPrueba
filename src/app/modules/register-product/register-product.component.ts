import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit{
  action: string = "Actualización";
  constructor(
    private _ServiceProductService: ProductServiceService,
    public dialogRef: MatDialogRef<RegisterProductComponent>,
    private _ServiceUserService: UserServiceService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
  }

  findDate() {
    let date = new Date();
    let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    return output
  }

  registerForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    date: new FormControl(''),
  });

  createProduct() {
    if (this._ServiceUserService.personId != ""){
      const data = {
        nombreProducto: this.registerForm.value.name,
        cantidad: this.registerForm.value.quantity,
        fechaIngreso: this.registerForm.value.date,
        idusuario:this._ServiceUserService.personId
      }
      
      this._ServiceProductService.createProduct(data).subscribe((response)=>{
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['product']);
        })
        this.closeDialog();
        window.location.reload();
      });
    }else{
      window.alert('Debes seleccionar un usuario antes de crear un nuevo producto!');
      this.closeDialog();
      return
    }
    
  }
  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
