({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },
    onUserInfoClick : function(component, event, helper) {
        let userid = event.target.getAttribute("data-userid");
        let redirectEvent = $A.get("e.force:navigateToSObject");
        if (redirectEvent) {
            redirectEvent.setParams({
                "recordId": userid
            });
            redirectEvent.fire();
        }
    }
})