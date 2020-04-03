({
    onInit : function(component, event, helper) {
        let product = component.get("v.product");
        let action = component.get("c.getAllReviews");
        action.setParams({
            "productId": product.productId
        });

        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let reviews = response.getReturnValue();
                component.set("v.productReviews", reviews);
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
})