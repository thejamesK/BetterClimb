({
    handleUploadFinished : function (component, event, helper) {
        let resultsToast = $A.get("e.force:showToast");
        if (resultsToast) {
            resultsToast.setParams({
                "title": $A.get('$Label.c.BC_UploadComplete'),
                "type" : "success",
            });
            resultsToast.fire();
        }
        
        let refresh = $A.get("e.c:BC_ProductPhotoSetEvt");
        refresh.fire();
    }
})