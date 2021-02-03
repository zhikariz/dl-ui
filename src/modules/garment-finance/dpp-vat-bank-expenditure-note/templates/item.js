export class Item {

    activate(context) {
        this.data = context.data;
        this.readOnly = context.options.readOnly;
        this.isShowing = false;

        if (!this.readOnly) {
            this.collection = {
                columns: ['__check', 'No. Invoice', 'Tanggal Invoice', 'Nama Barang', 'Kategori', 'Total']
            };
        } else {
            this.collection = {
                columns: ['No. Invoice', 'Tanggal Invoice', 'Nama Barang', 'Kategori', 'Total']
            };
        }
    }

    onCheckAllInvoices(event) {
        for (var item of this.data.InternalNote.Items) {
            item.SelectInvoice = event.detail.target.checked;
        }
    }

    // activate(context) {
    //     this.data = context.data
    //     this.isShowing = false;
    //     this.data.TotalPaidIDR = 0;
    //     if (context.context.options) {
    //         this.IDR = context.context.options.IDR;
    //         this.rate = context.context.options.rate;
    //         this.sameCurrency = context.context.options.SameCurrency;
    //         if (this.IDR) {
    //             this.data.TotalPaidIDR = this.data.TotalPaid * this.rate;
    //             this.data.CurrencyIDR = "IDR";
    //         }
    //     }

    //     console.log(context);
    // }

    toggle() {
        this.isShowing = !this.isShowing;
    }
}