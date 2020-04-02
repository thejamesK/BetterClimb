({
    doInit : function (component, event, helper) {
        let productId = component.get('v.recordId');
        let action = component.get('c.getPhotos');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let contentList = response.getReturnValue();
                component.set('v.contentDistributions', contentList);
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