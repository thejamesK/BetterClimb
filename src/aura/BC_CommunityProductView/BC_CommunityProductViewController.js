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
    handleAddToBasket : function (component, event, helper) {
        let product = JSON.stringify(component.get('v.productWrapper'));

        let action = component.get('c.addItemFromView');
        action.setParams({product: product});
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                if(response.getReturnValue() === true) {
                    let resultsToast = $A.get("e.force:showToast");
                    if (resultsToast) {
                        resultsToast.setParams({
                            "title": "Product added",
                            "type" : "success",
                            "message": component.get('v.productWrapper.productName') + " was added to cart. Quantity: " + component.get('v.productWrapper.productQuantity')
                        });
                        resultsToast.fire();

                        let cartEvent = $A.get("e.c:BC_CartEvent");
                        cartEvent.fire();
                    }
                } else {
                    let resultsToast = $A.get("e.force:showToast");
                    if (resultsToast) {
                        resultsToast.setParams({
                            "title": "Can't add product",
                            "type" : "error",
                            "message": component.get('v.productWrapper.productName') + " is already in your cart"
                        });
                        resultsToast.fire();
                    }
                }
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
})