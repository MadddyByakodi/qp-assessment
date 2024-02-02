const db = require("../helpers/db");

exports.addProduct = async (req, res) => {
    try {
        const { name, details, unit, price, inventory } = req.body;
        if (!name || !details || !unit || !price || !inventory) {
            return res.status(401).json({ error: 'All feilds are required.' });
        }
        db.query("Select * from product_details where name = ?", [name], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Somethingg went wrong' });
            } else if (results.length > 0) {
                return res.status(401).json({ error: 'Product already exsists.' });
            } else {
                db.query("INSERT INTO `product_details` (`name`, `details`, `unit`, `price`, `inventory`,`status`, `created_date`, `modified_date`) VALUES (?,?,?,?,?,1,NOW(),NOW())",
                    [name, details, unit, price, inventory], (err, results) => {
                        if (err) {
                            console.log(err);
                            return res.status(401).json({ error: 'Somethingg went wrong' });
                        } else {
                            res.status(200).json({ message: 'Product Added successfully', results });
                        }
                    });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.getProducts = async (req, res) => {
    try {
        db.query("Select * from product_details", (err, results) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Somethingg went wrong' });
            } else if (results.length == 0) {
                return res.status(401).json({ error: 'no products available' });
            } else {
                res.status(200).json({ message: 'All products', results });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.getProductsList = async (req, res) => {
    try {
        db.query("Select product_id, name  from product_details", (err, results) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ error: 'Somethingg went wrong' });
            } else if (results.length == 0) {
                return res.status(401).json({ error: 'no products available' });
            } else {
                res.status(200).json({ message: 'All products', results });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.getProductsdetails = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(401).json({ error: 'id is missing' });
        } else {
            db.query("Select * from product_details where product_id = ?", [req.query.id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ error: 'Somethingg went wrong' });
                } else if (results.length == 0) {
                    return res.status(401).json({ error: 'no products available' });
                } else {
                    res.status(200).json({ message: 'products details', results });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(401).json({ error: 'id is missing' });
        } else {
            db.query("DELETE FROM product_details where product_id = ?", [req.query.id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ error: 'Somethingg went wrong' });
                } else if (results.length == 0) {
                    return res.status(401).json({ error: 'no products available' });
                } else {
                    res.status(200).json({ message: 'products delete', results });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { product_id, name, details, unit, price, inventory, status } = req.body;
        if (!product_id || !name || !details || !unit || !price || !inventory || !status) {
            return res.status(401).json({ error: 'All feilds are required.' });
        } else {
            db.query("UPDATE `product_details` SET `name`=?, `details`=?, `unit`=?, `price`=?, `inventory`=?, `status`=?, modified_date = NOW()  where product_id = ?",
            [name, details, unit, price, inventory, status, product_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ error: 'Somethingg went wrong' });
                } else if (results.length == 0) {
                    return res.status(401).json({ error: 'no products available' });
                } else {
                    res.status(200).json({ message: 'products delete', results });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Action failed' });
    }
}