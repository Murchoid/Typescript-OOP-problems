interface TfeedingStrategy{
    eatingMethod(): string;
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
    abstract eatingMethod(): string;
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
        console.log("Performing duty!";)
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
    
    eatingMethod(): string {
        
    }
    makeMovement(): void {
        
    }
    makeSound(): void {
        
    }
    adjustHabitat(_habitat: THabitat): void {
        
    }
    takeVaccine(): void {
        
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
    
    eatingMethod(): string {
        
    }
    makeMovement(): void {
        
    }
    makeSound(): void {
        
    }
    adjustHabitat(THabitat): void {
        
    }
    takeVaccine(): void {
        
    }
}

class Reptile extends Animal{
    hasLegs: boolean;
    
    constructor(_name: string, _origin: string, _diet: eDietry, _age: number, _weight: number, _habitat: THabitat, _hasLegs: boolean){
        super(_name, _origin, _diet, _age, _weight, _habitat);
        this.hasLegs = _hasLegs;
    }
    
    eatingMethod(): string {
        
    }
    makeMovement(): void {
        
    }
    makeSound(): void {
        
    }
    adjustHabitat(_habitat: THabitat): void {
        
    }
    takeVaccine(): void {
        
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

