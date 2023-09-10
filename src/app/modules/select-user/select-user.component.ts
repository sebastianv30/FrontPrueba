import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  dataSource: any[] = [];
  currentUser = "";
  constructor(
    private _ServiceUserService: UserServiceService,
    public dialogRef: MatDialogRef<SelectUserComponent>
  ) {
  }

  ngOnInit(): void {
    this.listAllUser()
  }

  listAllUser() {
    this._ServiceUserService.listAllUser().subscribe(response => {
      this.dataSource = response
      
    });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  changeUser(data: any) {
    this.currentUser = data;
    this._ServiceUserService.addPersonId(data.idUsuario)
    this._ServiceUserService.addPersonName(data.nombreUsuario)
    this.closeDialog()
  }
}
