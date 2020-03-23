({
    onInit : function(component, event, helper) {
        let service = component.find("service");
        service.getNewRecord(
            "ProductReview__c",
            null,
            false,
            $A.getCallback(function() {
                let rec = component.get("v.productReview");
                let error = component.get("v.recordError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    console.log(rec);
                }
            })
        );
    }
})