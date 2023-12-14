import { Request, Response } from "express"
import * as argon2 from "argon2"
import { pool } from "./app"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"

interface User {
  id?: string
  username: string
  password: string
}

export const Login = async (req: Request, res: Response) => {
 
}

export const Register = async (req: Request, res: Response) => {
  try {
    let username = req.body.username
    let password = req.body.password

    let id = uuidv4()
    let hashPassword = await argon2.hash(password)

    let user: User = {
      id: id,
      username: username,
      password: hashPassword
    }

    await pool.query(`INSERT INTO users (id, username, password) VALUES ($1, $2, $3)`, [id, username, hashPassword])

    return res.status(200).json({
      status: true,
      data: jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        String(process.env.TOKEN), {
        expiresIn: String(process.env.TOKEN_EXPIRES)
      }
      ),
      id: user.id,
      username: user.username
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "internal error"
    })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`)
    let data = result.rows

    return res.status(200).json({
      status: true,
      data: data
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "internal error"
    })
  }
}