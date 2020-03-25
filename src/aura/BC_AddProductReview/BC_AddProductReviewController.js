({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },

    onSave : function(component, event, helper) {
        let productId = component.get("v.product.productId");
        component.set("v.productReview.ProductId__c",component.get("v.product.productId"));

        let title = component.find('reviewTitle');
        let isValueMissing = title.get('v.validity').valueMissing;
        if(isValueMissing) {
            title.showHelpMessageIfInvalid();
            title.focus();
        } else {
            let service = component.find("service");
            service.saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    let resultsToast = $A.get("e.force:showToast");
                    if (resultsToast) {
                        resultsToast.setParams({
                            "title": "Saved",
                            "type" : "success",
                            "message": "The review was added."
                        });
                        resultsToast.fire();
                    } else {
                        alert("The record was saved.");
                    }

                    let productReviewAdded = component.getEvent("ProductReviewAdded");
                    productReviewAdded.fire();

                    helper.onInit(component, event, helper);
                } else if (saveResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    console.log('Problem saving review, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    },
})