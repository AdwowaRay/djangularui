import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss']
})
export class ShowDepComponent implements OnInit {

  constructor(private shared:SharedService) { }

  department_list:any = [];

  modal_title = "";
  activated_add_edit_dep_comp = false;
  dep: any;

  departmentIdFilter: string = "";
  departmentNameFilter: string = "";
  departmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDeptList()
  }

  addClick() {
    this.dep = {
      departmentId: 0,
      departmentName: ""
    }
    this.modal_title = "Add Department"
    this.activated_add_edit_dep_comp = true;
    this.refreshDeptList();
  }

  closeClick() {
    this.activated_add_edit_dep_comp = false;
    this.refreshDeptList();
  }

  refreshDeptList(){
    this.shared.getDeptList().subscribe(data => {
      this.department_list = data;
      this.departmentListWithoutFilter = data;
    });
  }

  editClick(item:any) {
    this.dep = item;
    this.modal_title = "Edit Department";
    this.activated_add_edit_dep_comp = true;
  }

  deleteClick(dept: any) {
    if(confirm('Are you sure???')){
      this.shared.deleteDepartment(dept.departmentId).subscribe(data => {
        alert(data.toString());
        this.refreshDeptList();
      });
    }
  }

  filterFunction() {
    var deptIdFilter = this.departmentIdFilter;
    var departmentNameFilter = this.departmentNameFilter;

    this.department_list = this.departmentListWithoutFilter.filter(function (el: any) {
      return el.departmentId.toString().toLowerCase().includes(
        deptIdFilter.toString().trim().toLowerCase()
      ) &&
      el.departmentName.toString().toLowerCase().includes(
        departmentNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop: any, asc: boolean) {
    this.department_list = this.departmentListWithoutFilter.sort(function(a: any, b:any) {
      if(asc) {
        return (a[prop] > b [prop])?1 : ((a[prop] < b[prop]) ?-1 :0)
      } else {
        return (b[prop] > a [prop])?1 : ((b[prop] < a[prop]) ?-1 :0)
      }
    });
  }

}
