public with sharing class BC_PricebookSearchController {
    @AuraEnabled
    public static List<Pricebook2> searchForPromotions(String promotionName, Date promotionStartDate, Date promotionEndDate) {
        String queryPart = '';
        String baseQuery = 'SELECT Id, Name, DiscountStartDate__c, DiscountEndDate__c, isActive FROM Pricebook2 WHERE ';
        if(promotionName != null && promotionName != '') {
            queryPart = 'Name LIKE ' + '\'%' + promotionName + '%\' AND ';
            baseQuery = baseQuery + queryPart;
        }
        if(promotionStartDate != null) {
            String startDate = String.valueOf(promotionStartDate);
            queryPart = 'DiscountStartDate__c >= ' + startDate + ' AND ';
            baseQuery = baseQuery + queryPart;
        }
        if(promotionEndDate != null) {
            String endDate = String.valueOf(promotionEndDate);
            queryPart = 'DiscountEndDate__c <= ' + endDate + ' AND ';
            baseQuery = baseQuery + queryPart;
        }
        System.debug(queryPart);
        if(queryPart != '') {
            baseQuery = baseQuery.substring(0, baseQuery.length()-4);
        } else {
            baseQuery = baseQuery.substring(0, baseQuery.length()-7);
        }
        String sortPart = ' ORDER BY DiscountStartDate__c ASC';
        baseQuery = baseQuery + sortPart;
        System.debug('QUERY ' + baseQuery);
        List<Pricebook2> foundedPricebooks = Database.query(baseQuery);
        System.debug(promotionName);
        System.debug(promotionStartDate);
        System.debug(promotionEndDate);
        System.debug(foundedPricebooks);

        return foundedPricebooks;
    }

    @AuraEnabled
    public static List<Pricebook2> getActivePromotions() {
        List<Pricebook2> activePromotions = [SELECT Id, Name, DiscountStartDate__c, DiscountEndDate__c
                                                FROM Pricebook2
                                                WHERE IsActive = true
                                                AND ((DiscountStartDate__c <= TODAY
                                                OR DiscountStartDate__c = null)
                                                AND (DiscountEndDate__c >= TODAY
                                                OR DiscountEndDate__c = null))
                                                ORDER BY DiscountStartDate__c ASC];
        System.debug(activePromotions);
        return activePromotions;
    }
}