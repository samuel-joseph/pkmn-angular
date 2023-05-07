import { Controller, Get } from '@nestjs/common';

@Controller('player')
export class PlayerController {
  @Get()
  getPlayer() {
    return ['Player One']
  }
}
