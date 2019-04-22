export class SearchFilter {
    public province?;
    public city?;
    public district?;
    public prLow = 1;
    public prHigh = 0;
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
    public sizeLow = 1;
    public sizeHigh = 0;
    public raiting = 1;
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
    public beds?: number;
    public baths?: number;
    public garages?: number;
    public stories?: number;
    public zip: number = null;
    public user = '';
    public page = 1;
    public size = 20;
    public similarTo = false;
}
