public without sharing class BC_ContentDocumentHelper {
    public static void onAfterInsert(List<ContentDocumentLink> triggerNew, Map<Id, ContentDocumentLink> triggerNewMap) {
        generateContentDistribution(triggerNewMap);
    }
    public static void onBeforeInsert(List<ContentDocumentLink> triggerNew) {
        setVisibility(triggerNew, 'AllUsers');
    }
    public static void onAfterUpdate(List<ContentDocumentLink> triggerNew, Map<Id, ContentDocumentLink> triggerOldMap, Map<Id, ContentDocumentLink> triggerNewMap) {

    }
    public static void onBeforeUpdate(List<ContentDocumentLink> triggerNew, Map<Id, ContentDocumentLink> triggerOldMap) {

    }

    private static void generateContentDistribution(Map<Id, ContentDocumentLink> contentMap) {

        System.debug('CONTENT MAP---' + contentMap);

        List<String> contentDocumentIds = new List<String>();
        for(ContentDocumentLink link : contentMap.values()) {
            contentDocumentIds.add(link.ContentDocumentId);
        }

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

    private static void setVisibility(List<ContentDocumentLink> links, String visibilityGroup) {
        for(ContentDocumentLink link : links) {
            link.Visibility = visibilityGroup;
        }
    }
}