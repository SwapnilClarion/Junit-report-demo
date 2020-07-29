# SSENSE

Online Shopping Website

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What do you need to install to make local setup to work and how to install it.
Examples:

```Git
To run this service you need to install

-VS Code 1.44* (download section: https://code.visualstudio.com/download)
-NodeJS  12.16.2* (download section: https://nodejs.org/en/download/)
-WebdriverIO - use this "$ npm i --save-dev @wdio/cli"
-npm install (install the dependencies in the local node_modules folder)
-mocha - npm install --global mocha (to install mocha)
-npm install chai (chai assertion library)
-Git (downlaod section: https://git-scm.com/downloads)
```

After installing successfully, make the changes below to take the latest pull from master.

```Git
  git pull origin master (to dowaload the latest code)
```

### Project Creation and Framework

- After installing successfully now it is time to create your test file. You are going to store all of your test files in your project folder and make js file according to your story. e.g basic.js and start writing your script. In this you can use **mocha** framework and **page object pattern**.

- The **page object pattern** : The goal of using page objects is to abstract any page information away from the actual tests. Ideally, you should store all selectors or specific instructions that are unique for a certain page in a page object, so that you still can run your test after you have completely redesigned your page.
- Making A Page Object First off, we need a main page object that we call Page. It will contain general selectors or methods which all page objects will inherit from. We will always export an instance of a page object, and never create that instance in the test.

- The **Mocha** framework consists of some describe block and it block as you can see in below example, in describe block you can add the description of your script and in IT block you can add the particular steps

### Running locally

All private project should be installed in the VS CODE
Add the steps on how to start your project using the **wdio.conf.js**

- Create a new js file
- add your script
- run using `npm test`

**suites.config.js** :

- In this file you can add your suites.
  e.g- Registration: ['./test/specs/foldername/testcasename.js'],

**package.json** :

- Add this line in your package.json file
  "e2e:website:foldername": "node_modules/.bin/wdio wdio.conf.js --suite foldername", this is used to run on locally.

After adding your file in suites.config and package.json , it will displayed your NPM SCRIPT and to run this just click on that.

What is **wdio.conf.js** file ?

- This file contains specs path , browsers , baseURL , framework,timeouts,hooks, etc . all the necessary and config file are present in wdio.conf.js file. So when we run the script then it will find all the details from this file and will execute accordingly.

What is **wdio.local.conf.js** file ?

- This file is used to develop test script to run on local environment for that we have to modify our test file

What is **wdio.jenkins.conf.js** file ?

- This file is used for jenkins pipeline, for now only chromedriver has been added.

Example:

```javascript
describe('description of your test script', () => {
  it('should do some steps', () => {
    browser.url('https://yoururl.com');
  });
});
```

**The list of available automated tests :**

