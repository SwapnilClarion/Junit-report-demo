import { Element, ElementArray } from '@wdio/sync';
export class gmailPageLocators {
  // Locators for Gmail login
  get userEmail(): Element {
    return $('input#identifierId');
  }

  get emailNextBtn(): Element {
    return $('div#identifierNext');
  }

  get userPassword(): Element {
    return $('#password>div>div>div.Xb9hP>input.whsOnd.zHQkBf');
  }

  get passwordNextBtn(): Element {
    return $('div#passwordNext');
  }

  get matchedMail(): Element {
    return $(
      "//div[contains(@data-tooltip,'Settings')]" +
        '/parent::div/parent::div/parent::div/parent::div/parent::div/' +
        'following-sibling::div/div/div[1]/div[1]/div[2]/div[4]/div[2]/div/table/tbody/tr',
    );
  }

  get actualOrderID(): Element {
    return $('span.il');
  }

  get SignInText(): Element {
    return $("//span[contains(text(),'Sign in')]");
  }

  get noMessagesTxt(): Element {
    return $('td.TC');
  }

  // Locator on gmail page
  get emptyMessageTable(): Element {
    return $(
      'div.ae4.UI > div:nth-child(3) > table.cf.TB > tbody > tr:nth-child(1) > td.TC',
    );
  }

  get searchBtn(): Element {
    return $('#aso_search_form_anchor > button.gb_pf.gb_qf');
  }

  get searchbox(): Element {
    return $('#gs_lc50 > input:nth-child(1)');
  }

  get emailIdTxt(): Element {
    return $('#profileIdentifier');
  }

  get searchList(): ElementArray {
    return $$('#gs_asls50_0 > table.gssb_m > tbody > tr ');
  }
}
