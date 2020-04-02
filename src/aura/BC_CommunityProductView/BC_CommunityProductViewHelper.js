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
            } else if (state === 'INCOMPLETE') {
                alert('Response is Incompleted');
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }
})