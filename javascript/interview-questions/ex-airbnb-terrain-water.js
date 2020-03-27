// +
// ++         +
// ++   +     +
// +++ +++   ++
// ++++++++ +++
// ++++++++++++

// terrain = [5,4,2,1,2,3,2,1,0,1,2,4]
// water_amount = 8
// dump_location = 1

// dump_water(terrain, water_amount, dump_location)
// =>
// +
// ++         +
// ++WWW+     +
// +++W+++WWW++
// ++++++++W+++
// ++++++++++++

// terrain = [5,4,2,1,2,3,2,1,0,1,2,4]
// water_amount = 8
// dump_location = 10

// dump_water(terrain, water_amount, dump_location)
// =>
// +
// ++         +
// ++   + WWWW+
// +++ +++WWW++
// ++++++++W+++
// ++++++++++++

// terrain = [5,4,2,1,2,3,2,1,0,1,2,4]
// water_amount = 100
// dump_location = 10

// dump_water(terrain, water_amount, dump_location)
// =>
// +
// ++WWWWWWWWW+
// ++WWW+WWWWW+
// +++W+++WWW++
// ++++++++W+++
// ++++++++++++
//

//    V
//      +
// ++++++

// +    V   +
// ++++++++ +
// ++++++++++
const terrain = [5, 4, 2, 1, 2, 3, 2, 1, 0, 1, 2, 4];

function printTerrain(terrain) {
    let max = Math.max(...terrain);

    let n = terrain.length;

    for (let h = max; h > -1; h--) {
        let terrainLayer = [];

        for (let i = 0; i < n; i++) {
            if (terrain[i] >= h) {
                terrainLayer.push("+");
            } else {
                terrainLayer.push(" ");
            }
        }
        console.log(terrainLayer.join(""));
    }
}

// Returns index of where to drop water next
function findLocalMin(water, dumpLocation) {
    let dumpLocationVal = water[dumpLocation];

    let leftIndex = dumpLocation - 1;
    while (leftIndex >= 0) {
        if (water[leftIndex] < dumpLocationVal) {
            if (water[leftIndex - 1] > water[leftIndex]) {
                return leftIndex;
            }
        }
        leftIndex--;
    }

    let rightIndex = dumpLocation + 1;
    while (rightIndex < water.length) {
        if (water[rightIndex] === dumpLocationVal) {
            rightIndex++;
        } else if (water[rightIndex] < dumpLocationVal) {
            if (water[rightIndex + 1] < water[rightIndex]) {
                rightIndex++;
            } else {
                return rightIndex;
            }
        }
    }

    return null;
}

function dumpWater(terrain, waterAmount, dumpLocation) {
    let water = new Array(terrain.length);
}

// printTerrain(terrain)

// test findLocalMin
console.log(findLocalMin(terrain, 1));
console.log(findLocalMin(terrain, 10));
