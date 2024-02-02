const db = require("../helpers/db");

exports.getProductsList = async (req, res) => {
    try {
        db.query("Select product_id, name, price, unit  from product_details where status = 1", (err, results) => {
            if (err) {
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

exports.getProductsdeatils = async (req, res) => {
    try {
        const id = req.query.product_id;
        if (!id) {
            return res.status(401).json({ error: 'id is missing' });
        } else {
            db.query("Select product_id, name, price, unit, details from product_details where product_id = ? and status = 1", [id], (err, results) => {
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