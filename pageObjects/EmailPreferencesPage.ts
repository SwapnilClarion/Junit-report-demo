import { emailPrefrencesPageLocators } from './pageLocators/EmailPreferencesPage_Locators';
export class EmailPrefrencesPage extends emailPrefrencesPageLocators {
  // NewsLetter Preferences
  clickNewsletterPreferences(subscription: string): void {
    const newsSubcription = this.newsSubscriptionPrefRadio;
    newsSubcription.forEach((element) => {
      if (element.isEnabled()) {
        const attribValue = element.getAttribute('value');
        if (subscription === attribValue) {
          element.click();
        }
      }
    });
  }

  // Language Selection
  selectPreferredLanguage(index: number): void {
    if (this.languageSelect.isEnabled()) {
      this.languageSelect.selectByIndex(index);
    }
  }

  // Country Selection
  selectPreferredCountry(country: string): void {
    if (this.countrySelect.isEnabled()) {
      this.countrySelect.selectByVisibleText(country);
    }
  }

  // Notifications Selection
  // thi is a to do t recheck the if statement
  clickNotificationRadio(status: string): void {
    const notify = this.notificationRadio;
    notify.forEach((element) => {
      if (element.isEnabled()) {
        const notifyAttrb = element.getAttribute('value');
        if (status === 'on' && notifyAttrb === 'subscribed') {
          element.click();
        } else {
          element.click();
        }
      }
    });
  }

  // Save Changes Btn
  clickSaveChangesBtn(): void {
    this.saveChangesBtn.click();
  }
}

export default new EmailPrefrencesPage();
