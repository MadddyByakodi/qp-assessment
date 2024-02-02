const util = require('util');
const db = require("../helpers/db");

const query = util.promisify(db.query).bind(db);

exports.placeOrder = async (req, res) => {
    try {
        const { cart_id, user_id, address_id, payment_status } = req.body;
        if (!cart_id || !user_id || !address_id || !payment_status) {
            return res.status(401).json({ error: 'All feilds are required.' });
        } else {
            let totalcost = 0
            const cartProducts = await query('SELECT * FROM `cart_detail` where cart_id =?', [cart_id]);
            const products_deatils = await Promise.all(cartProducts.map(async (product) => {
                const products = await query("Select product_id, name, price, unit, details, inventory from product_details where product_id = ? and status = 1", [product.product_id]);
                if (products[0].inventory > product.qty) {
                    return res.status(401).json({ error: 'out of stock', products });
                }
                totalcost += product.qty * products[0].price;
                return products;
            }));
            const order = await query("Insert into orders (`cart_id`,`user_id`,`address_id`,`total_price`,`payment_status`) values (?,?,?,?,?)", [cart_id, user_id, address_id, totalcost, payment_status]);
            await Promise.all(cartProducts.map(async (product) => {
                await query("Insert into order_deatils (`order_id`,`user_id`,`product_id`,`qty`) values (?,?,?,?)", [order.insertId, user_id, product.id, product.qty])
            }));
            res.status(200).json({ message: 'Order places', newcart, cartdetails });
        }
    } catch (error) {
        console.log(error);
    }

};

exports.getOrderDeatils = async (req, res) => {
    try {
        const order_id = req.query.id;
        if (!order_id) { return res.status(401).json({ error: 'All feilds are required.' }); }
        const order = await query("select * from orders where id = ?", [order_id]);
        const order_deatils = await query("select * from order_deatils where order_id = ?", [order_id]);
        const products_deatils = await Promise.all(order_deatils.map(async (product) => {
            return await query("Select product_id, name, price, unit, details, inventory from product_details where product_id = ? and status = 1", [product.product_id]);
        }));
        res.status(200).json({ message: 'Order Details', order, order_deatils, products_deatils });
    } catch (error) {
        console.log(error);
    }
}