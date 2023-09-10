import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductLogService } from 'src/app/service/product-log.service';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  action: string = "Actualización";
  newDate: string = "";
  updateProductForm: FormGroup;
  constructor(
    private _ServiceProductService: ProductServiceService,
    private _ServiceProductLog: ProductLogService,
    private _ServiceUserService: UserServiceService,
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.formaterDate();
    this.updateProductForm = this.fb.group({
      name: new FormControl(this.data.nombreProducto),
      quantity: new FormControl(this.data.cantidad),
      date: new FormControl(this.newDate)
    })

  }

  ngOnInit(): void {
    this.formaterDate()
  }
  findDate() {
    let date = new Date();
    let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    return output
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  formaterDate() {
    let date = this.data.fechaIngreso.split('T')[0];
    const partDate = date.split('-');
    this.newDate = partDate[0] + "-" + partDate[1] + "-" + partDate[2]
  }

  updateProduct() {
    if (this._ServiceUserService.personId != "") {
      const data = {
        nombreProducto: this.updateProductForm.value.name,
        cantidad: this.updateProductForm.value.quantity,
        fechaIngreso: this.updateProductForm.value.date,
        idusuario: this._ServiceUserService.personId,
        personaModifico: this._ServiceUserService.personName,
        idMercancia: this.data.idMercancia,
        accion: this.action
      }
      const log ={
        personaModifico: this._ServiceUserService.personName,
        idMercancia: this.data.idMercancia,
        accion: this.action
      }
      console.log(log)
      this._ServiceProductService.updateProduct(data, this.data.idMercancia).subscribe(response => {
        this._ServiceProductLog.createLog(log).subscribe(response =>{
          
        })
        this.closeDialog();
        window.location.reload();
      });
      
    } else {
      window.alert('Debes seleccionar un usuario antes de actualizar el producto!');
      this.closeDialog();
      return
    }
  }
}
