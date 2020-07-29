import helpers from '../utils/helpers';
import { logger } from '../config/winstonLogger';
import { loginPageLocators } from './pageLocators/LoginPage_Locators';

export class LoginPage extends loginPageLocators {
  // Login Link
  clickLoginLnk(): void {
    helpers.click(this.loginLink);
  }

  // Login
  enterUserNameInput(username: string): void {
    helpers.setValue(this.userNameInput, username);
  }

  enterUserPasswordInput(password: string): void {
    helpers.setValue(this.userPasswordInput, password);
  }

  clickLoginBtn(): void {
    helpers.click(this.loginButton);
  }

  checkPopulatedEmailId(attribute: string): string {
    const populatedEmail = helpers.getAttribute(
      this.registerEmailInput,
      attribute,
    );
    return populatedEmail;
  }

  // SignUp
  enterSignUpEmailId(email: string): void {
    helpers.setValue(this.registerEmailInput, email);
  }

  enterSignUpPassword(password: string): void {
    helpers.setValue(this.registerPasswordInput, password);
  }

  clickMensPromo(): void {
    helpers.click(this.mensPromoRadioBtn);
  }

  clickWomensPromo(): void {
    helpers.click(this.womensPromoRadioBtn);
  }

  clickNoThanksPromo(): void {
    helpers.click(this.noThanksPromoRadioBtn);
  }

  clickCreateAccBtn(): void {
    helpers.click(this.createAccBtn);
  }

  viewNotificationMsg(): any {
    try {
      if (this.notificationMsg.isExisting()) {
        return this.notificationMsg.getText();
      }
      return 'New User';
    } catch (error) {
      logger.info(`'Error:= ' + error`);
    }
  }

  getLoginHeading(): any {
    try {
      if (!this.loginHeading.isExisting()) {
        this.loginHeading.waitForExist(5000);
        return this.loginHeading.getText();
      }
      return this.loginHeading.getText();
    } catch (error) {
      logger.info(`'Error:= ' + error`);
    }
  }

  isBannerForWishListDisplayed(): boolean {
    if (
      this.notificationWishList.isExisting() &&
      this.notificationWishList.isDisplayed()
    ) {
      return true;
    }
    return false;
  }

  getNotificationForWishList(): any {
    try {
      if (!this.notificationWishList.isExisting()) {
        this.notificationWishList.waitForExist(5000);
        return this.notificationWishList.getText();
      }
      return this.notificationWishList.getText();
    } catch (error) {
      logger.info(`Error ==> ${error}`);
    }
  }

  isLoginLinkExist(): boolean {
    if (this.loginLink.isExisting() && this.loginLink.isDisplayed()) {
      return true;
    }
    return false;
  }

  getSignUpHeading(): string {
    return helpers.getText(this.signUpHeading);
  }
}

export default new LoginPage();
