({
    doInit : function (component, event, helper) {
        let action = component.get('c.getTotalPrice');
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let totalPrice = response.getReturnValue();
                component.set('v.totalPrice', totalPrice);
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
    handleUpdateHeader : function (component, event, helper) {
        let product = event.getParam('product');
        let moreOrLess = event.getParam('moreOrLess');
        let quantity = event.getParam('quantity');
        let totalPrice = component.get('v.totalPrice');
        if(moreOrLess === "more") {
            totalPrice = totalPrice + product.productCurrentPrice;
            component.set('v.totalPrice', totalPrice);
        } else {
            totalPrice = totalPrice - product.productCurrentPrice;
            component.set('v.totalPrice', totalPrice);
        }
    },
    handleCheckoutEvt : function (component, event, helper) {
        let totalPrice = component.get('v.totalPrice');
        sessionStorage.setItem('BC_Checkout--totalPrice', totalPrice);
    }
})