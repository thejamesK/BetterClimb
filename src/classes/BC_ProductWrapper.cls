public with sharing class BC_ProductWrapper {
    @AuraEnabled public String productName;
    @AuraEnabled public String productId;
    @AuraEnabled public String pricebookId;
    @AuraEnabled public Decimal productPrice;
    @AuraEnabled public List<String> productImageUrls;
}