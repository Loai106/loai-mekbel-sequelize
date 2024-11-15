import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,BeforeCreate,HasMany, PrimaryKey, ForeignKey, BelongsTo} from "sequelize-typescript"
import Post from "./Post";
import Category from "./Category";
import sequelize from "../connections";

@Table({
    timestamps:true,
    tableName:'category_posts',
    modelName:"Category_Post"
})
class Category_Post extends Model{

    @PrimaryKey
    @Column({
        primaryKey:true,
        type: DataType.INTEGER,
        autoIncrement:true,
    })
    declare id : number;

    @ForeignKey(()=>Post)
    @Column({
        type:DataType.INTEGER
    })
    declare postId : number;

   @ForeignKey(()=>Category)
    @Column({
        type: DataType.INTEGER
    })
    declare categoryId : number;

    @CreatedAt
    declare createdAt : Date;

    @UpdatedAt
    declare updatedAt: Date;  

    @BelongsTo(()=> Post,{foreignKey:'postId',as:'post'})
    declare post: Post;

    @BelongsTo(()=> Category , {foreignKey:'categoryId',as:'category'})
    declare category:Category;
}   

export default Category_Post;