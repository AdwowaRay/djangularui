import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp:any;

  employeeId = "";
  employeeName = "";
  department = "";
  dateOfJoining = "";
  photoFileName = "anonymous.png";
  photoFilePath = this.sharedService.PhotoUrl+this.photoFileName;

  department_list:any = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.localDepartmentList();
    
  }

  localDepartmentList() {
    this.sharedService.getAllDepartmentNames().subscribe((data: any) => {
      this.department_list = data;
      this.employeeId = this.emp.employeeId;
      this.employeeName = this.emp.employeeName;
      this.department = this.emp.department;
      this.dateOfJoining = this.emp.dateOfJoining;
      this.photoFileName = this.emp.photoFileName;
      this.photoFilePath = this.sharedService.PhotoUrl+this.photoFileName;
    });
  }

  addEmployee() {
    var val = { employeeId: this.employeeId,
                employeeName: this.employeeName,
                department: this.department,
                dateOfJoining: this.dateOfJoining,
                photoFileName: this.photoFileName
              };
    this.sharedService.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = { employeeId: this.employeeId,
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName
    };
    this.sharedService.updateEmployee(val).subscribe(res => {
    alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.sharedService.uploadPhoto(formData).subscribe((data: any) => {
      this.photoFileName = data.toString();
      this.photoFilePath = this.sharedService.PhotoUrl+this.photoFileName;
    });
  }

}


