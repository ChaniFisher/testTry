const dataDynamic = require('../models/SchemaDynamic');
const Cart = require('../models/SchemaCart');
let jsonDynamic = require("../models/DataDynamic.json")


const getAllKeys = async (req, res) => {
    try {
        let jsonSend = Object.keys(jsonDynamic[0])
        res.status(200).json(jsonSend);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}

const saveCart = async (req, res) => {
    let cart;
    try {
        cart = await new Cart({ products: req.body });        
        await cart.save();        
        res.status(201).send('סל הקניות נשמר בהצלחה!');
    } catch (error) {
        console.error('שגיאה בשמירה:', error);
        res.status(500).send('שגיאה בשמירה');
    }
};

const deleteField = async (req, res) => {
    try {
        const cart = await Cart.findOne();  
        if (!cart) {
            console.log("Cart not found");
            return res.status(404).send("Cart not found");
        }
        // חפש את המוצר בתוך המערך של המוצרים
        console.log("PP",cart);
        const productIndex = cart.products.findIndex(product => product.myCustomId === req.body.id);

        if (productIndex === -1) {
            console.log("Item not found in cart");
            return res.status(404).send("Item not found in cart");
        }

        // מחק את המוצר מהמערך
        cart.products.splice(productIndex, 1);
        await cart.save(); // שמור את השינויים

        console.log("Success delete!!", cart.products);
        return res.status(200).send("Item deleted successfully");
    } catch (err) {
        console.log("Error deleting item:", err);
        return res.status(500).send("Error deleting item");
    }
}


module.exports = { getAllKeys, deleteField, saveCart }
