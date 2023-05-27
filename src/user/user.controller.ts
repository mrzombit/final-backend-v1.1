import * as bcrypt from 'bcrypt';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  Controller,
  Get, Res, HttpStatus,
  Param, NotFoundException,
  Post, Body, Put, Query,
  Delete, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Post('/signup')
  async createUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const saltOrRounds = 10;
    const shallowHashPassword = await bcrypt.hash(createUserDTO.password, saltOrRounds);
    createUserDTO.password = shallowHashPassword
    const newUser = await this.userService.createUser(
      createUserDTO
    );
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully!',
      post: newUser,
    });
  }

  @Get('getUser/:username') //"../user/post/1"
  async getUser(@Res() res, @Param('username', new ValidateObjectId()) username) {
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('post/:userID') //"../user/post/1"
  async getUserByID(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const user = await this.userService.getUserByID(userID);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('username')
  async getUserByUsername(
    @Res() res,
    @Query('username') username,
  ) {
    const user = await this.userService.findOne(username);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('users') //"../user/users"
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Put('/edit')
  async editUser(
    @Res() res,
    @Query('userID', new ValidateObjectId()) userID,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const editedUser = await this.userService.editUser(userID, createUserDTO);
    if (!editedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user: editedUser,
    });
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Query('username') username,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const user = await this.userService.findOne(username)
    console.log(user);
    const updatedUser = await this.userService.editUser(user._id, createUserDTO);
    if (!updatedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user: updatedUser,
    });
  }


  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
    const deletedUser = await this.userService.deleteUser(userID);
    if (!deletedUser) {
      throw new NotFoundException('User does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted!',
      user: deletedUser,
    });
  }

}
