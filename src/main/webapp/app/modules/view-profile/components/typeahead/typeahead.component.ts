import { RealStateService } from './../../../../@akita/real-state/real-state.service';
import { User } from './../../../../@akita/user/user.model';
import { Component, OnInit, Output, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { EventEmitter } from '@angular/core';

@Component({
    selector: 'jhi-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredTags: Observable<User[]>;
    users: User[] = [];
    allUsers: User[] = [];

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @Output() tagsChanged: EventEmitter<User[]> = new EventEmitter();
    @Output() validation: EventEmitter<FormControl> = new EventEmitter();
    tagCtrl: FormControl;
    inputCtrl = new FormControl();

    constructor(private realStateService: RealStateService) {}

    ngOnInit() {
        this.tagCtrl = new FormControl('', this.Validatetags);
        this.tagsChanged.emit(this.users);
        this.validation.emit(this.tagCtrl);
        this.loadTags();
    }
    loadTags() {
        this.realStateService.getTags().subscribe(data => {
            this.allUsers = data;
            this.updateFilterList();
        });
    }

    Validatetags = () => {
        const isNotValid = this.users.length === 0;
        if (isNotValid) {
            return { emptyTags: isNotValid };
        }
        return null;
    };
    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value || '';

            if (value.trim() && !this.isAlreadyOnList(value)) {
                this.users.push({ login: value.trim() });
                this.tagsChanged.emit(this.users);
                this.validation.emit(this.tagCtrl);
            }

            if (input) {
                input.value = '';
            }

            this.tagCtrl.setValue(null);
        }
    }

    remove(tag: User): void {
        const index = this.users.indexOf(tag);

        if (index >= 0) {
            this.users.splice(index, 1);
            this.tagsChanged.emit(this.users);
            this.validation.emit(this.tagCtrl);
        }
    }
    selected(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.value;
        if (!this.isAlreadyOnList(value.name)) {
            this.users.push(value);
            this.tagInput.nativeElement.value = '';
            this.tagCtrl.setValue(null);
            this.tagsChanged.emit(this.users);
            this.validation.emit(this.tagCtrl);
            this.updateFilterList();
        }
    }

    private isAlreadyOnList(value: string): boolean {
        const findRow = this.users.find(tag => tag.name.toLowerCase() === value.toLowerCase());
        return !!findRow;
    }
    updateFilterList() {
        this.filteredTags = this.inputCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: User | string | null) => (tag ? this._filter(tag) : this.notIncludedTags().slice(0, 10)))
        );
    }
    private notIncludedTags(): User[] {
        return this.allUsers.filter(tag => {
            return !this.users.some(t => tag.name === t.name);
        });
    }
    private _filter(tag: any): User[] {
        const value = tag.name ? tag.name : tag;
        const filterValue = value.toLowerCase();
        const notAddedTags = this.notIncludedTags();
        return notAddedTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
