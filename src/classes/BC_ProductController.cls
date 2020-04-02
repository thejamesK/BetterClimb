public with sharing class BC_ProductController {

    @AuraEnabled
    public static List<ContentDistribution> getPhotos(String productId) {
        List<ContentDocumentLink> contentDocumentLinks = [SELECT LinkedEntityId, ContentDocumentId
                                                            FROM ContentDocumentLink
                                                            WHERE LinkedEntityId = :productId];

        System.debug(contentDocumentLinks);
        List<String> contentDocumentsId = new List<String>();
        for(ContentDocumentLink cdl : contentDocumentLinks) {
            contentDocumentsId.add(cdl.ContentDocumentId);
        }

        List<ContentDistribution> contentDistributions = [SELECT Id, ContentDownloadUrl, Name, RelatedRecordId, ContentVersionId, ContentDocumentId
                                                            FROM ContentDistribution
                                                            WHERE ContentDocumentId IN :contentDocumentsId];

        return contentDistributions;
    }

    @AuraEnabled
    public static void setMainPhoto(String productId, String photoUrl) {
        Product2 currentProduct = [SELECT Id, MainPhotoUrl__c FROM Product2 WHERE Id = :productId];
        currentProduct.mainPhotoUrl__c = photoUrl;
        upsert currentProduct;
    }

    @AuraEnabled
    public static Product2 getProduct(String productId) {
        Product2 product = [SELECT Id, MainPhotoUrl__c FROM Product2 WHERE Id = :productId];
        return product;
    }
}