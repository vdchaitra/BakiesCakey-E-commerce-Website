import cakeModel from "../models/cakeModel.js";
import fs from 'fs';
import path from 'path';

// Add cake items
const addCake = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageFilename = req.file.filename;

    const cake = new cakeModel({
        name: req.body.name,
        description: req.body.description,
        kg: req.body.kg,
        price: req.body.price,
        category: req.body.category,
        occasion: req.body.occasion,
        image: imageFilename
    });

    try {
        await cake.save();
        res.status(201).json({ success: true, message: "Cake Added", data: cake });
    } catch (error) {
        console.error("Error adding cake:", error);
        res.status(500).json({ success: false, message: "Error adding cake", error });
    }
};

// List all cakes
const listCake = async (req, res) => {
    try {
        const cakes = await cakeModel.find({});
        res.status(200).json({ success: true, data: cakes });
    } catch (error) {
        console.error("Error listing cakes:", error);
        res.status(500).json({ success: false, message: "Error listing cakes", error });
    }
};

// Remove cake item
const removeCake = async (req, res) => {
    try {
        const cake = await cakeModel.findById(req.body.id);
        if (!cake) {
            return res.status(404).json({ success: false, message: "Cake not found" });
        }

        const imagePath = path.join('uploads', cake.image);

        // Delete the image file
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            }
        });

        await cakeModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Cake removed" });
    } catch (error) {
        console.error("Error removing cake:", error);
        res.status(500).json({ success: false, message: "Error removing cake", error });
    }
};

export { addCake, listCake, removeCake };
