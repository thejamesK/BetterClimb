({
    handleBasketClick : function (component, event, helper) {
        document.getElementById('basket').style.visibility="hidden";
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({
            url : '/basket-view'
        });
        navEvt.fire();
    },
    showBasket : function (component, event, helper) {
        document.getElementById('basket').style.visibility="visible";
    },
    hideBasket : function (component, event, helper) {
        document.getElementById('basket').style.visibility="hidden";
    },
    doInit : function (component, event, helper) {
        let action = component.get('c.getBasketItems');
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let productList = response.getReturnValue();
                component.set('v.productList', productList);
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
    handleCheckoutEvt : function (component, event, helper) {
        let productList = component.get('v.productList');
        sessionStorage.setItem('BC_Checkout--productList', JSON.stringify(productList));
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/checkout'});
        navEvt.fire();
    }
})