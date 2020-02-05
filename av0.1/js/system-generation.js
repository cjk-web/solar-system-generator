class SolarSystemObject {
    constructor(name, type, orbit, size, color) {
        this.name = name;
        this.type = type;
        this.orbit = orbit;
        this.size = size;
        this.color = color;
    }
}

class Star extends SolarSystemObject {
    constructor(name, type, orbit, size, color) {
        super(name, type, orbit, size, color);
    }
}

class Planet extends SolarSystemObject {
    constructor(name, type, orbit, size, color, parentObject) {
        super(name, type, orbit, size, color);
        this.star = parentObject;
    }
}

class SolarSystem {
    constructor(name, stars = [], planets = []) {
        this.name = name;
        this.stars = stars;
        this.planets = planets;
    }
}

function generateSolarSystem() {
    // systemName = nameGenerator.generateSystemName
    // star(s)Count = weighted random number based on statistical chances of num stars in system.
    // starData = Star[]
    // for star(s) generate star data, names (based on system name), types, orbits, size, color, etc

    // planet(s)count = genrate a num of planets based on star data
    // planetData = Planet[]
    // for planet(s) generate planet data

    // return new System(systemName, starData, planetData)
}

generateSolarSystem();