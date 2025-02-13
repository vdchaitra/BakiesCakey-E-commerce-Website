import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    kg: { type: String, required: true },
    occasion: { type: String, required: true },
    image: { type: String, required: true }
});

const cakeModel = mongoose.model('Cake', cakeSchema);

export default cakeModel;
