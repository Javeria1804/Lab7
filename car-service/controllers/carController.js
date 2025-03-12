let cars = [];

exports.addCar = (req, res) => {
    const { carId, model, location } = req.body;
    const newCar = { carId, model, location, isAvailable: true };
    cars.push(newCar);
    res.status(201).json(newCar);
};

exports.getCar = (req, res) => {
    const car = cars.find(c => c.carId === req.params.carId);
    if (!car) return res.status(404).send('Car not found');
    res.json(car);
};

exports.updateCar = (req, res) => {
    const car = cars.find(c => c.carId === req.params.carId);
    if (!car) return res.status(404).send('Car not found');
    
    car.isAvailable = req.body.isAvailable;
    res.json(car);
};
