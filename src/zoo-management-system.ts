interface TfeedingStrategy{
    eatingMethod(): void;
}

interface THabitat{
    temperature: number;
    feedingSchedule: string[];
    cleanliness: number;
}

enum eDietry{
    HERB = "Herbivore",
    CARN = "Carnivore",
    OMN = "Omnivore"
}

enum eRole{
    ZOOKEEPER = "Zookeeper",
    VET = "Vet"
}

abstract class Animal implements TfeedingStrategy{
    protected name: string;
    protected origin: string;
    protected diet: eDietry;
    protected age: number;
    protected weight: number;
    protected habitat: THabitat;

    constructor(_name: string, _origin: string, _diet: eDietry, _age: number, _weight: number, _habitat: THabitat){
        this.name = _name;
        this.origin = _origin;
        this.diet = _diet;
        this.age = _age;
        this.weight = _weight;
        this.habitat = _habitat;
    }

    abstract makeMovement(): void;
    abstract eatingMethod(): void;
    abstract makeSound(): void;
    abstract adjustHabitat(_habitat: THabitat): void;
    abstract takeVaccine(): void;
}

class Monitor{
    name: string;
    role: eRole;
    age: number;

    constructor(_name: string, _role: eRole, _age: number){
        this.name = _name;
        this.role = _role;
        this.age = _age;
    }

    performDuty(){
        console.log("Performing duty!");
    }
}

class Bird extends Animal{
    canFLy: boolean;
    typeOfBeak: string;

    constructor(_name: string, _origin: string, _diet: eDietry, _age: number, _weight: number, _habitat: THabitat, _canFLy: boolean, _typeOfBeak: string){
        super(_name, _origin, _diet, _age, _weight, _habitat);
        this.canFLy = _canFLy;
        this.typeOfBeak = _typeOfBeak;
    }
    
    eatingMethod(): void {
        switch(this.diet){
            case "Carnivore":
                console.log(this.name + " eats meat");
            break;
            case "Herbivore":
                console.log(this.name + " eats herbivore stuff");
            break;
            case "Omnivore":
                console.log(this.name + " eats meat and herbivore stuff");
            break;

        }
        
    }
    makeMovement(): void {
        if(this.canFLy)
            console.log(this.name + " flys around");
        else
            console.log(this.name + " probably walking with its useless wings!");
    }
    makeSound(): void {
        console.log(this.name + " chirps!");
    }
    adjustHabitat(_habitat: THabitat): void {
        this.habitat = _habitat;
        console.log("Habitat for " + this.name + " has been adjusted to ");
        console.log(this.habitat);
    }
    takeVaccine(): void {
        console.log(this.name + " takes vaccine!");
    }
}

class Mammal extends Animal{
    noOfLegs: number;
    hasTail: boolean;

    constructor(_name: string, _origin: string, _diet: eDietry, _age: number, _weight: number, _habitat: THabitat, _noOfLegs: number, _hasTail: boolean){
        super(_name, _origin, _diet, _age, _weight, _habitat);
        this.noOfLegs = _noOfLegs;
        this.hasTail = _hasTail;
    }
    
    eatingMethod(): void {
        switch(this.diet){
            case "Carnivore":
                console.log(this.name + " eats meat");
            break;
            case "Herbivore":
                console.log(this.name + " eats herbivore stuff");
            break;
            case "Omnivore":
                console.log(this.name + " eats meat and herbivore stuff");
            break;

        }
    }
    makeMovement(): void {
        if(this.hasTail)
            console.log(this.name + " walks while wiggling its tail!")
        else
        console.log(this.name + " walks around!");
    }
    makeSound(): void {
        console.log(this.name + " makes sound");
    }
    adjustHabitat(_habitat: THabitat): void {
        this.habitat = _habitat;
        console.log("Habitat for " + this.name + " has been adjusted to ");
        console.log(this.habitat);
    }
    takeVaccine(): void {
         console.log(this.name + " takes vaccine!");
    }
}

class Reptile extends Animal{
    hasLegs: boolean;
    
    constructor(_name: string, _origin: string, _diet: eDietry, _age: number, _weight: number, _habitat: THabitat, _hasLegs: boolean){
        super(_name, _origin, _diet, _age, _weight, _habitat);
        this.hasLegs = _hasLegs;
    }
    
    eatingMethod(): void {
        switch(this.diet){
            case "Carnivore":
                console.log(this.name + " eats meat");
            break;
            case "Herbivore":
                console.log(this.name + " eats herbivore stuff");
            break;
            case "Omnivore":
                console.log(this.name + " eats meat and herbivore stuff");
            break;

        }
    }
    makeMovement(): void {
        if(this.hasLegs)
            console.log(this.name + " walks around");
        else
            console.log(this.name + " crawls around");
    }
    makeSound(): void {
        console.log(this.name + " makes sound");
    }
    adjustHabitat(_habitat: THabitat): void {
        this.habitat = _habitat;
        console.log("Habitat for " + this.name + " has been adjusted to ");
        console.log(this.habitat);
    }
    takeVaccine(): void {
         console.log(this.name + " takes vaccine!");
    }
}

class Zookeeper extends Monitor{
    private animals: Animal[];
    
    constructor(_name: string, _role: eRole, _age: number){
        super(_name, _role, _age);
        this.animals = [];
    }

    adoptAnimal(newAnimal: Animal){
        this.animals.push(newAnimal);
    }

    controlEnrivonment(newEnv: THabitat){
        this.animals.forEach((animal) => {
            animal.adjustHabitat(newEnv);
        })
    }
    feedAnimals(){
        this.animals.forEach(animal=>{
            animal.eatingMethod();
        })
    }
}


class Vet extends Monitor{
    private animals: Animal[];
    
    constructor(_name: string, _role: eRole, _age: number){
        super(_name, _role, _age);
        this.animals = [];
    }

    admitAnimal(_animal: Animal): void{
        this.animals.push(_animal);
    }


    vaccinateAnimals(){
        this.animals.forEach(animal=>{
            animal.takeVaccine();
        })
    }

}

function zooStation(){
    let zookeper1 = new Zookeeper("Mike", eRole.ZOOKEEPER, 20);
    let vet1 = new Vet("Enockh", eRole.VET, 22);

    let animal1 = new Bird("Eagle", "South America", eDietry.CARN, 10, 12, {temperature: 27,feedingSchedule:["Mon 10 and 4", "Tue 2 and 5"], cleanliness: 7 }, true,"Short curved");
    let animal2 = new Mammal("Monkey", "South Africa", eDietry.OMN, 18, 25, {temperature: 25,feedingSchedule:["Mon 8 and 2", "Tue 8 and 5"], cleanliness: 7 },2,true);
    let animal3 = new Reptile("Lizard", "South America", eDietry.CARN, 4, 0.5, {temperature: 29,feedingSchedule:["Mon 10 and 4", "Tue 2 and 5"], cleanliness: 5 }, true);


    zookeper1.adoptAnimal(animal1);
    zookeper1.adoptAnimal(animal2);
    zookeper1.adoptAnimal(animal3);

    zookeper1.feedAnimals();

    console.log();

    vet1.admitAnimal(animal1);
    vet1.admitAnimal(animal2);
    vet1.admitAnimal(animal3);

    vet1.vaccinateAnimals();

    console.log();
    
    animal1.makeSound();
    animal2.makeSound();
    animal3.makeSound();
}

zooStation();