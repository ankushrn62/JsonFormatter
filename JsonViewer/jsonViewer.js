import { LightningElement, api, track } from 'lwc';

export default class jsonViewer extends LightningElement {
    @api jsonString = {
    "user": {
        "id": 101,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "roles": ["admin", "user"],
        "active": true,
        "profile": {
            "age": 30,
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "zipCode": "12345",
                "country": "USA"
            },
            "preferences": {
                "newsletter": true,
                "notifications": {
                    "email": true,
                    "sms": false
                }
            }
        }
    },
    "products": [
        {
            "id": "p100",
            "name": "Widget",
            "price": 19.99,
            "categories": ["gadgets", "tools"]
        },
        {
            "id": "p200",
            "name": "Gizmo",
            "price": 29.99,
            "categories": ["gadgets", "electronics"]
        }
    ],
    "orderHistory": [
        {
            "orderId": "5001",
            "date": "2023-01-15",
            "status": "shipped",
            "items": [
                {
                    "productId": "p100",
                    "quantity": 2
                },
                {
                    "productId": "p200",
                    "quantity": 1
                }
            ]
        },
        {
            "orderId": "5002",
            "date": "2023-01-20",
            "status": "delivered",
            "items": [
                {
                    "productId": "p100",
                    "quantity": 1
                }
            ]
        }
    ]
};
    @track jsonData;

    connectedCallback() {
        this.parseJson();
    }

    parseJson() {
        try {
            // this.jsonData = this.jsonString;
            this.jsonData = this.createNodeStructure(this.jsonString);
            console.log('json viewer--',JSON.stringify(this.jsonData));
        } catch (error) {
            console.error('Invalid JSON', error?.toString());
            this.jsonData = null;
        }
    }

    createNodeStructure(obj, key = 'root') {
    let node = {
        key: key,
        value: '',
        expanded: false,
        isParent: obj !== null && typeof obj === 'object',
        children: []
    };

    if (node.isParent) {
        for (let [childKey, value] of Object.entries(obj)) {
            if (typeof value === 'object') {
                // Recursive call for child objects or arrays
                node.children.push(this.createNodeStructure(value, childKey));
            } else {
                // Directly add primitive types (string, number, boolean, etc.)
                node.children.push({
                    key: childKey,
                    value: value,
                    expanded: false,
                    isParent: false
                });
            }
        }
    } else {
        // Set the value for primitive types
        node.value = obj;
    }

    return node;
}

}