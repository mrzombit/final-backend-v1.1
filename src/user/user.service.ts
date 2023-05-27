import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async getUser(username): Promise<User> {
    const user = await this.userModel.findOne({username}).exec();
    return user;
  }

  async getUserByID(userID): Promise<User> {
    const user = await this.userModel
    .findById(userID)
    .exec();
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async editUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    const editedUser = await this.userModel
      .findByIdAndUpdate(userID, createUserDTO, { new: true });
    return editedUser;
  }

  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel
      .findByIdAndRemove(userID);
    return deletedUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({
      username
    })
      .exec();
  }
}
