({
    searchDivision: function(component, event, helper) {
        var validExpense = component.find('searchAccountForm').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validExpense){
            var divisionToSearch = component.get("v.divisionToSearch");
            console.log("Search for: " + JSON.stringify(divisionToSearch));
            helper.createExpense(component, divisionToSearch);
        }
    }
});