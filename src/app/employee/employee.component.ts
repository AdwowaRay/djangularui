import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private shared:SharedService) { }

  employee_list:any = [];

  modal_title = "";
  activated_add_edit_emp_comp = false;
  emp: any;

  ngOnInit(): void {
    this.refreshEmpList()
  }

  addClick() {
    this.emp = {
      employeeId: 0,
      employeeName: ""
    }
    this.modal_title = "Add Employee"
    this.activated_add_edit_emp_comp = true;
    this.refreshEmpList();
  }

  closeClick() {
    this.activated_add_edit_emp_comp = false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.shared.getEmpList().subscribe(data => {
      this.employee_list = data;
    });
  }

  editClick(item:any) {
    this.emp = item;
    this.modal_title = "Edit Employee";
    this.activated_add_edit_emp_comp = true;
  }

  deleteClick(empt: any) {
    if(confirm('Are you sure???')){
      this.shared.deleteEmployee(empt.employeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

}
