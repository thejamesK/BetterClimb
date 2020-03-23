({
    handleClick : function (component, event, helper) {
        var searchText = component.get('v.searchText');
        var action = component.get('c.searchForProducts');
        action.setParams({searchText: searchText});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if(state === 'SUCCESS') {
                var ids = response.getReturnValue();
                sessionStorage.setItem('BC_CommunitySearchBar--recordIds', JSON.stringify(ids));
                var navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/custom-search-results'});
                navEvt.fire();
                console.log(ids);
            }
        });
        $A.enqueueAction(action);
    }
})