| Test Case Name                                               | Description                                                                                                                                                              | Execution Time |
| :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **GuestCheckout**                                               |                                                                            
| GuestCheckout_AliPay.ts                                      | Guest order confirmation using alipay payment    |37 Sec.|                                                                                             
| GuestCheckout_CreditCar<br>d_GmailValidation.ts                  | Guest checkout with creditcard payment and check gmail validation                                                                                                        | XX Sec.         |
| GuestCheckout_CreditCar<br>d.ts                                  | Guest checkout using creditcard payment                                                                                                                                  | 31 Sec.       |
| GuestCheckout_Paypal.ts    |   Validate Order Confirmation Page for Guest user using Paypal payment method                                                                           |   XX Sec.    |
| **MemberCheckout**                                               | 
| MemberCheckout_AliPay.<br>ts                                     | Member order confirmation using alipay payment                                                                                                                           | 37 Sec.       |
| MemberCheckout_CreditCa<br>rd_GmailValidation.ts                 | Member order confirmation with creditcard payment and check gmail validation                                                                                             | XX Sec         |
| MemberCheckout_CreditCa<br>rd.ts                                 | Order Confirmation Page for Member user using Credit Card'                                                                                                               | 27 Sec.         |
| MemberCheckout_Paypal.<br>ts                                     | Member order confirmation using paypal payment                                                                                                                           | XX Sec       |
| MemberCheckout_CreditCa<br>rd_Order_history.ts                   | 'Validate a user is able to checkout using credit card and verify the orderconfirmation and order history and also verify the user is able to cancel the order.                                                              | 01:22 Min.      |
| MemberCheckout_PLP_Cred<br>itCard_PriceCheck.ts         | Validate Order Confirmation Page for Member user using Credit Card for regular PLP items and Order History page and check Price at all pages        | 32 Sec.      |
| MemberCheckout_OrderCon<br>firmationPage_Product_Details.ts         | Validate Product information details on Order confirmation page once compared with checkout page        | 59 Sec.      |
| **Wishlist**                                               |
| LoggedInUser_LandOnPDP.ts      | Validate if redirected user to login page from PDP should land on PDP after login          |   XX Sec.   |
| LoggedInUser_WishList.<br>ts                                     | to check user able to add product in wishlist      | 18 Sec.         |
| LoggedOutUser_Empty_Wis<br>hList.ts                              | registered user, when access Wishlist page, he should see empty Wishlist Page         | 15 Sec.         |
| LoggedOutUser_WishList.<br>ts                                    | Validate if logged out user add product to wishlist is getting redirected to login page                                                                                  | 12 Sec.        |
| RegisteredUser_RemoveWis<br>hProductPDP.ts      | 'Validate if registered user land on PDP and remove Wishlist product via PDP Page          |  22 Sec.    |
| RestrictMoreProduct_ToWi<br>shlist_ThanLimit.ts                  | As a user, I shouldn't be able to add more products to Wishlist than the set Wishlist-limit                                                                              | XX Sec.      |
| MoveProductToBag_validat<br>eElement.ts      | Wishlist - As a logged-in user, I should be able to add a product to the Shopping-Bag          | XX Sec.      |
| **MemberLogin**                                               |
| MemberSignUp_Login.ts                                        | should able to sign up and login                                                                                                                                         | XX Sec.         |
| MemberSignUp_Logout.ts                                       | should able to signup and logout                                                                                                                                         | XX Sec.         |
| **Registration**                                               |
| FeedbackUI_LoginPage.ts   | Validate as a guests user able to see the feedback UI - Login Page  |   16 Sec. |
| UserRegistration_GuestCh<br>eckout.ts  |  Validate User registration after performing Guest checkout      |      27 Sec.    |
| UserSignUp.ts                                                | User should able to signup                                                                                                                                               | XX Sec.         |
| **ShoppingBag**                                               |
| AllTypeUser_removeItem.<br>ts                   |Validate user Guest,LoggedOut,LoggedIn is able to remove item from shopping bag                                  |  37 Sec. |
| GuestUser_ShoppingBag.t<br>s                   |     Validate Shopping Bag State for logged out user                             |   18 Sec.     |
| LoggedInUser_CartsMerge<br>.ts                   |  Validate if cached shopping bag and user shopping bag merged                                | 26 Sec.       |
| LoggedInUser_moveProdTo<br>Wishlist_AlreadyExist.ts              | Shopping Bag - As a logged-in user, I should get notified if I’m moving an item to Wishlist which already exists in Wishlist                                             | 37 Sec.       |
| LoggedInUser_MoveProduc<br>t_Wishlist.ts                   |  Validate as a logged in user, should be able to move product from shopping bag to Wishlist                                |  23 Sec.      |
| LoggedInUser_ShoppingBa<br>g.ts                   | Validate shopping bag state page for logged in user                                 |  23 Sec.      |
| LoggedOutUser_cartlimit<br>.ts                   |  Validate as a guest user, should not be able to add more products to shopping bag beyond cart limit                                | 01 Min.       |
| LoggedOutUser_RestrictM<br>oveProd_Wishlist.ts                   | Shopping Bag - As a logged-out user, I shouldn't be able to move an item to Wishlist                                                                                     | 39 Sec.         |
| LoggedOutUser_Validate_<br>ElementState.ts                   | Validate Shopping Bag for logged out member user and check for new password UI, Not your email and Forgot Password                                 |  XX Sec.      |
| NotYourAccLink_SuccessB<br>anner.ts                   | Validate user should be logged-out after clicking on Not Your Account link                                 | XX Sec.       |
| ShoppingBag_LoggedOutUs<br>er.ts                   | Validate Shopping Bag State for logged out user                                 | 17 Sec.       |
| **Sales**                                               |
| GuestCheckout_Sale_Payp<br>al.ts                                 | Validate Order Confirmation Page for Guest user using SALE & NON-SALE products - Paypal                                                                                  | XX Sec.      |
| GuestCheckout_Sale_NonS<br>ale_Paypal.ts                         | Validate Order Confirmation Page for Guest user using SALE & NON-SALE products - Paypal                                                                                  | XX Sec.      |
| GuestCheckout_Sale_AliP<br>ay.ts                                 | Guest - As a user I would like to perform checkout using SALE & NON-SALE products - AliPay                                                                               | XX Sec.      |
| GuestCheckout_Sale_NonS<br>ale_AliPay.ts                         | Guest - As a user I would like to perform checkout using SALE & NON-SALE products - AliPay                                                                               | XX Sec.      |
| GuestCheckout_Sale_Cred<br>itCard.ts                             | Validate Order Confirmation Page for Guest user using Credit Card for sale items                                                                                         | 37 Sec.       |
| GuestCheckout_Sale_NonS<br>ale_CreditCard.ts                     | Validate Order Confirmation Page for Guest user using Credit Card for sale and non-sale items                                                                            | 37 Sec.       |
| MemberCheckout_Sale_Pay<br>pal.ts                                | Validate Order Confirmation Page for Member user using Paypal for sale items                                                                                             | XX Sec.        |
| MemberCheckout_Sale_Non<br>Sale_Paypal.ts                        | Validate Order Confirmation Page for Member user using Paypal for sale and non-sale items                                                                                | XX Sec.       |
| MemberCheckout_Sale_Cre<br>ditCard.ts                            | Validate Order Confirmation Page for Member user using Credit Card for sale items                                                                                        | 37 Sec.       |
| MemberCheckout_Sale_Non<br>Sale_CreditCard.ts                    | Validate Order Confirmation Page for Member user using Credit Card for sale and non-sale items                                                                           | 43 Sec.         |
| MemberCheckout_Sale_Ali<br>pay.ts                                | Validate Order Confirmation Page for Member user using Alipay for sale items                                                                                             | 39 Sec.       |
| MemberCheckout_Sale_Non<br>Sale_Alipay.ts                        | Validate Order Confirmation Page for Member user using Alipay for sale and non-sale items                                                                                | 36 Sec.       |
| MemberCheckout_Sale_Non<br>Sale_CreditCard_PriceChe<br>ck.ts         | Validate Order Confirmation Page for Member user using Credit Card for sale and non-sale items and Order History page and check Price at all pages                       | 43 Sec.      |
| OrderTotal_ShoppingBag.<br>ts     | Validate as a logged out user order total on shopping bag page with selected countries | 34 Sec.  |
| AllUserType_access_Sale<br>_PLP.ts     |Validate a user should land on gender specific Sale PLP   | 01 Min |
| AllUserType_sale_plp_so<br>rting_options.ts     |Validate sorting options in Sale PLP for Guest/Logged-Out,Logged-In User   | 27 Sec. |
| **Address**                                               |
| AddressForm_ValidateFie<br>lds.ts                                | Addresses - As a newly registered user, I should land on Empty Address Page & should validate content from new address form                                              | 18 Sec.      |
| ValidationMsg_AddressFi<br>elds.ts     | Addresses - Perform field validations on address form                                 | 32 Sec.     |
| LoggedInUser_LandOn_Add<br>ressPage.ts                           | Addresses - As a newly registered user, I should land on Empty Address Page & should validate content from new address form                                              | 32 Sec.       |
| LoggedInUser_AddEditDel<br>eteAddress.ts                         | Address - Create new address, validate address fields on list with the fields on Edit view and Delete Address                                                            | 27 Sec.      |
| GenerateAddressOnSucces<br>sfulCheckout.ts                       | Addresses - As a user when I perform successful checkout, I should see an address being created on Address Page (Billing address same as Shipping Address)               | 31 Sec.      |
| GenerateBillingShipping<br>Address_OnCheckout.ts                 | Addresses - As a user when I perform successful checkout, I should see 2 addresses being created on Addresses Page (Billing address different from the Shipping Address) | 31 Sec.      |
| OtherAddressLink_displa<br>yAvailableAddress.ts                  | Addresses - As a user with at least one address on addresses page, I should see list of available addresses after clicking on 'Use Other Address' link                   | 51 Sec.      |
| OtherAddress_AddShippin<br>gAddress.ts      | Addresses - As a logged in user, when I add a new shipping address and save it, then the address should be saved to my account once         | 43 Sec.      |
| OtherAddress_AddBilling<br>Address.ts      | Addresses- As a logged in user, when I add a new billing address and save it, then the address should be saved to my account once          | 43 Sec.      |
| ShippingAddress_Validat<br>eEditShippingAddress.ts      | Addresses - As a returning user, when I edit an existing shipping address and save it, then the address should be saved to my account once and be accessible from the dropdown shipping address list          | 43 Sec.      |
| updateExistingBillingAd<br>dress_withoutSave.ts      | Addresses - As a returning user, when I edit an existing billing address and check out without saving, then this address should be saved to my account once          | 37 Sec.      |
| ShippingAddress_Validat<br>eEditShippingAddressWith<br>outSaveAction.ts      | Addresses - As a returning user, when I edit an existing shipping address and check out without saving, then this address should be saved to my account once       | 37 Sec.      |
| BillingAddress_Validate<br>EditBillingAddress.ts      | Addresses - As a logged in user, when I edit an existing billing address and save it, then the address should be saved to my account once and be accessible from the billing address list page          | 51 Sec.      |
| **Plp**                                               |
| AllUserType_access_PLP.<br>ts      | Validate a user should land on gender specific PLP   | 32 Sec. |
| AllTypeUser_SortProduct<br>ByLowToHighPrice.ts     |Validate user is able to see product listed in ascending order after clicking on Low to High   | XX Sec. |
| BrandPLP_ShoppingBag.ts      | Validate Brand PLP name State for all user type          | 22 Sec.      |
| AllUserType_plp_sorting<br>_options.ts      | Validate sorting options in regular PLP and Search PLP for Guest/Logged-Out,Logged-In User   | 22 Sec. |
| ViewAll_Brand_PLP.ts      | Validate View All Brand PLP name State for all user type          | XX Sec.      |
| AllTypesUser_SortSalePr<br>oductsByLowToHighPrice.t<br>s      | PLP - When user is on SALE PLP and apply sorting as 'Price: Low to High' then products should be sorted based on ascending order of product's price          | 44 Sec.      |
| **Pdp**                                               |
| AccessPDP_ShoppingBag.t<br>s      | Validate for Access PDP from Shopping Bag Page          | 22 Sec.      |
| AccessPDP_from_order_hi<br>story.ts      |Validate a user is able access PDP from order history page           |  37 Sec.     |
| PDP_ValidateElementStat<br>e.ts      | PDP - As a user, I should be able to see 'Product Information' & 'Add Bag' form stick on the PDP when I scroll UP/DOWN the page - D          | 22 Sec.      |
| AccessPDP_ProductDetail<br>s.ts      | PDP - As a user when I land on PDP, I should see product's name, description & brand name       | 22 Sec.      |
| AccessPDP_Multiple_Opti<br>on.ts      | PDP - As a user I would like to access PDP through many ways       | XX Sec.      |
| AllTypesUser_ValidateSi<br>zeNotificationMessage.ts      | Validate User should not be able to add a product to Shopping bag without selecting a size for multi-size products       | 01:40 Min.      |
| PDP_AddToBagButton_Sold<br>OutProduct.ts'      | Validate user should not see Add to Bag button for a sold out product       | 32 Sec.       |
| PDP_ValidateSizeDropDow<br>nOptions.ts      | Validate that usser should not be able to select sold-out sizes       | 37 Sec.      |
| AllTypesUser_SelectSize<br>.ts      | Validate Select Size option should highlight once user hover over the avaialable size       | 01 Min.       |
| **Mobile**                                               |
| Pdp_Validate_JSONLDScri<br>pt.ts      | PDP - As a developer, I should be able to see JSON-LD script in DOM       | 32 Sec.      |
| pdp_restrict_AddToBag_w<br>ithoutSize      | (Mobile View) [PDP] User shouldn't be able to add an product to Shopping bag without selecting a size       | 33 Sec.      |
| Pdp_Sold_out_product_vi<br>ew_details_lnk      | (Mobile View) [PDP] Validate that user is able to see view details link for sold-out product and Sale product in mobile view       | 01:33 Min.      |
| Pdp_Validate_product_in<br>fo      | (Mobile View) [PDP] Validate that product info in PDP page, mobile view       | 01:12 Min.      |
| pdp_restrict_AddToBag_w<br>ithoutSize      | (Mobile View) [PDP] User shouldn't be able to add an product to Shopping bag without selecting a size       | 33 Sec.      |
| SoldOut_NewsLetterSignu<br>p_Section.ts      | Validate that user is able to see newsletter sign-up section on a sold out product       | 33 Sec.      |
| AllUserType_addToBag_mu<br>ltiSize      | (Mobile View) [PDP] - Add to bag functionality coverage - multi-size product      | 37 Sec.      |
| AllUserType_addToBag_on<br>eSize      | (Mobile View) [PDP] - Add to bag functionality coverage - one-size product      | 39 Sec.      |
| **Hqm**                                               |
| ShipmentValidation.ts      | Master Order Checkout USD - HQM - Order shipment flow| XX Sec.      |

