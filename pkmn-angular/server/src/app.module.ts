import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { PlayerController } from './player/player.controller';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [AppController, PlayerController],
  providers: [AppService],
})
export class AppModule {}
