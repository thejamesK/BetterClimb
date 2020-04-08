public with sharing class BC_ProductReviews {
    @AuraEnabled
    public static List<ProductReview__c> getAllReviews(String productId) {
        List<ProductReview__c> output = [SELECT Id, Name, Comment__c, Rating__c, LastModifiedDate, CreatedDate, CreatedBy.Id, CreatedBy.Name, CreatedBy.SmallPhotoUrl
                                            FROM ProductReview__c
                                            WHERE ProductId__c = :productId];

        return output;
    }
}