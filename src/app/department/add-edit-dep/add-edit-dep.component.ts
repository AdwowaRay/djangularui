import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.scss']
})
export class AddEditDepComponent implements OnInit {

  @Input() dep:any;

  departmentId = "";
  departmentName = "";

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.departmentId = this.dep.departmentId;
    this.departmentName = this.dep.departmentName;
  }

  addDepartment() {
    var val = { departmentId: this.departmentId,
                departmentName: this.departmentName
              };
    this.sharedService.addDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment() {
    var val = { departmentId: this.departmentId,
      departmentName: this.departmentName
    };
    this.sharedService.updateDepartment(val).subscribe(res => {
    alert(res.toString());
    });
  }

}
