({
    handleSearchResultEvent: function (component, event, helper) {
        var searchResult = event.getParam('searchResult');
        var totalNumberOfRecord = event.getParam('totalNumberOfRecord');
        component.set('v.searchResult', searchResult);
        component.set('v.totalNumberOfRecord', totalNumberOfRecord);
        console.log(searchResult);
    },
    selectDivision: function (component, event, helper) {
        var target = component.get("v.searchResult")[event.currentTarget.dataset.record],
            selectedRow = JSON.stringify(target);
        // component.find("selectedDivision").set('v.value', selectedRow);
        console.log(target);
        helper.selectRow(component, target);
    },
    handleHighlightRowEvent: function (component, event, helper) {
        var rowId = event.getParam('selectedRowId');
        console.log('rowId::' + rowId);
        // var tableRow = component.find('resultTable');
        // console.log(tableRow.rowIndex);
        component.set('v.rowToHighlight', rowId);
    },
})