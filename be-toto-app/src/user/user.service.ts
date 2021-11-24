import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const bcrypt = require("bcrypt");

import { User } from './user.model'

@Injectable()
export class UserService {
    constructor(@InjectModel('usertodos') private readonly UserModel: Model<User>) {

    }

    async insertUser(req, res) {

        try {

            const salt = await bcrypt.genSalt(10);
            // console.log(salt);
            const CodePassword = await bcrypt.hash(req.body.password, salt);

            if (typeof req.body.displayName !== "string") {
                res.status(400).json("User is defined")
            }

            const displayName = await this.UserModel.findOne({ displayName: req.body.displayName.trim() })
            displayName && res.status(400).json("DisplayName has been used")

            const email = await this.UserModel.findOne({ email: req.body.email.trim() });
            email && res.status(400).json("Email has been used");


            const newUser = new this.UserModel({
                displayName: req.body.displayName,
                email: req.body.email,
                password: CodePassword,
            });



            const result = await newUser.save();
            res.status(200).json(result)
            return result.id as string;

        } catch (err) {
            res.status(500).json(err)
        }

    }

    // -------------------- Login -----------------------------


    async Login(req, res) {
        try {
            const user: any = await this.UserModel.findOne({ displayName: req.body.displayName.trim() });
            !user && res.status(401).json("Wrong password or username!");

            const validPassword = await bcrypt.compare(req.body.password.trim(), user.password)
            !validPassword && res.status(401).json("Wrong password or username!")

            if (user && validPassword) {

                const { password, ...info } = user._doc;


                res.status(200).json({ user: info })
            }

        } catch (err) {
            res.status(500).json(err)
        }

    }
}