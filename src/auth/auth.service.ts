import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) return null;
        const passwordValid = await bcrypt.compare(pass, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
  }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}