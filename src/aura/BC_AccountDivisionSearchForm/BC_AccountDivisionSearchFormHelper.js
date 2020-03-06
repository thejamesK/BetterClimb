({
    createExpense: function(component, divisionToSearch) {
        var theAccounts = component.get("v.accounts");

        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        var searchingDivision = JSON.parse(JSON.stringify(divisionToSearch));

        theAccounts.push(searchingDivision);
        component.set("v.accounts", theAccounts);
    }
});