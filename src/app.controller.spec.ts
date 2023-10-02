import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './modules/account/account.controller';
import { AccountService } from './modules/account/account.service';

describe('AppController', () => {
  let appController: AccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();

    appController = app.get<AccountController>(AccountController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.GetAccount("")).toBe('Hello World!');
    });
  });
});
