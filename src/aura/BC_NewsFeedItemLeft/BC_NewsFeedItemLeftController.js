({
    handleGoToProduct : function (component, event, helper) {
        let productId = component.get('v.productId');
        let action = component.get('c.goToProduct');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let ids = response.getReturnValue();
                sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(ids));
                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/product-view'});
                navEvt.fire();
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": $A.get("$Label.c.BC_ToastError"),
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