const util = require('util');
const db = require("../helpers/db");

const query = util.promisify(db.query).bind(db);

exports.addtocart = (req, res) => {
    try {
        const { product_id, qunatity, user_id, device_token } = req.body;
        if (!product_id || !qunatity || (!user_id && !device_token)) {
            return res.status(401).json({ error: 'All feilds are required.' });
        } else {

            db.query("Select * from product_details where product_id = ?", [product_id], async (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ error: 'Somethingg went wrong' });
                } else if (results.length == 0 && results[0].inventory < qunatity) {
                    return res.status(401).json({ error: 'no products available' });
                } else if (qunatity > results[0].inventory) {
                    return res.status(401).json({ error: 'product qunatity not available' });
                } else {
                    let cart, user = 0, device = '';
                    if (user_id) {
                        cart = await query("Select * from cart where user_id = ? && status = 1", [user_id]);
                        user = user_id;
                    } else {
                        cart = await query("Select * from cart where device_token = ? && status = 1", [device_token]);
                        device = device_token;
                    }
                    if (cart.length == 0) {
                        let totalcost = qunatity * results[0].price;
                        const newcart = await query("Insert into cart (user_id, device_token,products,total_price,status,created_date,modified_date) values (?,?,?,?,1,NOW(),NOW())", [user, device, product_id.toString(), totalcost]);
                        const cartdetails = await query("INSERT INTO `cart_detail` (`cart_id`, `product_id`, `qty`, `status`, `created_date`, `modify_date`) VALUES (?, ?, ?, '1', NOW(), NOW())", [newcart.insertId, product_id, qunatity]);
                        res.status(200).json({ message: 'Product Added successfully' }, newcart, cartdetails);
                    } else {
                        let totalcost = cart[0].total_price + (qunatity * results[0].price);
                        let products = cart[0].products.concat(",", product_id);
                        const newcart = await query("UPDATE cart  SET user_id =?, device_token=?,products=?,total_price=?,status=1,modified_date=NOW() where id =?", [user, device, products, totalcost, cart[0].id]);
                        const cartdetails = await query("INSERT INTO `cart_detail` (`cart_id`, `product_id`, `qty`, `status`, `created_date`, `modify_date`) VALUES (?, ?, ?, '1', NOW(), NOW())", [cart[0].id, product_id, qunatity]);
                        res.status(200).json({ message: 'Product Added successfully' }, newcart, cartdetails);
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }

}

exports.getCartDetails = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const device_token = req.query.token;
        if (!user_id && !device_token) {
            return res.status(401).json({ error: 'All required feilds are mandatory.' });
        } else if (user_id) {
            const cart = await query("Select * from cart where user_id = ? && status = 1 ORDER BY `modified_date` DESC LIMIT 1", [user_id]);
            const cart_detail = await query("select * from cart_detail where cart_id = ?", [cart[0].id]);
            const products = await Promise.all(cart_detail.map(async (product) => {
                const product_details = await query("Select product_id, name, price, unit, details from product_details where product_id = ? and status = 1", [product.product_id]);
                return product_details;
            }));
            res.status(200).json({ message: 'cart deatils', cart, cart_detail, products });
        } else {
            const cart = await query("Select * from cart where device_token = ? && status = 1 ORDER BY `modified_date` DESC LIMIT 1", [device_token]);
            const cart_detail = await query("select * from cart_detail where cart_id = ?", [cart[0].id]);
            const products = await Promise.all(cart_detail.map(async (product) => {
                const product_details = await query("Select product_id, name, price, unit, details from product_details where product_id = ? and status = 1", [product.product_id]);
                return product_details;
            }));
            res.status(200).json({ message: 'cart deatils', cart, cart_detail, products });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.updateCartQuantity = async (req, res) => {
    const { product_id, qunatity, cart_id } = req.body;
    if (!product_id || !qunatity || !cart_id) {
        res.status(401).json({ error: 'All feilds are required.' });
    } else {
        query("UPDATE `cart_detail` SET `qty` = ?, modified_date = NOW() WHERE `cart_id` = ? and `product_id` =?", [qunatity, cart_id, product_id], (error, result) => {
            if (error) {
                console.log('error', error);
                res.status(401).json({ error: 'Somethingg went wrong' });
            } else {
                res.status(200).json({ message: 'cart updated successfully', result });
            }
        });
    }
}

exports.updateCartuser = async (req, res) => {
    const { cart_id, user_id, device_token } = req.body;
    if (!cart_id || !user_id || !device_token) {
        res.status(401).json({ error: 'All feilds are required.' });
    } else {
        query("UPDATE `cart` SET `user_id` = ?, `device_token` = '', modified_date = NOW() WHERE `id` = ? and device_token = ?", [user_id, cart_id, device_token], (error, result) => {
            if (error) {
                console.log('error', error);
                res.status(401).json({ error: 'Somethingg went wrong' });
            } else {
                res.status(200).json({ message: 'cart updated successfully', result });
            }
        });
    }
}