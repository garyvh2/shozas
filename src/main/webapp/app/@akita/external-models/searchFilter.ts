export class SearchFilter {
    public province?;
    public city?;
    public district?;
    public prLow = 0;
    public prHigh = 3000000;
    private _rangePrice = {
        low: this.prLow,
        high: this.prHigh
    };
    public get rangePrice() {
        return this._rangePrice;
    }
    public set rangePrice(value: any) {
        this.prLow = value.low;
        this.prHigh = value.high;
        this._rangePrice = value;
    }
    public sizeLow = 0;
    public sizeHigh = 1000;
    private _rangeSize = {
        low: this.sizeLow,
        high: this.sizeHigh
    };
    public get rangeSize() {
        return this._rangeSize;
    }
    public set rangeSize(value: any) {
        this.sizeLow = value.low;
        this.sizeHigh = value.high;
        this._rangeSize = value;
    }
    public beds = 1;
    public baths = 1;
    public garages = 1;
    public stories = 1;
    public zip: number = null;
    public user = '';
    public page = 1;
    public size = 20;
}
