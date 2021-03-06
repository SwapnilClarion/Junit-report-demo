exports.config = {
  suites: {
    GuestCheckout: [
      './test/specs/GuestCheckout/GuestCheckout_AliPay.ts',
      // Bug :'./test/specs/GuestCheckout/GuestCheckout_CreditCard_GmailValidation.ts',
      './test/specs/GuestCheckout/GuestCheckout_CreditCard.ts',
      // Bug : AUTO-1890'./test/specs/GuestCheckout/GuestCheckout_Paypal.ts',
    ],
    MemberCheckout: [
      './test/specs/MemberCheckout/MemberCheckout_AliPay.ts',
      // Bug :'./test/specs/MemberCheckout/MemberCheckout_CreditCard_GmailValidation.ts',
      './test/specs/MemberCheckout/MemberCheckout_CreditCard.ts',
      // Bug : AUTO-1890'./test/specs/MemberCheckout/MemberCheckout_Paypal.ts',
      './test/specs/MemberCheckout/MemberCheckout_CreditCard_Order_history.ts',
      './test/specs/MemberCheckout/MemberCheckout_PLP_CreditCard_PriceCheck.ts',
      './test/specs/MemberCheckout/MemberCheckout_OrderConfirmationPage_Product_Details.ts',
    ],
    Wishlist: [
      // Bug : AUTO-1897 './test/specs/Wishlist/LoggedInUser_LandOnPDP.ts',
      './test/specs/Wishlist/LoggedInUser_WishList.ts',
      './test/specs/Wishlist/LoggedOutUser_Empty_WishList.ts',
      './test/specs/Wishlist/LoggedOutUser_WishList.ts',
      './test/specs/Wishlist/RegisteredUser_RemoveWishProductPDP.ts',
      // Bug : AUTO-1904 './test/specs/Wishlist/RestrictMoreProduct_ToWishlist_ThanLimit.ts',
      // Bug : AUTO-1911 './test/specs/Wishlist/MoveProductToBag_validateElement.ts',
    ],
    MemberLogin: [
      './test/specs/MemberLogin/MemberSignUp_Login.ts',
      './test/specs/MemberLogin/MemberSignUp_Logout.ts',
    ],
    Registration: [
      './test/specs/Registration/FeedbackUI_LoginPage.ts',
      // Bug : AUTO-1974 './test/specs/Registration/UserRegistration_GuestCheckout.ts',
      './test/specs/Registration/UserSignUp.ts',
    ],
    ShoppingBag: [
      './test/specs/ShoppingBag/AllTypeUser_removeItem.ts',
      './test/specs/ShoppingBag/GuestUser_ShoppingBag.ts',
      './test/specs/ShoppingBag/LoggedInUser_CartsMerge.ts',
      './test/specs/ShoppingBag/LoggedInUser_moveProdToWishlist_AlreadyExist.ts',
      './test/specs/ShoppingBag/LoggedInUser_MoveProduct_Wishlist.ts',
      './test/specs/ShoppingBag/LoggedInUser_ShoppingBag.ts',
      './test/specs/ShoppingBag/LoggedOutUser_cartlimit.ts',
      // Bug : AUTO-1918'./test/specs/ShoppingBag/LoggedOutUser_RestrictMoveProd_Wishlist.ts',
      // Bug : AUTO-1925'./test/specs/ShoppingBag/LoggedOutUser_Validate_ElementState.ts',
      // Bug : AUTO-1932'./test/specs/ShoppingBag/NotYourAccLink_SuccessBanner.ts',
      './test/specs/ShoppingBag/ShoppingBag_LoggedOutUser.ts',
    ],
    Sales: [
      // Bug : AUTO-1890'./test/specs/Sales/GuestCheckout_Sale_Paypal.ts',
      // Bug : AUTO-1890'./test/specs/Sales/GuestCheckout_Sale_NonSale_Paypal.ts',
      './test/specs/Sales/GuestCheckout_Sale_Alipay.ts',
      './test/specs/Sales/GuestCheckout_Sale_NonSale_Alipay.ts',
      './test/specs/Sales/GuestCheckout_Sale_CreditCard.ts',
      './test/specs/Sales/GuestCheckout_Sale_NonSale_CreditCard.ts',
      // Bug : AUTO-1890'./test/specs/Sales/MemberCheckout_Sale_Paypal.ts',
      // Bug : AUTO-1890'./test/specs/Sales/MemberCheckout_Sale_NonSale_Paypal.ts',
      './test/specs/Sales/MemberCheckout_Sale_CreditCard.ts',
      './test/specs/Sales/MemberCheckout_Sale_NonSale_CreditCard.ts',
      './test/specs/Sales/MemberCheckout_Sale_Alipay.ts',
      './test/specs/Sales/MemberCheckout_Sale_NonSale_Alipay.ts',
      './test/specs/Sales/MemberCheckout_Sale_NonSale_CreditCard_PriceCheck.ts',
      './test/specs/Sales/OrderTotal_ShoppingBag.ts',
      './test/specs/Sales/AllUserType_access_Sale_PLP.ts',
      // Bug: AUTO-1939'./test/specs/Sales/AllUserType_sale_plp_sorting_options.ts',
    ],
    Address: [
      './test/specs/Address/AddressForm_ValidateFields.ts',
      './test/specs/Address/ValidationMsg_AddressFields.ts',
      './test/specs/Address/LoggedInUser_LandOn_AddressPage.ts',
      './test/specs/Address/LoggedInUser_AddEditDeleteAddress.ts',
      './test/specs/Address/GenerateAddressOnSuccessfulCheckout.ts',
      './test/specs/Address/GenerateBillingShippingAddress_OnCheckout.ts',
      './test/specs/Address/OtherAddressLink_displayAvailableAddress.ts',
      './test/specs/Address/OtherAddress_AddShippingAddress.ts',
      './test/specs/Address/OtherAddress_AddBillingAddress.ts',
      './test/specs/Address/ShippingAddress_ValidateEditShippingAddress.ts',
      './test/specs/Address/updateExistingBillingAddress_withoutSave.ts',
      './test/specs/Address/ShippingAddress_ValidateEditShippingAddressWithoutSaveAction.ts',
      './test/specs/Address/BillingAddress_ValidateEditBillingAddress.ts',
    ],

    Plp: [
      './test/specs/Plp/AllUserType_access_PLP.ts',
      './test/specs/Plp/AllTypeUser_SortProductByLowToHighPrice.ts',
      './test/specs/Plp/BrandPLP_ShoppingBag.ts',
      // Bug : AUTO-1960'./test/specs/Plp/AllUserType_plp_sorting_options.ts',
      './test/specs/Plp/ViewAll_Brand_PLP.ts',
      // Bug : AUTO-1960'./test/specs/Plp/AllTypesUser_SortSaleProductsByLowToHighPrice.ts',
    ],
    Pdp: [
      './test/specs/Pdp/AccessPDP_ShoppingBag.ts',
      './test/specs/Pdp/AccessPDP_from_order_history.ts',
      './test/specs/Pdp/PDP_ValidateElementState.ts',
      './test/specs/Pdp/AccessPDP_ProductDetails.ts',
      './test/specs/Pdp/AccessPDP_Multiple_Option.ts',
      './test/specs/Pdp/AllTypesUser_ValidateSizeNotificationMessage.ts',
      './test/specs/Pdp/AllUserType_MultiSize_add_one_more_btn_displayed.ts',
      './test/specs/Pdp/AllUserType_OneSize_add_one_more_btn_displayed.ts',
      // Bug : AUTO-1953'./test/specs/Pdp/PDP_AddToBagButton_SoldOutProduct.ts',
      './test/specs/Pdp/PDP_ValidateSizeDropDownOptions.ts',
      './test/specs/Pdp/AllTypesUser_SelectSize.ts',
    ],
    Mobile: [
      './test/specs/Mobile/Pdp_Validate_product_info.ts',
      './test/specs/Mobile/Pdp_Sold_out_product_view_details_lnk.ts',
      './test/specs/Mobile/Pdp_Validate_JSONLDScript.ts',
      './test/specs/Mobile/pdp_restrict_AddToBag_withoutSize.ts',
      './test/specs/Mobile/SoldOut_NewsLetterSignup_Section.ts',
      './test/specs/Mobile/AllUserType_addToBag_multiSize.ts',
      './test/specs/Mobile/AllUserType_addToBag_oneSize.ts',
    ],
  },
};
