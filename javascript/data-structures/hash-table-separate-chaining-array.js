const defaultSize = 7;
const hasPrimeFactor = 23;

// Approach: Separate Chaining with Arrays
// One way of solving collisions is separate chaining with arrays, where we have
// an array that contains all the addresses (i.e. the address space), and an array at each address,
// and we push to each inner array whenever a new key-value pair receives that address:
//  [ ['apples', 4], ['oranges', 8] ].
class HashTable {
    constructor(size = defaultSize) {
        this.addresses = new Array(size);
    }

    _hash(key) {
        const keyCharacters = Array.from(key);
        const keyCode = keyCharacters.reduce((acc, character) => {
            return acc + character.charCodeAt(0) * hasPrimeFactor;
        }, 0);

        return keyCode % this.addresses.length;
    }

    set(key, value) {
        const index = this._hash(key);
        console.log("set index", index);
        if (!this.addresses[index]) {
            this.addresses[index] = [];
        }

        this.addresses[index].push([key, value]);

        return this;
    }

    get(key) {
        const index = this._hash(key);

        if (this.addresses[index]) {
            for (const [itemKey, value] of this.addresses[index]) {
                if (itemKey === key) {
                    return value;
                }
            }
        }
        return undefined;
    }

    keys() {
        const result = [];

        for (let i = 0; i < this.addresses.length; i++) {
            if (this.addresses[i]) {
                for (const [key] of this.addresses[i]) {
                    result.push(key);
                }
                // Another way
                // result.concat(this.addresses[i].map(([key]) => key));
            }
        }
        return result;
    }

    print() {
        console.dir(this.addresses);
    }
}

const hashTable = new HashTable();
hashTable.set("monster", "come");
hashTable.set("pato", "duerme");
hashTable.set("cucas", "vuela");
hashTable.set("mitin", "salta");
hashTable.print();

hashTable.get("pato");
hashTable.keys();
