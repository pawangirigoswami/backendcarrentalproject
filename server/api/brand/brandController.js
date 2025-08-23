const Brand = require("./brandModel")

const addBrand = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.json({
                status: 400,
                success: false,
                message: "All fields are required",
            });
        }

        const newBrand = new Brand({ name, description });
        await newBrand.save();

        return res.json({
            status: 201,
            success: true,
            message: "Brand created successfully",
            data: newBrand
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

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json({
            status: 200,
            success: true,
            message: "All brands retrieved successfully",
            data: brands
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




const getBrandById = async (req, res) => {
    try {
        const { id } = req.body;  // Get ID from body instead of params

        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "Brand ID is required in request body"
            });
        }

        const brand = await Brand.findById(id);
        if (!brand) {
            return res.json({
                status: 404,
                success: false,
                message: "Brand not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            data: brand
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


const updateBrand = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;  // Get ID and other data

        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "Brand ID is required in request body"
            });
        }

        const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBrand) {
            return res.json({
                status: 404,
                success: false,
                message: "Brand not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Brand updated successfully",
            data: updatedBrand
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


const deleteBrand = async (req, res) => {
    try {
        const { id } = req.body;  // Get ID from body

        if (!id) {
            return res.json({
                status: 400,
                success: false,
                message: "Brand ID is required in request body"
            });
        }

        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.json({
                status: 404,
                success: false,
                message: "Brand not found"
            });
        }

        res.json({
            status: 200,
            success: true,
            message: "Brand deleted successfully"
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

module.exports = {addBrand,getBrands, getBrandById, updateBrand, deleteBrand };
