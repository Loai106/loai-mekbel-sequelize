import {Table,Column,Model,CreatedAt,UpdatedAt,DataType,BeforeCreate,HasMany, PrimaryKey, BeforeUpdate} from "sequelize-typescript"
import Post from './Post';
import Comment from "./Comment";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import sequelize from "../connections";

export const salt = 10;

/*
const User = sequelize.define("user",{

    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


*/


@Table({
    timestamps:true,
    tableName:"users",
    modelName:"User",
    
})
class User extends Model{
    @PrimaryKey
    @Column({
        primaryKey:true,
        type: DataType.INTEGER,
        autoIncrement:true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull :false,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull :false,
        unique:true

    })
    declare email : string;

    @Column({
        type : DataType.STRING,
        allowNull :false,

    })
    declare password : string;

    @CreatedAt
    declare createdAt : Date;


    @UpdatedAt
    declare updatedAt: Date;  


   @HasMany(()=> Post)
    declare posts : Post[];

    @HasMany(()=> Comment)
    declare comments : Comment[];

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User){
        if(user.password){
            user.password = await bcrypt.hash(user.password,salt);
            console.log(`userpassword: ${user.password}`)
        }

    }
}
export default User;