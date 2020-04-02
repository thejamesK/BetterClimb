public with sharing class BC_CommunityProductViewController {
    @AuraEnabled
    public static BC_RatingWrapper getRating(String productId) {
        BC_RatingWrapper productRatingAndVotes = new BC_RatingWrapper();
        Double ratingSum = 0;

        List<ProductReview__c> productReviews = new List<ProductReview__c>();
        productReviews = [SELECT Rating__c FROM ProductReview__c WHERE ProductId__c =:productId];
        for(ProductReview__c review : productReviews) {
            ratingSum += review.Rating__c;
        }

        if(productReviews.size() > 0){
            productRatingAndVotes.vote_count = productReviews.size();
            productRatingAndVotes.vote_average = ratingSum / productRatingAndVotes.vote_count;
        }
        
        return productRatingAndVotes;
    }
    
    @AuraEnabled
    public static Boolean addItemFromView(String product) {
        return BC_BasketController.addItemToBasketCache(product);
    }
}