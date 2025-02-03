import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    async login(@Body() loginDto: { Nombre: string; Contra: string }) {
        return this.authService.validateUser(loginDto.Nombre, loginDto.Contra);
    }
}
