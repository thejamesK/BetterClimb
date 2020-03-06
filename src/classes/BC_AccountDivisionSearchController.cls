public with sharing class BC_AccountDivisionSearchController {
    @AuraEnabled
    public static List<Account> fetchAccounts(String searchKeyword, String divisionCity, String divisionCountry) {
        String searchKey = searchKeyword + '%';
        String city = divisionCity != null ? divisionCity + '%' : '';
        String country = divisionCountry != null ? divisionCountry + '%' : '';
        String fullQuery = '';
        String baseQuery = 'SELECT Id, Name, RecordType.Name, BillingCity, BillingCountry, BillingStreet, BillingPostalCode FROM Account WHERE RecordType.Name = \'Division\' AND Name LIKE '
                + '\'' + searchKey + '\'';
        List<Account> returnList = new List<Account>();
        String andClause = ' AND ';
        if(city != '') {
            andClause += 'BillingCity LIKE ' + '\'' + city + '\'' + ' AND ';
        }
        if(country != '') {
            andClause += 'BillingCountry LIKE ' + '\'' + country + '\'' + ' AND ';
        }
        andClause = andClause.length() > 5 ? andClause.substring(0,andClause.length()-4) : '';
        fullQuery = baseQuery + andClause;
        System.debug(fullQuery);
        List<Account> listOfAccounts = Database.query(fullQuery);
//        List<Account> listOfAccounts = [SELECT Id, Name, RecordType.Name, BillingCity, BillingCountry, BillingStreet, BillingPostalCode
//                                        FROM Account
//                                        WHERE RecordType.Name = 'Division'
//                                        AND Name LIKE :searchKey];
        for(Account acc : listOfAccounts) {
            returnList.add(acc);
        }
        return returnList;
    }
}