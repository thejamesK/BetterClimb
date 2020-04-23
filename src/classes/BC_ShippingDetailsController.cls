public with sharing class BC_ShippingDetailsController {
    @AuraEnabled
    public static User getUserInfo() {
        String userId = UserInfo.getUserId();
        User currentUserDetails = [SELECT Name, Phone, Address FROM User WHERE Id = :userId];
        return currentUserDetails;
    }

    @AuraEnabled
    public static void createOrder(String productList, String userDetails) {
        String userId = UserInfo.getUserId();
        String contactId = [SELECT ContactId FROM User WHERE Id = :userId].ContactId;
        String accountId = [SELECT AccountId FROM Contact WHERE Id = :contactId].AccountId;

        List<BC_ProductWrapper> products = (List<BC_ProductWrapper>)JSON.deserialize(productList, List<BC_ProductWrapper>.class);
        User userInfo = (User)JSON.deserialize(userDetails, User.class);

        String orderId = upsertOrder(userInfo, accountId, contactId);
        upsertOrderItems(orderId, products);

        Cache.Session.remove('local.betterclimb.productList');
    }

    public static String upsertOrder(User userInfo, String accountId, String contactId) {
        Order newOrder = new Order();
        newOrder.Pricebook2Id = [SELECT Id, Name FROM Pricebook2 WHERE Name = 'Standard Price Book'].Id;
        newOrder.AccountId = accountId;
        newOrder.EffectiveDate = Date.today();
        newOrder.Status = 'Draft';
        newOrder.ShipToContactId = contactId;
        newOrder.ShippingStreet = userInfo.Address.getStreet();
        newOrder.ShippingCity = userInfo.Address.getCity();
        newOrder.ShippingState = userInfo.Address.getState();
        newOrder.ShippingPostalCode = userInfo.Address.getPostalCode();
        newOrder.ShippingCountry = userInfo.Address.getCountry();

        upsert newOrder;

        return newOrder.Id;
    }

    public static void upsertOrderItems(String orderId, List<BC_ProductWrapper> productList) {
        List<OrderItem> orderItems = new List<OrderItem>();
        for(BC_ProductWrapper product : productList) {
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.PricebookEntryId = product.productPricebookEntryId;
            if(product.productCurrentPrice!=null){
                newOrderItem.UnitPrice = product.productCurrentPrice;
            } else {
                newOrderItem.UnitPrice = product.productPrice;
            }
            newOrderItem.Product2Id = product.productId;
            newOrderItem.OrderId = orderId;
            newOrderItem.Quantity = product.productQuantity;
            orderItems.add(newOrderItem);
        }
        upsert orderItems;

    }
}