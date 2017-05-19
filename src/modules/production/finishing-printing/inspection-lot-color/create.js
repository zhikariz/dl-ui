import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class Create {
  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  cancelCallback(event) {
    this.__goToList();
  }

  bind() {
    this.data = { items: [] };
  }

  saveCallback(event) {
    this.service.create(this.data)
      .then(result => {
        this.data = {};
        this.error = {};
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('create', { replace: true, trigger: true });
      })
      .catch(error => {
        this.error = error;
      });
  }

  __goToList() {
    // alert("Data berhasil dibuat");
    // this.router.navigateToRoute('create', { replace: true, trigger: true });
    this.router.navigateToRoute('list');
  }
}