public with sharing class BC_BasketController {
    @AuraEnabled
    public static Boolean addItemToBasketCache(String product) {
        if(Cache.Session.contains('local.betterclimb.productList')) {
            List<BC_ProductWrapper> productsInBasket = (List<BC_ProductWrapper>)Cache.Session.get('local.betterclimb.productList');
            BC_ProductWrapper addedProduct = (BC_ProductWrapper)JSON.deserialize(product, BC_ProductWrapper.class);
            for(BC_ProductWrapper products : productsInBasket) {
                if(products.productId == addedProduct.productId) {
                    return false;
                }
            }
            return putListToCache(product, productsInBasket);
        } else {
            List<BC_ProductWrapper> productsInBasket = new List<BC_ProductWrapper>();
            return putListToCache(product, productsInBasket);
        }
    }

    public static Boolean putListToCache(String productInJSON, List<BC_ProductWrapper> productList) {
        BC_ProductWrapper addedProduct = (BC_ProductWrapper)JSON.deserialize(productInJSON, BC_ProductWrapper.class);
        productList.add(addedProduct);
        Cache.Session.put('local.betterclimb.productList', productList);
        return true;
    }

    @AuraEnabled
    public static List<BC_ProductWrapper> getBasketItems() {
        List<BC_ProductWrapper> productsInBasket = new List<BC_ProductWrapper>();
        if(Cache.Session.contains('local.betterclimb.productList')) {
            productsInBasket = (List<BC_ProductWrapper>)Cache.Session.get('local.betterclimb.productList');
        } else {
            productsInBasket = new List<BC_ProductWrapper>();
        }
        return productsInBasket;
    }

    @AuraEnabled
    public static Decimal getTotalPrice() {
        Decimal totalPrice = 0;
        if(Cache.Session.contains('local.betterclimb.productList')) {
            List<BC_ProductWrapper> productsInBasket = (List<BC_ProductWrapper>)Cache.Session.get('local.betterclimb.productList');
            for(BC_ProductWrapper product : productsInBasket) {
                if(product.productCurrentPrice!=null) {
                    totalPrice = totalPrice + (product.productCurrentPrice * product.productQuantity);
                } else {
                    totalPrice = totalPrice + (product.productPrice * product.productQuantity);
                }
            }
        } else {
            totalPrice = 0;
        }
        return totalPrice;
    }
}