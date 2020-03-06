({
    selectDivision: function (component, event, helper) {
        var newTarget = component.get('v.searchResultItem');
        var targetIndex = component.get('v.rowIndex');
        var foo = component.get('v.searchResultItem.Id');
        console.log('id here' + foo);
        console.log(newTarget.Id);
        // var foo = event.getSource().get("v.id");
        // console.log('rowindex' + foo);
        console.log(newTarget);
        var target = component.get("v.searchResultItem")[event.currentTarget.dataset.record],
            selectedRow = JSON.stringify(target);
        // component.find("selectedDivision").set('v.value', selectedRow);
        console.log(target);
        helper.selectRow(component, newTarget);
        // helper.highlightRow(component, newTarget.Id);
        helper.highlightRow(component, targetIndex);
    },
})