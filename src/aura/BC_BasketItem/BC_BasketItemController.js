({
    handleGoToProduct : function (component, event, helper) {
        document.getElementById('basket').style.visibility="hidden";
        let productId = component.get('v.product.productId');
        let action = component.get('c.goToProduct');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let ids = response.getReturnValue();
                sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(ids));
                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/product-view'});
                navEvt.fire();
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get('$Label.c.BC_ToastError'),
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    deleteItem : function (component, event, helper) {
        let productId = component.get('v.product.productId');
        let action = component.get('c.deleteItemFromBasket');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get('$Label.c.BC_ProductDeleted'),
                        "type" : "success",
                        "message": component.get('v.product.productName') +' ' + $A.get('$Label.c.BC_ProductDeletedFromCart')
                    });
                    resultsToast.fire();

                    let cartEvent = $A.get("e.c:BC_CartEvent");
                    cartEvent.fire();
                }
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get('$Label.c.BC_ToastError'),
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    moreQuantity : function (component, event, helper) {
        let action = component.get('c.updateQuantity');
        let productId = component.get('v.product.productId');
        let quantity = component.get('v.product.productQuantity');
        quantity++;
        action.setParams({
            productId: productId,
            quantity: quantity
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set('v.product.productQuantity', quantity);
                let product = component.get('v.product');
                let headerEvent = $A.get("e.c:BC_UpdateBasketHeaderEvent");
                headerEvent.setParams({
                    product: product,
                    moreOrLess: "more",
                    quantity : quantity
                });
                headerEvent.fire();
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get('$Label.c.BC_ToastError'),
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    lessQuantity : function (component, event, helper) {
        let action = component.get('c.updateQuantity');
        let productId = component.get('v.product.productId');
        let quantity = component.get('v.product.productQuantity');
        quantity--;
        if(quantity < 1) {
            quantity = 1;
        } else {
            action.setParams({
                productId: productId,
                quantity: quantity
            });
            action.setCallback(this, function (response) {
                let state = response.getState();
                if(state === "SUCCESS") {
                    component.set('v.product.productQuantity', quantity);
                    let product = component.get('v.product');
                    let headerEvent = $A.get("e.c:BC_UpdateBasketHeaderEvent");
                    headerEvent.setParams({
                        product: product,
                        moreOrLess: "less",
                        quantity : quantity
                    });
                    headerEvent.fire();
                } else {
                    let resultsToast = $A.get("e.force:showToast");
                    if (resultsToast) {
                        resultsToast.setParams({
                            "title": $A.get('$Label.c.BC_ToastError'),
                            "type" : "error",
                            "message": $A.get('$Label.c.BC_ErrorToastMessage')
                        });
                        resultsToast.fire();
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },
})