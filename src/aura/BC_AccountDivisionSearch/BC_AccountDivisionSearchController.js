({
    search: function (component, event, helper) {
        var searchField = component.find('searchField');
        var divisionCity = component.find('divisionCity');
        var divisionCountry = component.find('divisionCountry');
        var isValueMissing = searchField.get('v.validity').valueMissing;
        var emptyDivision = component.get('v.emptyDivision');
        console.log(emptyDivision);
        if(isValueMissing) {
            searchField.showHelpMessageIfInvalid();
            searchField.focus();
        } else {
            helper.searchHelper(component, event);
            // this.clearDivisionDetails(component, event, helper);
        }
    },
    clearDivisionDetails: function (component, event, helper) {
        var emptyDivision = component.get('v.emptyDivision');
        console.log(emptyDivision);
        helper.fireClearEvent(component, emptyDivision);
    }
})