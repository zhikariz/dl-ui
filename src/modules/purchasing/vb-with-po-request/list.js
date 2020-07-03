import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  dataToBePosted = [];

  rowFormatter(data, index) {
    if (data.isPosted)
      return { classes: "success" }
    else
      return {}
  }

  context = ["Detail", "Cetak Bukti Permohonan"]

  columns = [
    {
      field: "isPosting", title: "Post", checkbox: true, sortable: false,
      formatter: function (value, data, index) {
        
        if(data.Status_Post == "Sudah"){
          this.checkboxEnabled = false;
          return "";
        }
        else{
          this.checkboxEnabled = true;
          return "";
        }        
      }
    },
    { field: "VBNo", title: "No. VB" },
    {
      field: "Date", title: "Tanggal", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "UnitLoad", title: "Unit" },
    { field: "CreateBy", title: "Dibuat oleh" },
    // {
    //   field: "Status_Post", title: "Status Post",
    //   formatter: function (value, row, index) {
    //     return value ? "Sudah" : "Belum";
    //   }
    // },
    { field: "Status_Post", title: "Status Post" },
    { field: "Approve_Status", title: "Status Approved" },
    { field: "Complete_Status", title: "Status Complete" }
  ];

  async activate(params) {
    this.ressearch = params.search;
  }

  loader = (info) => {
    let order = {};

    if (info.sort)
        order[info.sort] = info.order;
    else
        order["Date"] = "desc";

    let arg = {
        page: parseInt(info.offset / info.limit, 10) + 1,
        size: info.limit,
        keyword: info.search,
        order: order,
        filter: JSON.stringify({ VBRequestCategory: "PO" }),
    };

    return this.service.search(arg)
        .then(result => {
            return {
                //total: result.info.total,
                data: result.data
            }
        });
}

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.Id, search: this.ressearch });
        break;
      case "Cetak Bukti Permohonan":
        this.service.getSalesReceiptPdfById(data.Id);
        break;
    }
  }

  contextShowCallback(index, name, data) {
    switch (name) {
      case "Cetak Bukti Permohonan":
        return data;
      default:
        return true;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      // console.log(this.dataToBePosted);
      this.service.post(this.dataToBePosted).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
    }
  }

  create() {
    this.router.navigateToRoute('create');
  }
}
