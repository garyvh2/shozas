import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'jhi-pricing-illustration',
    templateUrl: './pricing-illustration.component.html',
    styleUrls: ['./pricing-illustration.component.scss']
})
export class PricingIllustrationComponent implements OnInit {
    ww: any;
    wh: any;
    renderer: any;
    scene: any;
    camera: any;
    banana: any;
    directionalLight: any;
    self: PricingIllustrationComponent;

    constructor() {}

    ngOnInit() {
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({ canvas: <HTMLCanvasElement>document.getElementById('scene') });
        this.renderer.setSize(this.ww, this.wh);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, this.ww / this.wh, 0.1, 10000);
        this.camera.position.set(0, 0, 500);
        this.scene.add(this.camera);

        // Add a light in the scene
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.directionalLight.position.set(0, 0, 350);
        this.directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.directionalLight);

        // Load the obj file
        this.loadOBJ();
    }

    loadOBJ() {
        // Manager from ThreeJs to track a loader and its status
        const manager = new THREE.LoadingManager();
        // Loader for Obj from Three.js
        const loader = new THREE.ObjectLoader(manager);
        // Launch loading of the obj file, addBananaInScene is the callback when it's ready
        loader.load(
            'https://raw.githubusercontent.com/ladybug-tools/3d-models/gh-pages/content/json/urban-model/urban-model-002.json',
            this.addBananaInScene.bind(this)
        );
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        // Turn the banana
        this.banana.rotation.z += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

    addBananaInScene(object: any) {
        console.log(this);
        this.banana = object;
        // Move the banana in the scene
        this.banana.rotation.x = Math.PI / 2;
        this.banana.position.y = -200;
        this.banana.position.z = 50;
        this.banana.scale.set(-1, -1, -1);
        // Go through all children of the loaded object and search for a Mesh
        object.traverse(function(child: any) {
            // This allow us to check if the children is an instance of the Mesh constructor
            if (child instanceof THREE.Mesh) {
                // child.material.color = new THREE.Color(0X00FF00);
                // Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
                child.geometry.computeVertexNormals();
            }
        });
        // Add the 3D object in the scene
        this.scene.add(this.banana);
        this.render();

        this.camera.lookAt(this.banana.position);
    }
}
