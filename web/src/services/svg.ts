// import source from '../storage/data';
// import * as d3 from 'd3';

// const data = source.data;
// console.log(data);
// const width = 1440;

// const processData = (data: { name: any; }[]) => {
//     const base = data[0].name;
//     // assuming, the first entry of data is the parent of all
//     const newData = {
//         name: base,
//         children: [],
//     };

//     data.forEach(({ name }) => {

//         let path = name;

//         if (name.indexOf(base) !== -1) {
// 		    path = name.substring(base.length, name.length);
//         }

//         if (path === '') {
//             return;
//         }

//         if (path.indexOf('/') === -1) {
//             if (!newData.children.find(child => child === path)) {
//             	newData.children.push({name: path, children: []});
//             };
//         } else {
//     		    const parent = path.substring(0, path.indexOf('/'));

//             let parentObj = newData.children.find((child) => child.name === parent);

//             if (!parentObj) {
//                 let quickParent = data.find(d => d.name === base + parent);
//                 if (!quickParent) {
//                     quickParent = {
//                         name: parent,
//                     }
//                 } else {
//                 	quickParent.name = quickParent.name.substring(base.length, quickParent.name.length)
//                 }
//                 const parentObjIndex = newData.children.push(quickParent);
//                 parentObj = newData.children[parentObjIndex-1];
//             }

//             path = path.substring(path.indexOf('/') + 1, path.length);

//             if (parentObj.children) {
//                 parentObj.children.push({name: path});
//             } else {
//                 parentObj.children = [{name: path}];
//             }
//         }
//     });

//     return newData;
// };

// const tree = (treeData) => {
//     const root = d3.hierarchy(treeData);
//     root.dx = 10;
//     root.dy = width / (root.height + 1);
//     return d3.tree().nodeSize([root.dx, root.dy])(root);
// };

// const chart = () => {
//     const processedData = processData(data);
//     const root = tree(processedData);

//     let x0 = Infinity;
//     let x1 = -x0;
//     root.each(d => {
//         if (d.x > x1) x1 = d.x;
//         if (d.x < x0) x0 = d.x;
//     });

//     const svg = d3.create("svg")
//         .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

//     const g = svg.append("g")
//         .attr("font-family", "sans-serif")
//         .attr("font-size", 8)
//         .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

//     const link = g.append("g")
//         .attr("fill", "none")
//         .attr("stroke", "#555")
//         .attr("stroke-opacity", 0.4)
//         .attr("stroke-width", 1.5)
//         .selectAll("path")
//         .data(root.links())
//         .join("path")
//         .attr("d", d3.linkHorizontal()
//             .x(d => d.y)
//             .y(d => d.x));

//     const node = g.append("g")
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-width", 3)
//         .selectAll("g")
//         .data(root.descendants())
//         .join("g")
//         .attr("transform", d => `translate(${d.y},${d.x})`);

//     node.append("circle")
//         .attr("fill", d => d.children ? "#555" : "#999")
//         .attr("r", 2.5);

//     node.append("text")
//         .attr("dy", "0.31em")
//         .attr("x", d => d.children ? -6 : 6)
//         .attr("text-anchor", d => d.children ? "end" : "start")
//         .text(d => d.data.name)
//         .clone(true).lower()
//         .attr("stroke", "white");

//     return svg.node();
// }

// export default window.treeChart = chart;