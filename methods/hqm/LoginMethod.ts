import loginPage from '../../pageObjects/hqm/LoginPage';
import defaultConfig from '../../config/default';
class LoginMethod {
  login(): void {
    loginPage.enterUsername(defaultConfig.interfaces.hqm.user);
    loginPage.enterPassword(defaultConfig.interfaces.hqm.password);
    loginPage.clickConnectionBtn();
  }
}

export default new LoginMethod();
