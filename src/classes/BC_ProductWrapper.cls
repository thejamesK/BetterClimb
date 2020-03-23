public with sharing class BC_ProductWrapper {
    @AuraEnabled public String productName;
    @AuraEnabled public String productId;
    @AuraEnabled public String pricebookId;
    @AuraEnabled public Decimal productPrice;
    @AuraEnabled public List<String> productImageUrls;
    @AuraEnabled public String productDescription;

    @AuraEnabled
    public static BC_ProductWrapper BC_ProductWrapper(PricebookEntry pricebookEntry, List<ContentDistribution> contentDistributions) {
        BC_ProductWrapper wrappedProduct = new BC_ProductWrapper();
        wrappedProduct.pricebookId = pricebookEntry.Pricebook2Id;
        wrappedProduct.productId = pricebookEntry.Product2Id;
        wrappedProduct.productName = pricebookEntry.Product2.Name;
        wrappedProduct.productDescription = pricebookEntry.Product2.Description;
        wrappedProduct.productPrice = (Decimal)pricebookEntry.UnitPrice;
        wrappedProduct.productImageUrls = BC_CommunitySearchController.prepareContentUrls(contentDistributions);
        
        return wrappedProduct;
    }
}