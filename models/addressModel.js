const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    type: {
        type: String,
        enum: ["Home", "Work", "Other"],
        default: "Home",
        required: true
    },
    isDefault: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;