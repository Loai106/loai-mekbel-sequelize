import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,BeforeCreate,HasMany, PrimaryKey, ForeignKey, BelongsToMany, Unique} from "sequelize-typescript"
import Category_Post from "./Category_Post";
import Post from "./Post";
import sequelize from "../connections";



@Table({
    timestamps:true,
    tableName:'categories',
    modelName:'Category',
})
class Category extends Model{

    @PrimaryKey
    @Column({
        primaryKey:true,
        type:DataType.INTEGER,
        autoIncrement:true
    })
    declare id : number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true,
    })
    declare name:string;

    @Column({
        type:DataType.STRING,
    })
    declare description:string;

    @BelongsToMany(()=>Post , ()=>Category_Post)
    declare posts:Post[]
    
}

export default Category;