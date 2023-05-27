import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
