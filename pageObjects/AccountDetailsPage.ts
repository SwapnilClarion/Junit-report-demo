import helpers from '../utils/helpers';
import { accountDetailsPageLocators } from './pageLocators/AccountDetailsPage_Locators';
export class AccountDetailsPage extends accountDetailsPageLocators {
  enterFirstName(fname: string): void {
    helpers.setValue(this.firstNameInput, fname);
  }

  enterLastName(lname: string): void {
    helpers.setValue(this.lastNameInput, lname);
  }

  checkEmailId(attribute: string): string {
    const email = helpers.getAttribute(this.emailInput, attribute);
    return email;
  }

  enterOldPassword(opass: string): void {
    helpers.setValue(this.oldPasswordInput, opass);
  }

  enterNewPassword(npass: string): void {
    helpers.setValue(this.newPasswordInput, npass);
  }

  clickSaveChangesBtn(): void {
    helpers.click(this.saveChangesBtn);
  }
}

export default new AccountDetailsPage();
