import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Register new user
  async register(name: string, email: string, password: string) {
    // check if email already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered!');
    }

    // hash password — never store plain text!
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await this.usersService.create(name, email, hashedPassword);

    // generate token
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      message: 'Registration successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    };
  }

  // Login existing user
  async login(email: string, password: string) {
    // find user
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    // generate token
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    };
  }
}
