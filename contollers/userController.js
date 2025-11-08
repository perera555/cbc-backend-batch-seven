import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export function getUsers(req, res) {
    User.find().then((users) => {
        res.json(users)

    })

        .catch(() => {
            res.status(500).json({
                message: "Error retrieving user data"
            })

        })


}

export function saveUser(req, res) {

   // check user details available
    if (req.user == null) {
        res.status(401).json({
            message: "PLEASE LOGIN FIRST AND TRY AGAIN"
        })
        return;
    }
    // check user is admin
    if (req.user.role != "admin") {

        res.status(403).json({
            message: "ONLY ADMIN CAN CREATE NEW USERS"
        })
        return;
    }


    const hashedpassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedpassword,

    })

    user.save().then(
        () => {
            res.status(201).json({
                message: "User data saved successfully"

            })
        })
        .catch(
            (err) => {
                res.status(500).json({
                    message: "Error saving user data"

                })
            })

}


export function loginUser(req, res) {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (user == null) {
            res.status(404).json({
                message: "User not found"
            })

        } else {
            const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
            if (isPasswordMatching) {

                const token = jwt.sign(
                    {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isBlock: user.isblock,
                        isEmailVerified: user.isEmailVerified,

                    },
                    "jwt-secret"

                )

                res.status(200).json({
                    message: "Login successful",
                    token: token



                })
            } else {
                res.status(401).json({
                    message: "Invalid password"
                })
            }

        }

    })

}


export function isAdmin(req) {
    if (req.user == null) {
        return false;
    }
    if (req.user.role != "admin") {
        return false;

    }
    return true;

}

export function isCustomer(req){
    if(req.user ==null){
        return false;
    }
    if(req.user.role != "user"){
        return false
    }
    return true;

}