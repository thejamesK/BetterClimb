({
    loadRating : function (component, productId) {
        let action = component.get('c.getRating');
        action.setParams({
            'productId': productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === 'SUCCESS') {
                let storeResponse = response.getReturnValue();
                component.set('v.productRating', storeResponse);
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
    }
})