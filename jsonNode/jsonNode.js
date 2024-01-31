import { LightningElement, api, track } from 'lwc';

export default class JsonNode extends LightningElement {
    @api node;
    @track toggleLabel = '+';

    connectedCallback() {
        this.updateToggleLabel();
    }

    updateToggleLabel() {
        try {
            this.toggleLabel = this.node.expanded ? '-' : '+';
        }
        catch (e) {
            console.log(e?.toString());
        }
    }

    toggleNode() {
        this.node = { ...this.node, expanded: !this.node.expanded }; // Update the node in an immutable way
    }
}