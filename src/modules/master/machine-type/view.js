import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {bindable} from 'aurelia-framework';


@inject(Router, Service)
export class View {
        @bindable Options = {
        "readOnly" : true,
        "isMaster":false,
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }


    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data.Id });
    }

    deleteCallback(event) {
        this.service.delete(this.data)
            .then(result => {
                this.router.navigateToRoute('list');
            });
    }
}
