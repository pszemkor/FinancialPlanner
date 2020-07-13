import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onAddEvent() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEventComponent, dialogConfig);
  }
}
