public with sharing class BC_PricebookController {
    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries(String pricebookId) {
        System.debug('pricebookId ' + pricebookId);
        List<PricebookEntry> pricebookEntries = [SELECT Id, Product2.Name, Product2.MainPhotoUrl__c, Product2.ProductCode, UnitPrice, IsActive
                                                    FROM PricebookEntry
                                                    WHERE Pricebook2Id = :pricebookId];

        return pricebookEntries;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> searchForProducts(String productName, String productFamily, String pricebookId) {
        System.debug(pricebookId);
        Set<String> productsInPricebook = new Set<String>();
        String queryPart = '';
        List<PricebookEntry> pricebookEntries = [SELECT Id, Product2Id FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];
        for(PricebookEntry pbe : pricebookEntries) {
            productsInPricebook.add(pbe.Product2Id);
        }
        List<BC_ProductWrapper> wrappedProducts = new List<BC_ProductWrapper>();
        String baseQuery = 'SELECT Id, Name, (SELECT Id, Pricebook2.Name, UnitPrice, Product2Id, Pricebook2Id, Product2.Name, Product2.ProductCode, Product2.MainPhotoUrl__c FROM PricebookEntries WHERE Pricebook2.Name =' + '\'Standard Price Book' + '\') FROM Product2 WHERE ';
        if(productName != null && productName != '') {
            queryPart = 'Name LIKE ' + '\'%' + productName + '%\' AND ';
            baseQuery = baseQuery + queryPart;
        }
        if(productFamily != null && productFamily != '') {
            queryPart = 'Family =' + '\'' + productFamily +  '\'' + ' AND ';
            baseQuery = baseQuery + queryPart;
        }
        if(queryPart != '') {
//            baseQuery = baseQuery.substring(0, baseQuery.length()-4);
            String sortPart = 'Id NOT IN :productsInPricebook';
            baseQuery = baseQuery + sortPart;
            System.debug(baseQuery);
        } else {
            baseQuery = baseQuery.substring(0, baseQuery.length()-7);
            String sortPart = ' WHERE Id NOT IN :productsInPricebook';
            baseQuery = baseQuery + sortPart;
            System.debug(baseQuery);
        }
//        baseQuery = baseQuery.substring(0, baseQuery.length()-4);
//        String sortPart = ' Id NOT IN '+ '\'' + productsInPricebook + '\'' ;
//        baseQuery = baseQuery + sortPart;
//        System.debug('BASE QUERY: ' + baseQuery);
        System.debug(productsInPricebook);
        List<Product2> products = Database.query(baseQuery);
        for(Product2 prod : products){
            wrappedProducts.add(BC_ProductWrapper.BC_ProductWrapper(prod.PricebookEntries));
        }

        System.debug(wrappedProducts);

        return wrappedProducts;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> selectedProducts(String products) {
        List<BC_ProductWrapper> wrappedProducts = (List<BC_ProductWrapper>)JSON.deserialize(products, List<BC_ProductWrapper>.class);
        List<BC_ProductWrapper> selectedProducts = new List<BC_ProductWrapper>();

        for(BC_ProductWrapper wrapper : wrappedProducts) {
            if(wrapper.isProductSelected == true) {
                selectedProducts.add(wrapper);
            }
        }

        System.debug(selectedProducts);
        return selectedProducts;
    }

    @AuraEnabled
    public static void createPricebookEntries(String productsJSON, String pricebookId) {
        List<BC_ProductWrapper> productsToPbe = (List<BC_ProductWrapper>)JSON.deserialize(productsJSON, List<BC_ProductWrapper>.class);
        List<PricebookEntry> pbeToInsert = new List<PricebookEntry>();
        for(BC_ProductWrapper product : productsToPbe) {
            PricebookEntry newEntry = new PricebookEntry();
            if(product.currentPBEId != null){
                newEntry.Id = product.currentPBEId;
                newEntry.UnitPrice = product.productPriceToSet;
                pbeToInsert.add(newEntry);
            } else {
                newEntry.IsActive = true;
                newEntry.UnitPrice = product.productPriceToSet;
                newEntry.Product2Id = product.productId;
                newEntry.Pricebook2Id = pricebookId;
                pbeToInsert.add(newEntry);
            }
        }

        upsert pbeToInsert;
    }

    @AuraEnabled
    public static void deletePricebookEntry(String pricebookEntryId) {
        PricebookEntry pbeToDelete = [SELECT Id FROM PricebookEntry WHERE Id = :pricebookEntryId];
        delete pbeToDelete;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> setGlobalDiscount(String productList, Decimal discountAmount) {
        List<BC_ProductWrapper> products = (List<BC_ProductWrapper>)JSON.deserialize(productList, List<BC_ProductWrapper>.class);
        for(BC_ProductWrapper wrap : products) {
            wrap.productPriceToSet = wrap.productPrice - discountAmount;
            if(wrap.productPriceToSet <= 0) {
                wrap.productPriceToSet = 0.01;
            }
        }
        System.debug(products);

        return products;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> setGlobalPercentDiscount(String productList, Decimal discountPercent) {
        System.debug(discountPercent);
        List<BC_ProductWrapper> products = (List<BC_ProductWrapper>)JSON.deserialize(productList, List<BC_ProductWrapper>.class);
        for(BC_ProductWrapper wrap : products) {
            wrap.productPriceToSet = wrap.productPrice - (wrap.productPrice*discountPercent);
            if(wrap.productPriceToSet <= 0) {
                wrap.productPriceToSet = 0.01;
            }
        }

        System.debug(products);
        return products;
    }

    @AuraEnabled
    public static void deletePricebook(String pricebookId) {
        Pricebook2 pbToDelete = [SELECT Id FROM Pricebook2 WHERE Id = :pricebookId];
        delete pbToDelete;
    }

    @AuraEnabled
    public static void deletePricebookEntries(String pricebookId) {
        List<PricebookEntry> pbeToDelete = [SELECT Id FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];
        System.debug(pbeToDelete);
        delete pbeToDelete;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> getPricebookProducts(String pricebookId) {
        Set<String> productsInPricebook = new Set<String>();
        List<PricebookEntry> pricebookEntries = [SELECT Id, Product2Id FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];
        for(PricebookEntry pbe : pricebookEntries) {
            productsInPricebook.add(pbe.Product2Id);
        }
        List<Product2> pbProducts = [SELECT Id, Name,
                                    (SELECT Id, Pricebook2.Name, UnitPrice, Product2Id, Pricebook2Id, Product2.Name, Product2.ProductCode, Product2.MainPhotoUrl__c
                                        FROM PricebookEntries
                                        WHERE Pricebook2.Name = 'Standard Price Book')
                                    FROM Product2 WHERE Id IN :productsInPricebook];
        System.debug(pbProducts);
        List<BC_ProductWrapper> wrappedProducts = new List<BC_ProductWrapper>();
        for(Product2 prod : pbProducts){
            wrappedProducts.add(BC_ProductWrapper.BC_ProductWrapper(prod.PricebookEntries));
        }
        for(BC_ProductWrapper wrap : wrappedProducts) {
            for(PricebookEntry entry : pricebookEntries) {
                if(entry.Product2Id == wrap.productId) {
                    wrap.currentPBEId = entry.Id;
                }
            }
        }
        System.debug(wrappedProducts);

        return wrappedProducts;
    }
}