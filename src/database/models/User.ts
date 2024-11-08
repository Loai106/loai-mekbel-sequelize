import {Table,Column,Model,DataType,CreatedAt,UpdatedAt,BeforeCreate,HasMany, PrimaryKey, BeforeUpdate} from "sequelize-typescript"
import Post from './Post';
import Comment from "./Comment";
import bcrypt from "bcrypt";


@Table({
    timestamps:true,
    tableName:"users",
    modelName:"User"
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
            const salt = 10;
            user.password = await bcrypt.hash(user.password,salt);
            console.log(`userpassword: ${user.password}`)
        }

    }
}
export default User;