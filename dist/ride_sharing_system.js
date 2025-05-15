class Ride {
    _pickup;
    _dropoff;
    constructor(pickup, dropoff) {
        this._pickup = pickup;
        this._dropoff = dropoff;
    }
    get pickup() {
        return this._pickup;
    }
    get dropoff() {
        return this._dropoff;
    }
    distancePick() {
        switch (this.pickup) {
            case "within 300km":
                return 300;
            case "within 400km":
                return 400;
            case "within 500km":
                return 500;
            default:
                return 0;
        }
    }
    distanceDrop() {
        switch (this.dropoff) {
            case "within 300km":
                return 300;
            case "within 400km":
                return 400;
            case "within 500km":
                return 500;
            default:
                return 0;
        }
    }
    distance() {
        const totalDistance = this.distancePick() + this.distanceDrop();
        return totalDistance;
    }
    daytime() {
        const now = new Date();
        const hours = now.getHours();
        if (hours >= 7 && hours <= 9) {
            return 1.5;
        }
        else if (hours >= 9 && hours <= 12) {
            return 1.8;
        }
        else if (hours >= 12 && hours <= 15) {
            return 2.0;
        }
        else if (hours >= 15 && hours <= 19) {
            return 2.5;
        }
        return 1.0;
    }
    traffic(condition) {
        switch (condition) {
            case "low":
                return 1.0;
            case "medium":
                return 1.5;
            case "high":
                return 2.0;
            default:
                return 0;
        }
    }
    price() {
        const distance = this.distance();
        //Assuming traffic is medium for the day
        const traffic = this.traffic("medium");
        const rate = (traffic + this.daytime()) / 2;
        if (distance <= 600) {
            return distance * rate;
        }
        else if (distance <= 1000) {
            return distance * rate;
        }
        else if (distance <= 2000) {
            return distance * rate;
        }
        else if (distance > 2000) {
            return distance * rate;
        }
        return 0;
    }
    NearestDriver(passenger, driver) {
        const closeness = {
            latitude: passenger.location.latitude - driver.location.latitude,
            longitude: passenger.location.longitude - driver.location.longitude
        };
        return closeness;
    }
}
class VehicleManage {
    _model;
    _plateNumber;
    constructor(model, plateNumber) {
        this._model = model;
        this._plateNumber = plateNumber;
    }
    get model() {
        return this._model;
    }
    get plateNumber() {
        return this._plateNumber;
    }
    set model(value) {
        this._model = value;
    }
    set plateNumber(value) {
        this._plateNumber = value;
    }
    toString() {
        return ` ${this._model} - Plate: ${this._plateNumber}`;
    }
}
class User {
    _name;
    _email;
    _phone;
    _location;
    constructor(name, email, phone, location) {
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._location = location;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get phone() {
        return this._phone;
    }
    get location() {
        return this._location;
    }
}
class Driver extends User {
    _car;
    _vehicles = [];
    constructor(name, email, car, location, phone) {
        super(name, email, phone, location);
        this._car = car;
    }
    get car() {
        return this._car;
    }
    addVehicle(vehicle) {
        this._vehicles.push(vehicle);
    }
    get vehicles() {
        return this._vehicles;
    }
    listVehicles() {
        this._vehicles.forEach(vehicle => {
            console.log(vehicle.toString());
        });
    }
}
class RideHistory {
    _rides;
    constructor() {
        this._rides = [];
    }
    addRide(ride) {
        this._rides.push(ride);
    }
    get rides() {
        return this._rides;
    }
}
class Passenger extends User {
    _cc;
    _rideHistory;
    constructor(name, email, phone, location, cc, rideHistory) {
        super(name, email, phone, location);
        this._cc = cc;
        this._rideHistory = new RideHistory();
    }
    get rideHistory() {
        return this._rideHistory;
    }
    get cc() {
        return this._cc;
    }
}
// Example scenario
const trip = new Ride("within 300km", "within 400km");
console.log("Pickup distance:", trip.distancePick());
console.log("Dropoff distance:", trip.distanceDrop());
console.log("Distance:", trip.distance());
console.log("Price:", trip.price());
const passenger = new Passenger("John Doe", "john@example.com", 1234567890, { latitude: 10, longitude: 20 }, 1234567890123456);
console.log("Ride history for passenger:", passenger.rideHistory.rides);
const driver = new Driver("Jane Smith", "jane@example.com", "Toyota", { latitude: 12, longitude: 22 }, 9876543210);
passenger.rideHistory.addRide(trip);
console.log(`Nearest Driver: ${driver.name}`, "\nDistance to passenger:", trip.NearestDriver(passenger, driver));
const vehicle1 = new VehicleManage("Toyota", "KAA 123A");
const vehicle2 = new VehicleManage("Honda", "KAA 456B");
driver.addVehicle(vehicle1);
driver.addVehicle(vehicle2);
console.log("Vehicles currently operational:");
driver.listVehicles();
