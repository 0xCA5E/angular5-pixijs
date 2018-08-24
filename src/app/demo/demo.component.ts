import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/

    const app = new PIXI.Application(600, 600);
    document.getElementById('pixi-root').appendChild(app.view);

    const geometry = new PIXI.Geometry();
    geometry.addAttribute('aVertexPosition',  // the attribute name
       [0, 0,   // x, y
          100, 0,   // x, y
          100, 100], // x, y
        2); // the size of the attribute ( 2 floats for each item)
    geometry.addAttribute('aColor',  // the attribute name
        [1, 0, 0,  // r, g, b
          0, 1, 0,  // r, g, b
          0, 0, 1], // r, g, b
        3);        // the size of the attribute


    const vertexSrc = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec3 aColor;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec3 vColor;

    void main() {
        vColor = aColor;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }`;

    const fragmentSrc =  `
    precision mediump float;

    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }`;

    const shader = new PIXI.Shader.from(vertexSrc, fragmentSrc);

    const triangle = new PIXI.Mesh(geometry, shader);

    triangle.position.set(300, 300);
    triangle.scale.set(2);

    app.stage.addChild(triangle);

    app.ticker.add(function(delta) {
      //triangle.rotation += 0.01;
    });

  }
}
