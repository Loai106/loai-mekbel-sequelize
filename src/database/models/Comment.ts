import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,BeforeCreate,HasMany, PrimaryKey, ForeignKey, BelongsTo} from "sequelize-typescript"
import User from "./User";
import Post from "./Post";
import sequelize from "../connections";

@Table({
    timestamps:true,
    tableName:'comments',
    modelName:"Comment"
})
class Comment extends Model{
    
    @PrimaryKey
    @Column({
        primaryKey:true,
        type: DataType.INTEGER,
        autoIncrement:true,
    })
    declare id : number;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER
    })
    declare userId : number;

    @ForeignKey(()=>Post)
    @Column({
        type: DataType.INTEGER
    })
    declare postId : number;

    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    declare content:string;
    @CreatedAt
    declare createdAt : Date;


    @UpdatedAt
    declare updatedAt: Date;  

    @BelongsTo(()=>User ,{foreignKey:'userId', as:'user'})
    declare user:User;

    @BelongsTo(() => Post, { foreignKey: 'postId', as: 'post' })
    declare post : Post;

}

export default Comment;