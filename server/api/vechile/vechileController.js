const Vehicle = require("./vechileModel");
const Car = require("../car/carModel");


const addVehicle = async (req, res) => {
    try {
        const { carId, rent, description } = req.body;

        if (!carId || !rent || !description) {
            return res.json({
                status: 400,
                success: false,
                message: "All fields are required",
            });
        }

        // Check if the Car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.json({
                status: 404,
                success: false,
                message: "Car not found",
            });
        }

        const newVehicle = new Vehicle({
            car: carId,
            rent,
            description,
        });

        await newVehicle.save();

        return res.json({
            status: 201,
            success: true,
            message: "Vehicle added successfully",
            data: newVehicle,
        });

    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("car", "name image description");

        return res.json({
            status: 200,
            success: true,
            message: "All vehicles retrieved",
            data: vehicles
        });

    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


module.exports = {addVehicle,getVehicles}