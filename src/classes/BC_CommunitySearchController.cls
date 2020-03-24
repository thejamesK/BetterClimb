public with sharing class BC_CommunitySearchController {
    @AuraEnabled
    public static List<BC_ProductWrapper> searchForProducts(String searchText) {
        String keyword = '%' + searchText + '%';
        System.debug(keyword);
        Map<Id, Product2> results = new Map<Id, Product2>([SELECT Id, Name FROM Product2 WHERE Name LIKE :keyword]);

        List<PriceBookEntry> lstpbe = [SELECT Product2.Id, Product2.Name, Product2.Description, UnitPrice, Pricebook2Id, Product2Id
                                        FROM PriceBookEntry
                                        WHERE Product2Id IN (SELECT Id
                                                                FROM Product2
                                                                WHERE Name LIKE :keyword)];

        Map<Id, List<ContentDistribution>> productToContent = prepareProductsContent(results.keySet());
        System.debug(productToContent);


        List<BC_ProductWrapper> wrappedProductList = new List<BC_ProductWrapper>();

        for(PricebookEntry pbe : lstpbe) {
            wrappedProductList.add(BC_ProductWrapper.BC_ProductWrapper(pbe, productToContent.get(pbe.Product2.Id)));
        }

        return wrappedProductList;
    }


//    public static BC_ProductWrapper wrapProduct(PricebookEntry pricebookEntry, List<ContentDistribution> contentDistributions) {
//        BC_ProductWrapper wrappedProduct = new BC_ProductWrapper();
//        wrappedProduct.pricebookId = pricebookEntry.Pricebook2Id;
//        wrappedProduct.productId = pricebookEntry.Product2Id;
//        wrappedProduct.productName = pricebookEntry.Product2.Name;
//        wrappedProduct.productPrice = (Decimal)pricebookEntry.UnitPrice;
//        wrappedProduct.productImageUrls = prepareContentUrls(contentDistributions);
//
//        return wrappedProduct;
//    }

    public static Map<Id, List<ContentDistribution>> prepareProductsContent(Set<Id> productIds) {
                Map<Id, List<ContentDistribution>> contentIdToContentDistributionList  = new Map<Id, List<ContentDistribution>>();
        Map<Id, ContentDocumentLink> contentVersionIdToContentDocumentLink = new Map<Id, ContentDocumentLink>();

        Map<Id,ContentDocumentLink> contentDocumentLinks = new Map<Id, ContentDocumentLink>();

        for(ContentDocumentLink link : [
                SELECT ContentDocumentId, Visibility, LinkedEntityId FROM ContentDocumentLink
                WHERE LinkedEntityId IN :productIds]) {
            contentDocumentLinks.put(link.ContentDocumentId, link);
        }

        Map<Id, ContentVersion> contentVersions = new Map<Id, ContentVersion>([
                SELECT Id, ContentDocumentId FROM ContentVersion
                WHERE ContentDocumentId IN :contentDocumentLinks.keySet()
                AND FileType IN ('PNG', 'JPG', 'JPEG')
        ]);

        for(ContentVersion cont : contentVersions.values()) {
            if(contentDocumentLinks.containsKey(cont.ContentDocumentId)) {
                contentVersionIdToContentDocumentLink.put(cont.Id, contentDocumentLinks.get(cont.ContentDocumentId));
            }
        }

        for(ContentDistribution cont : [SELECT Id, ContentDownloadUrl, ContentVersionId FROM ContentDistribution WHERE ContentVersionId IN :contentVersions.keySet()]) {
            if(contentIdToContentDistributionList.containsKey(contentVersionIdToContentDocumentLink.get(cont.ContentVersionId).LinkedEntityId)) {
                contentIdToContentDistributionList.get(contentVersionIdToContentDocumentLink.get(cont.ContentVersionId).LinkedEntityId).add(cont);
            } else {
                contentIdToContentDistributionList.put(contentVersionIdToContentDocumentLink.get(cont.ContentVersionId).LinkedEntityId, new List<ContentDistribution>{cont});
            }
        }

        return contentIdToContentDistributionList;

    }

    public static List<String> prepareContentUrls(List<ContentDistribution> contentDistributions) {
        List<String> contentUrls = new List<String>();
        if(!contentDistributions.isEmpty()) {
            for(ContentDistribution cont : contentDistributions) {
                contentUrls.add(cont.ContentDownloadUrl);
            }
        }
        return contentUrls;
    }

}