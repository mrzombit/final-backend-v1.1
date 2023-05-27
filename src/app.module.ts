import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { MONGODB_CONNECTION } from './app.properties'
import { AssetAccountModule } from './asset-account/asset-account.module';
import { CurrencyModule } from './currency/currency.module';
import { IndustryModule } from './industry/industry.module';
import { PeriodModule } from './period/period.module';
import { ProjectModule } from './project/project.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { AuthModule } from './auth/auth.module';
import { BusinessGoalModule } from './business-goal/business-goal.module';
import { MulterModule } from '@nestjs/platform-express';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { ProjectTemplateModule } from './project-template/project-template.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot(MONGODB_CONNECTION, {
      useNewUrlParser: true,
    }),
    AssetAccountModule,
    CurrencyModule,
    IndustryModule,
    PeriodModule,
    ProjectModule,
    SubscriptionPlanModule,
    TransactionModule,
    UserModule,
    AuthModule,
    BusinessGoalModule,
    ProjectTemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}