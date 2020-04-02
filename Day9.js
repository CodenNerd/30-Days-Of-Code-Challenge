class Car{
    constructor(){
        this.tyres = 4;     // default value for tyres
    }
    getTyres(){
        return this.tyres;
    }
    setTyres(n){
        this.tyres = n;
    }
}

const car = new Car();
console.log(car.getTyres());
car.setTyres(8);        // set a new number of tyres -- in case your car is a limousine :)
console.log(car.getTyres());
