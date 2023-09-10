import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ProductServiceService } from 'src/app/service/product-service.service';
import { RegisterProductComponent } from '../register-product/register-product.component';
import { SelectUserComponent } from '../select-user/select-user.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DetailsProductComponent } from '../details-product/details-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: any[] = [];
  originalDataSource: any[] = [];
  hasResults = true;
  filterText: string = '';
  constructor(private renderer: Renderer2, private resgisterUserDialog: MatDialog, private _ServiceProductService: ProductServiceService, private ServiceUserService: UserServiceService,) {

  }
  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    // Coloca aquí la lógica que deseas ejecutar en respuesta a un clic
    this.nameUser = this.ServiceUserService.personName;
  }
  ngOnInit(): void {
    this.listAllProduct()
    this.renderer.listen('body', 'click', (event: Event) => {
      // Coloca aquí la lógica que deseas ejecutar en respuesta a un clic
      this.nameUser = this.ServiceUserService.personName;

    });
    //this.openDialogSelect()
  }
  nameUser = this.ServiceUserService.personName;
  applyFilter() {
    // Convierte el texto de búsqueda a minúsculas para que sea insensible a mayúsculas/minúsculas.
    const filterValue = this.filterText.toLowerCase();
    
    // Filtra tus datos según el texto de búsqueda.
    this.dataSource = this.originalDataSource.filter(item => {
      var nombreProducto = item.nombreProducto.toLowerCase();
      var nombreUsuario = item.usuario.nombreUsuario.toLowerCase();
      var filter = `${nombreProducto} ${nombreUsuario}`;
      return filter.includes(filterValue);
    });
  }
  
  openDialogSelect(): void {
    this.resgisterUserDialog.open(SelectUserComponent)
  }
  listAllProduct() {
    this._ServiceProductService.listAllProduct().subscribe(response => {
      this.originalDataSource = response;
      this.dataSource = response;
    });
  }
  openDialogProduct(): void {
    this.resgisterUserDialog.open(RegisterProductComponent)
  }
  openDialogDetailsProduct(dataDetails: any): void {
    this.resgisterUserDialog.open(DetailsProductComponent, { data: dataDetails })
  }
  openDialogUpdateProduct(dataProduct: any): void {
    if (this.ServiceUserService.personId != "") {
      this.resgisterUserDialog.open(UpdateProductComponent, { data: dataProduct });
    } else {
      window.alert("Seleccione un usuario antes de modificar cualquier producto.");
    }

  }
  confirmDelete(id: any) {
    if (this.ServiceUserService.personId == id.idusuario) {
      const result = window.confirm('¿Estás seguro de que deseas eliminar este elemento?');
      if (result) {
        this.deleteProduct(id.idMercancia);
      }
    } else {
      window.alert("El usuario seleccionado no coincide el propietario del producto.");
    }
  }
  deleteProduct(id: any) {
    this._ServiceProductService.deleteProduct(id).subscribe(response => {
      window.location.reload();
    });
  }
}
