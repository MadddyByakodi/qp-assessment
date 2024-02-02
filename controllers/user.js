const util = require('util');
const db = require("../helpers/db");

const query = util.promisify(db.query).bind(db);

exports.addUserAddress = (req, res) => {
    const { user_id, name, phone, address, city, state, type_name, postal_code, is_default } = req.body;
    if (!user_id || !name || !phone || !address || !city || !state || !type_name || !postal_code || !is_default) {
        return res.status(401).json({ error: 'All feilds are required.' });
    } else {
        query("INSERT INTO `address_detail`(`user_id`, `name`, `phone`, `address`, `city`, `state`, `type_name`, `postal_code`, is_default, status) VALUES (?,?,?, ?,?,?, ?,?,?,1) ", [user_id, name, phone, address, city, state, type_name, postal_code, is_default], (err, results) => {
            if (err) {
                console.log(err);
                res.status(401).json({ error: 'Somethingg went wrong' });
            } else {
                res.status(200).json({ message: 'user address added successfully', results });
            }
        });
    }

}

exports.upadteUserAddress = (req, res) => {
    const { user_id, name, phone, address, city, state, type_name, postal_code, is_default, address_id } = req.body;
    if (!address_id || !user_id || !name || !phone || !address || !city || !state || !type_name || !postal_code || !is_default) {
        return res.status(401).json({ error: 'All feilds are required.' });
    } else {
        db.query("UPDATE `address_detail` SET `name`=? ,`phone`=? ,`address`=? ,`city`=? ,`state`=? ,`type_name`=? ,`postal_code`=? `modify_date`= NOW() WHERE `user_id` = ? AND `address_id` = ? AND `status` = 1 ", [name, phone, address, city, state, type_name, postal_code, user_id, address_id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(401).json({ error: 'Somethingg went wrong' });
            } else {
                res.status(200).json({ message: 'user address updated successfully', results });
            }
        });
    }
}

exports.getUserAddress = (req, res) => {
    const user_id = req.query.user_id;
    if (!user_id) {
        return res.status(401).json({ error: 'All feilds are required.' });
    } else {
        db.query("SELECT * FROM `address_detail` WHERE `user_id` = ?", [user_id], (err, results) => {
            if (err) {
                console.log(err);
                res.status(401).json({ error: 'Somethingg went wrong' });
            } else {
                res.status(200).json({ message: 'user address updated successfully', results });
            }
        });
    }
}