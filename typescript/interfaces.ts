interface Food {
    calories: number
    tasty: boolean
}
interface Sushi extends Food {
    salty: boolean
}
interface Cake extends Food {
    sweet: boolean
}


// Interfaces and Classes
interface Animal {
    eat(food: string): void
    sleep(hours: number): void
}

class Cat implements Animal {
    eat(food: string) {
        console.info('Ate some', food, '. Mmm!')
    }
    sleep(hours: number) {
        console.info('Slept for', hours, 'hours')
    }
}

// Interfaces and Functions
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
