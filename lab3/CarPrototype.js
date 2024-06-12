function Car(model, year, speed, passengersNumber) {
    this.model = model;
    this.year = year;
    this.speed = speed;
    this.passengersNumber = passengersNumber;
}

Car.prototype.timeToDrive = function(distance) {
    if (distance <= 0) {
        throw new Error('Distance must be a positive number.');
    }
    return distance / this.speed; 
}

Car.prototype.timeToDeliver = function(distance, passengers) {
    if (distance <= 0) {
        throw new Error('Distance must be a positive number.');
    }
    if (passengers <= 0) {
        throw new Error('Number of passengers must be a positive number.');
    }

    let trips = Math.ceil(passengers / this.passengersNumber);
    return trips * this.timeToDrive(distance);
}

const car1 = new Car('Toyota', 2010, 100, 4);
const car2 = new Car('Honda', 2015, 120, 5);
const car3 = new Car('Ford', 2018, 90, 3);
const car4 = new Car('Tesla', 2022, 150, 4);

console.log(car1.timeToDrive(200)); 
console.log(car2.timeToDeliver(200, 7)); 
console.log(car3.timeToDeliver(300, 10)); 
console.log(car4.timeToDrive(450)); 
