({
    handleClick : function (component, event, helper) {
        let searchText = component.get('v.searchText');
        let action = component.get('c.searchForProducts');
        action.setParams({searchText: searchText});
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let ids = response.getReturnValue();
                sessionStorage.setItem('BC_CommunitySearchBar--recordIds', JSON.stringify(ids));
                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/custom-search-results'});
                navEvt.fire();
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": "Sorry we were unable to make this request, please try again"
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})