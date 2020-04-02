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
        }
    },
})