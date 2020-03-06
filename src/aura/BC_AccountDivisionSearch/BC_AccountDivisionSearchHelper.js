({
    searchHelper: function (component, event) {
        component.find('spinner').set('v.class', 'slds-show');
        var action = component.get('c.fetchAccounts');
        action.setParams({
            'searchKeyword' : component.get('v.searchKeyword'),
            'divisionCity' : component.get('v.divisionCity'),
            'divisionCountry' : component.get('v.divisionCountry'),
        });
        action.setCallback(this, function (response) {
            component.find('spinner').set('v.class', 'slds-hide');
            var state = response.getState();
            if(state === 'SUCCESS') {
                var storeResponse = response.getReturnValue();
                if(storeResponse.length == 0) {
                    component.set("v.message", true);
                } else {
                    component.set("v.message", false);
                }
                component.set("v.totalNumberOfRecord", storeResponse.length);
                component.set("v.searchResult", storeResponse);
                this.fireSearchEvent(component);
                this.fireClearEvent(component);
            } else if(state === "INCOMPLETE") {
                alert('Response is Incompleted');
            } else if(state === "ERROR") {
                var errors =  response.getError();
                if(errors) {
                    if(errors[0] && errors[0].message) {
                        alert("Error message: " + errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    fireSearchEvent: function (component) {
        var searchEvent = $A.get("e.c:BC_AccountDivisionSearchResultEvent");
        searchEvent.setParams({
            "searchResult" : component.get('v.searchResult'),
            "totalNumberOfRecord" : component.get('v.totalNumberOfRecord')
        });
        searchEvent.fire();
    },
    fireClearEvent: function (component) {
        var selectEvent = $A.get("e.c:BC_AccountDivisionClearDetailsEvent");
        selectEvent.setParams({
            "emptyDivision" : component.get('v.emptyDivision')
        });
        selectEvent.fire();
    }
})