## Running the tests

Define commands to run the different tests that can be run
• Unit test
• Functional test
• Bdd test
• Etc

```npm
* Examples :
Execute this command to run all the tests
  -npm run test
To run only functioncal test
  -npm run test:functional
```

## Coding guidelines

ESLint and Prettier file are a static code analysis tool for identifying problematic patterns found in JavaScript code.
`ESlint` performs automated scans of your JavaScript files for common syntax and style errors. `Prettier` scans your files for style issues and automatically reformats your code to ensure consistent rules are being followed for spacing, semicolons, single quotes vs double quotes, etc.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct,

## Git Nomenclature

- For Git Nomenclature you can use this link
  [Git Nomenclature](https://readthedocs.ssense.com/standards/git-nomenclature/)

### The process for submitting pull requests to us

- `git branch` to check in which branch we are working
- `git status` to check which file are modified or need to commit
- `git add [filename]`to commit on file
- `git status` after commitng file to check status again
- `git commit -m` "message in ssense format"
- `git status` to check again current status of file
- `git push origin [branchname]` to push on the branch
- open github click on Compare and pull request
  write some message , assign code reviwer
- `Pull Request` click on it

## Communication

**Where and how to log a bug.**

- To log a bug, please visit us on slack on the **#general** channel
- You can raise a bug in **jira** also

**How to reach the team.**

**_Slack_**

- For any inquiry, please contact us on slack on the **#general** channel
- For any inquiry regarding automation-core contact us on **#automation-core** channel
- For any inquiry regarding documentation-process contact us on **#documentation-process** channel
- For any inquiry regarding qa-environments contact us on **#qa-environments** channel
- For any inquiry regarding ssense-automation-framework contact us on **#ssense-automation-framework** channel
- For emergencies, please write to the **#emergency** channel

**_Email_**

- yassine.tamarmoucht@ssense.com,
- kareem.elmasri@ssense.com,
- anirudha.kulkarni@ssense.com

## Built With

- [mocha](https://mochajs.org/) - The framework used
- [NPM](https://docs.npmjs.com/files/package.json) - Dependency Management

## Versioning

- [GitHub](https://github.com/Groupe-Atallah/ssense-e2e-automation) - For Version Control

## Authors

```Git
CODEOWNERS : @yassineaitta
```
