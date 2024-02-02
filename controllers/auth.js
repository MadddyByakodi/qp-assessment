const db = require("../helpers/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
        return res.status(401).json({ error: 'All feilds are required.' });
    }
    if (password !== confirmpassword) {
        return res.status(401).json({ error: 'password doesnot match' });
    }
    db.query('SELECT email from user_details where email = ?', [email], async (error, results) => {
        try {
            if (error) { console.log('error', error); res.render('register', { message: 'something went wrong' }) }
            if (results.length > 0) {
                return res.status(401).json({ error: 'Email already in use' });
            } else {
                const hashPassword = await bcrypt.hash(password, 8);
                db.query("INSERT INTO `user_details`( `name`, `email`, `password`, `created_date`, `modify_date`) VALUES (?,?,?, NOW(), NOW())", [name, email, hashPassword], (error, result) => {
                    if (error) { console.log('error'); res.render('register', { message: 'something went wrong' }) };
                    res.status(200).json({ message: 'User created sussefully' });
                });
            }
        } catch (err) {
            res.status(500).json({ error: 'Login failed' });
        }
    });

}

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(401).json({ error: 'All feilds are required.' });
    }
    db.query('SELECT * from user_details where email = ?', [email], async (error, results) => {
        try {
            if (error) { console.log('error', error); res.render('login', { message: 'something went wrong' }) }
            if (results.length == 0) {
                return res.status(401).json({ error: 'Email or passwor is not correct' });
            } else {
                if (await bcrypt.compare(password, results[0].password)) {
                    if(results[0].user_type == 2){
                        const token = await jwt.sign({ userId: results[0].user_id }, process.env.JWT_SECRET, {
                            expiresIn: '1h',
                        });
                        console.log({ message: 'login sussefully', userId: results[0].user_id, token })
                        res.status(200).json({ message: 'login sussefully', userId: results[0].user_id, token });
                    } else {
                        res.status(200).json({ message: 'login sussefully', userId: results[0].user_id });
                    } 
                } else {
                    return res.status(401).json({ error: 'Email or passwor is not correct' });
                }

            }
        } catch (err) {
            res.status(500).json({ error: 'Login failed' });
        }

    });
}