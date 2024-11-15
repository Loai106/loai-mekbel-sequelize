import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,BeforeCreate,HasMany, PrimaryKey, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript"
import User from "./User";
import Comment from "./Comment";
import Category_Post from "./Category_Post";
import Category from "./Category";
import { DataTypes } from "sequelize";
import sequelize from "../connections";
import { title } from "process";
/*
const Post = sequelize.define("post",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary:{
        type: DataTypes.STRING,

    },
    content:{
        type: DataTypes.STRING,
        allowNull:false,
    },
})
*/
@Table({
    timestamps:true,
    tableName:'posts',
    modelName:"Post"
})
class Post extends Model{
    @PrimaryKey
    @Column({
        primaryKey:true,
        type: DataType.INTEGER,
        autoIncrement:true,
    })
    declare id : number;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER,
        allowNull: false,
    })
    declare autherId : number;

    @Column({
        type:DataType.STRING,
        allowNull: false,

    })
    declare title:string;

    @Column({
        type: DataType.STRING
    })
    declare summary:string;
    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    declare content:string;
    @CreatedAt
    declare createdAt: Date;


    @HasMany(()=>Comment)
    declare comments:Comment[]

    @BelongsToMany(()=> Category ,()=> Category_Post)
    declare categories: Category[]

    @BelongsTo(() => User, { foreignKey: 'autherId', as: 'user' })
    declare user: User; 
}

export default Post;