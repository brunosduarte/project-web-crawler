// src/components/TreeVisualization/Tree.tsx
import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import * as d3 from 'd3';
import { adaptD3LayoutToPixi } from '@/utils/d3PixiAdapter';
import styles from './styles.module.css';

export const Tree = () => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    const app = useRef<PIXI.Application>();

    useEffect(() => {
        app.current = new PIXI.Application({ 
            width: 800, 
            height: 600,
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        if (pixiContainer.current) {
            pixiContainer.current.appendChild(app.current.view);
        }

        fetch('/src/storage/tree.json')
            .then(response => response.json())
            .then(data => {
                const root = d3.hierarchy(data);
                const treeLayout = d3.tree().size([600, 100]);
                treeLayout(root);

                adaptD3LayoutToPixi(root, app.current);
            });

        // Improved Zoom and Pan functionality
        const container = new PIXI.Container();
        app.current.stage.addChild(container);
        app.current.stage.interactive = true; // make the stage interactive
        container.eventMode = 'static';
        let lastPosition = null; // track the last position of the mouse/touch
        let zoom = 1; // current zoom level
        const zoomSpeed = 0.1; // speed of zooming
        const minZoom = 0.1; // minimum zoom level
        const maxZoom = 10; // maximum zoom level

        // Function to update zoom based on direction
        const updateZoom = (direction) => {
            const factor = (direction > 0) ? (1 + zoomSpeed) : (1 - zoomSpeed);
            zoom = Math.min(Math.max(zoom * factor, minZoom), maxZoom);
            container.scale.set(zoom);
        };

        // Mouse wheel for zoom
        app.current.view.addEventListener('wheel', (e) => {
            e.preventDefault();
            updateZoom(-e.deltaY);
        });

        // Drag to pan
        app.current.stage.on('pointerdown', (event) => {
            lastPosition = event.data.global.clone();
        });

        app.current.stage.on('pointermove', (event) => {
            if (lastPosition) {
                const newPosition = event.data.global;
                container.x += (newPosition.x - lastPosition.x);
                container.y += (newPosition.y - lastPosition.y);
                lastPosition = newPosition;
            }
        });

        app.current.stage.on('pointerup', () => {
            lastPosition = null; // reset when the mouse is released
        });

        app.current.stage.on('pointerupoutside', () => {
            lastPosition = null; // reset when the mouse is released outside the stage
        });

    }, []);

    return <div ref={pixiContainer} className={styles.treeContainer}></div>;
};



// // src/components/TreeVisualization/Tree.tsx
// import { useEffect, useRef } from 'react';
// import * as PIXI from 'pixi.js';
// import * as d3 from 'd3';
// import { adaptD3LayoutToPixi } from '@/utils/d3PixiAdapter';
// import styles from './styles.module.css';

// export const Tree = ({ data }) => {
//     const pixiContainer = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         fetch('/src/storage/tree.json')
//             .then(response => response.json())
//             .then(data => {
//                 const app = new PIXI.Application({ 
//                     width: 600, 
//                     height: 600,
//                     backgroundColor: 0xffffff,
//                 });

//                 if (pixiContainer.current) {
//                     pixiContainer.current.appendChild(app.view);
//                 }

//                 const root = d3.hierarchy(data);
//                 const treeLayout = d3.tree().size([600, 800]);
//                 treeLayout(root);

//                 adaptD3LayoutToPixi(root, app);
//             });
//     }, []);

//     return <div ref={pixiContainer} className={styles.treeContainer}></div>;
// };

