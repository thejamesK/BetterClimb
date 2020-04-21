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
                            "title": $A.get("$Label.c.BC_ProductAdded"),
                            "type" : "success",
                            "message": component.get('v.productWrapper.productName') +' ' + $A.get("$Label.c.BC_WasAddedToCart")
                        });
                        resultsToast.fire();

                        let cartEvent = $A.get("e.c:BC_CartEvent");
                        cartEvent.fire();
                    }
                } else {
                    let resultsToast = $A.get("e.force:showToast");
                    if (resultsToast) {
                        resultsToast.setParams({
                            "title": $A.get('$Label.c.BC_CantAdd'),
                            "type" : "error",
                            "message": component.get('v.productWrapper.productName') + ' ' + $A.get("$Label.c.BC_AlreadyInCart")
                        });
                        resultsToast.fire();
                    }
                }
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get('$Label.c.BC_ToastError'),
                        "type" : "error",
                        "message": $A.get("$Label.c.BC_ErrorToastMessage")
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})