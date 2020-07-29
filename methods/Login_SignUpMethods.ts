import navigationPage from '../pageObjects/NavigationPage';
import loginPage from '../pageObjects/LoginPage';

class LoginSignUpMethods {
  /**
   * Login Method
   * @param {String} email
   * @param {String} pass
   */

  login(email: string, pass: string) {
    navigationPage.clickOnLoginLink();
    loginPage.enterUserNameInput(email);
    loginPage.enterUserPasswordInput(pass);
    loginPage.clickLoginBtn();
  }

  /** * SignUp Method
   * @param {String} email
   * @param {String} pass
   * @param {String} promoType
   *
   * promoType= Men,Women,NoThanks
   */
  signup(email: string, password: string, promoType: string): void {
    loginPage.enterSignUpEmailId(email);
    loginPage.enterSignUpPassword(password);
    switch (promoType) {
      case 'Men':
        loginPage.clickMensPromo();
        break;
      case 'Women':
        loginPage.clickWomensPromo();
        break;
      case 'NoThanks':
        loginPage.clickNoThanksPromo();
        break;

      default:
        break;
    }
    loginPage.clickCreateAccBtn();
  }
}

export default new LoginSignUpMethods();
