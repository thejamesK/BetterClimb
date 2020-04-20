public with sharing class BC_ProductWrapper {
    @AuraEnabled public String productName;
    @AuraEnabled public String productId;
    @AuraEnabled public String pricebookId;
    @AuraEnabled public Decimal productPrice;
    @AuraEnabled public List<String> productImageUrls;
    @AuraEnabled public String productDescription;
    @AuraEnabled public Integer productQuantity;
    @AuraEnabled public String productPricebookEntryId;
    @AuraEnabled public String productMainPhotoUrl;
    @AuraEnabled public Decimal productCurrentPrice;
    @AuraEnabled public Boolean isProductSelected;
    @AuraEnabled public Decimal productPriceToSet;
    @AuraEnabled public String currentPBEId;
    
    @AuraEnabled
    public static BC_ProductWrapper BC_ProductWrapper(List<PricebookEntry> pricebookEntries, List<ContentDistribution> contentDistributions) {
        BC_PricebookUtils utils = new BC_PricebookUtils(pricebookEntries);
        BC_ProductWrapper wrappedProduct = new BC_ProductWrapper();
        if(utils.isStandardPricebook()){
            PricebookEntry standardPriceBookEntry = utils.getStandardPricebook();
            wrappedProduct.pricebookId = standardPriceBookEntry.Pricebook2Id;
            wrappedProduct.productId = standardPriceBookEntry.Product2Id;
            wrappedProduct.productName = standardPriceBookEntry.Product2.Name;
            wrappedProduct.productDescription = standardPriceBookEntry.Product2.Description;
            wrappedProduct.productPrice = (Decimal)standardPriceBookEntry.UnitPrice;
            wrappedProduct.productImageUrls = BC_CommunitySearchController.prepareContentUrls(contentDistributions);
            wrappedProduct.productQuantity = 1;
            wrappedProduct.productPricebookEntryId = standardPriceBookEntry.Id;
            wrappedProduct.productMainPhotoUrl = standardPriceBookEntry.Product2.MainPhotoUrl__c;
            if(utils.isDiscountPricebook()){
                PricebookEntry discountPriceBookEntry = utils.getDiscountPricebook();
                wrappedProduct.productCurrentPrice = discountPriceBookEntry.UnitPrice;
            }
        }

        return wrappedProduct;
    }

    @AuraEnabled
    public static BC_ProductWrapper BC_ProductWrapper(List<PricebookEntry> pricebookEntries) {
        BC_PricebookUtils utils = new BC_PricebookUtils(pricebookEntries);
        BC_ProductWrapper wrappedProduct = new BC_ProductWrapper();
        if(utils.isStandardPricebook()){
            PricebookEntry standardPriceBookEntry = utils.getStandardPricebook();
            wrappedProduct.pricebookId = standardPriceBookEntry.Pricebook2Id;
            wrappedProduct.productId = standardPriceBookEntry.Product2Id;
            wrappedProduct.productName = standardPriceBookEntry.Product2.Name;
            wrappedProduct.productPrice = (Decimal)standardPriceBookEntry.UnitPrice;
            wrappedProduct.productPricebookEntryId = standardPriceBookEntry.Id;
            wrappedProduct.productMainPhotoUrl = standardPriceBookEntry.Product2.MainPhotoUrl__c;
        }

        return wrappedProduct;
    }
}