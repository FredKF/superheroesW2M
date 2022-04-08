import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
