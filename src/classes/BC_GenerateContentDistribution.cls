public with sharing class BC_GenerateContentDistribution {

    public static void createPublicExternalUrls() {
        List<Product2> products = [SELECT Id FROM Product2];

        List<String> productIds = new List<String>();
        for(Product2 pr : products) {
            productIds.add(pr.Id);
        }

        List<ContentDocumentLink> contentDocumentLinks = [
                SELECT ContentDocumentId, Visibility FROM ContentDocumentLink
                WHERE LinkedEntityId IN :productIds
        ];

        List<String> contentDocumentIds = new List<String>();
        for(ContentDocumentLink link : contentDocumentLinks) {
            contentDocumentIds.add(link.ContentDocumentId);
            link.Visibility = 'AllUsers';
        }
        update contentDocumentLinks;

        List<ContentVersion> contentVersions = [
                SELECT Id FROM ContentVersion
                WHERE ContentDocumentId IN :contentDocumentIds
                AND FileType IN ('PNG', 'JPG', 'JPEG')
        ];

        List<String> contentVersionIds = new List<String>();
        for(ContentVersion contentVersion : contentVersions) {
            contentVersionIds.add(contentVersion.Id);
        }

        List<ContentDistribution> contentDistributions = new List<ContentDistribution>();

        for(ContentVersion contentVersion : contentVersions) {
            ContentDistribution cd = new ContentDistribution();
            cd.Name = 'PublicProductImage';
            cd.ContentVersionId = contentVersion.Id;
            cd.PreferencesAllowViewInBrowser = true;
            cd.PreferencesLinkLatestVersion = true;
            cd.PreferencesNotifyOnVisit = false;
            cd.PreferencesPasswordRequired = false;
            cd.PreferencesAllowOriginalDownload = true;
            contentDistributions.add(cd);
        }
        insert contentDistributions;
    }
}