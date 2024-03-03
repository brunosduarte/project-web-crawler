import { INodeStore } from '@/interfaces/stores/INodeStore';
import { INode } from '@/entities/INode';

export class ListNodes {
    constructor(private store: INodeStore) {}

    async execute(): Promise<INode[]> {
        try {
            const nodes = await this.store.list();
            // Additional business logic can be applied here if needed
            return nodes;
        } catch (e) {
            console.error('Error listing nodes', e);
            throw new Error('Unable to list nodes');
        }
    }
}
