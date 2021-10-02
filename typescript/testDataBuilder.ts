import { User } from "./user";

export class UserBuilder {
    private readonly _user: User;

    constructor() {
        this._user = {
            name: "",
            age: 0,
        };
    }

    name(name: string): UserBuilder {
        this._user.name = name;
        return this;
    }

    age(age: number): UserBuilder {
        this._user.age = age;
        return this;
    }

    build(): User {
        return this._user;
    }
}


// Using it:
const userWithName: User = new UserBuilder().name("John").build();

// Or
const aDataSet = () => new UserBuilder();

aDataSet().name("John").build();


// Reference: https://betterprogramming.pub/lets-look-at-the-builder-pattern-in-typescript-fb9cf202c04d

// Another example:
import { BulletChartData } from "./bulletD3Chart";

const initialConfig = {
    measure: 150,
};

export class BulletChartTestDataBuilder {
    private config: BulletChartData[];

    constructor(config: Partial<BulletChartData[]>) {
        this.config = [
            {
                ...initialConfig,
                ...config[0],
            },
        ] as BulletChartData[];
    }

    withTopAndBottomRange(): BulletChartTestDataBuilder {
        const attr = {
            ranges: [100, 200],
        };
        this.config = [
            {
                ...this.config[0],
                ...attr,
            },
        ];

        return this;
    }

    withBottomBound(): BulletChartTestDataBuilder {
        const attr = {
            ranges: [130],
        };
        this.config = [
            {
                ...this.config[0],
                ...attr,
            },
        ];

        return this;
    }

    build(): BulletChartData[] {
        return this.config;
    }
}

export const aBulletTestData = (config?: Partial<BulletChartData[]>) =>
    new BulletChartTestDataBuilder(config || []);
