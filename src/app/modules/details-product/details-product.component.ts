import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ProductLogService } from 'src/app/service/product-log.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  dataSource: any[] = [];
  newDate: string = "";
  detailProductForm: FormGroup;
  constructor(
    private _ServiceProductLogService: ProductLogService,
    private _ServiceUserService: UserServiceService,
    public dialogRef: MatDialogRef<DetailsProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) {
    this.formaterDate();
    this.dataSource = this.data.mercanciaLogs;
    this.detailProductForm = this.fb.group({
      name: new FormControl(this.data.nombreProducto),
      quantity: new FormControl(this.data.cantidad),
      date: new FormControl(this.newDate)
    })
   }

  ngOnInit(): void {
    this.formaterDate()
  }
  
  closeDialog(): void {
    this.dialogRef.close(null);
  }
  findDate() {
    let date = new Date();
    let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    return output
  }
  formaterDate() {
    let date = this.data.fechaIngreso.split('T')[0];
    const partDate = date.split('-');
    this.newDate = partDate[0] + "-" + partDate[1] + "-" + partDate[2]
  }
  
}

