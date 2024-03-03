import { INodeStore } from '@/interfaces/stores/INodeStore';
import { INode } from '@/entities/INode';

export class GetTree2 {
    constructor(private store: INodeStore) {}

    async execute(): Promise<void> {
        // Business logic to construct the tree from nodes
        // This could involve fetching nodes from the store and organizing them into a tree structure
        // The specific implementation would depend on how nodes are stored and how the tree needs to be constructed
    }
}


// // useCases/GetTree.ts

// import { INodeStore } from '../interfaces/stores/INodeStore';
// import { INode } from '../entities/INode';

// export class GetTree {
//     private store: INodeStore;

//     constructor(store: INodeStore) {
//         this.store = store;
//     }

//     async execute(): Promise<INode> {
//         // Assuming the store has a method to construct and return the tree structure
//         const tree = await this.store.getTree();
//         return tree;
//     }
// }
