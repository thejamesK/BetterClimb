({
    selectMainPhoto : function (component, event, helper) {
        let productId = component.get('v.productId');
        let photoUrl = component.get('v.content.ContentDownloadUrl');
        let action = component.get('c.setMainPhoto');
        action.setParams({
            productId: productId,
            photoUrl: photoUrl
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Main photo is changed.",
                        "type" : "success",
                    });
                    resultsToast.fire();
                }

                let photoSetEvt = $A.get("e.c:BC_ProductPhotoSetEvt");
                photoSetEvt.fire();

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
    doInit : function (component, event, helper) {
        let productId = component.get('v.productId');
        let action = component.get('c.getProduct');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let product = response.getReturnValue();
                component.set('v.product', product);
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