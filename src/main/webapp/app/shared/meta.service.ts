import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetaService {
    constructor(@Inject(DOCUMENT) private dom, private meta: Meta) {}

    createCanonicalURL() {
        const prevLink = this.dom.head.querySelector('[rel~="canonical"]');
        if (prevLink) {
            this.dom.head.removeChild(prevLink);
        }
        const link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);
    }

    addTag(name, content) {
        const meta: HTMLMetaElement = this.meta.getTag('name');
        if (!meta) {
            this.meta.addTag({ name, content });
        } else {
            this.meta.updateTag({ name, content });
        }
    }
}
