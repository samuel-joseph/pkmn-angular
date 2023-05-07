import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { PlayerController } from './player/player.controller';

@Module({
  imports: [PlayerModule],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
