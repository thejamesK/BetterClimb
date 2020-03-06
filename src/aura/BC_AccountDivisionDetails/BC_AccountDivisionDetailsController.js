({
    handleDivisionRowSelectedEvent: function (component, event, helper) {
        var divisionSelected = event.getParam('selectedDivision');
        console.log(divisionSelected);
        component.set('v.selectedDivision', divisionSelected);
        console.log('Id row selected' + divisionSelected);
        component.set('v.isSelected', true);
    },
    handleDivisionClearEvent : function (component, event, helper) {
        var emptyDivision = event.getParam('emptyDivision');
        console.log(emptyDivision);
        component.set('v.selectedDivisionId', emptyDivision);
        console.log('Id' + emptyDivision);
    },
    handleDeleteRecord: function(component, event, helper) {
        component.set('v.showSpinner', true);
        component.find("recordHandler").deleteRecord($A.getCallback(function(deleteResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                // record is deleted
                console.log("Record is deleted.");
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));
        component.set('v.showSpinner', false);
    },
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            component.set('v.isSelected', false);
            component.set("v.isModalOpen", false);
            // record is deleted, show a toast UI message
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Deleted",
                "message": "The record was deleted.",
                "type": "success"
            });
            resultsToast.fire();

        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    },
    openModal: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    closeModal: function(component, event, helper) {
        // Set isModalOpen attribute to false
        component.set("v.isModalOpen", false);
    },
})