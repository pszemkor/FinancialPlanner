import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEventComponent} from "../add-event/add-event.component";
import {BrowserComponent} from "../browser/browser.component";

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
    const dialogConfig = HeaderComponent.getDialogConfig();
    this.dialog.open(AddEventComponent, dialogConfig);
  }

  onSearch() {
    const dialogConfig = HeaderComponent.getDialogConfig();
    this.dialog.open(BrowserComponent, dialogConfig);
  }

  private static getDialogConfig() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    return dialogConfig;
  }
}
