public with sharing class BC_ProductController {

    @AuraEnabled
    public static void getPhotosUrl(String productId) {
        List<ContentDocumentLink> contentDocumentLinks = [SELECT LinkedEntityId, ContentDocumentId
                                                            FROM ContentDocumentLink
                                                            WHERE LinkedEntityId = :productId];

        System.debug(contentDocumentLinks);
        List<String> contentDocumentsId = new List<String>();
        for(ContentDocumentLink cdl : contentDocumentLinks) {
            contentDocumentsId.add(cdl.ContentDocumentId);
        }
        System.debug(contentDocumentsId);


        List<ContentDistribution> contentDistributions = [SELECT Id, ContentDownloadUrl, Name, RelatedRecordId, ContentVersionId, ContentDocumentId
                                                            FROM ContentDistribution
                                                            WHERE ContentDocumentId IN :contentDocumentsId];

        System.debug(contentDistributions);
        List<String> photoUrls = new List<String>();
        for (ContentDistribution cont : contentDistributions) {
            photoUrls.add(cont.ContentDownloadUrl);
        }
        System.debug(photoUrls);
    }

}