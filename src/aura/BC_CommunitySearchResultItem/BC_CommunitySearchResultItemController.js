({
    handleProductClick : function (component, event, helper) {
        let product = component.get('v.productWrapper');
        sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(product));
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({
            url : '/product-view'
        });
        navEvt.fire();

    },
    handleAddToCart : function (component, event, helper) {
        let product = JSON.stringify(component.get('v.productWrapper'));
        let action = component.get('c.addItemToBasketCache');
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
                            "message": component.get('v.productWrapper.productName') + " was added to cart"
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
                        "message": "Sorry we were unable to make this request, please try again"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})