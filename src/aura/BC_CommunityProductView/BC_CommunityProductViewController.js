({
    init : function (component, event, helper) {
        let productJSON = sessionStorage.getItem('BC_CommunityProductView--product');
        if(!$A.util.isUndefinedOrNull(productJSON)) {
            let product = JSON.parse(productJSON);
            component.set('v.productWrapper', product);
            sessionStorage.removeItem('BC_CommunityProductView--product');
            let productId = component.get('v.productWrapper.productId');
            helper.loadRating(component, productId);
        }
    },
    onProductReviewAdded : function(component, event, helper) {
        let reviews = component.find("reviews");
        if (reviews) {
            reviews.refresh();
        }

        component.find("tabs").set('v.selectedTabId', 'productReviewTab');
        let productId = component.get('v.productWrapper.productId');
        helper.loadRating(component, productId);
    },
})