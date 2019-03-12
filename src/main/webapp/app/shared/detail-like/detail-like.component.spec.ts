import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLikeComponent } from './detail-like.component';

describe('DetailLikeComponent', () => {
    let component: DetailLikeComponent;
    let fixture: ComponentFixture<DetailLikeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailLikeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailLikeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
