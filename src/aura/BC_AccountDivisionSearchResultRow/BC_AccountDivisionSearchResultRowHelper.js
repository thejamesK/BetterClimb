({
    selectRow: function (component, selectedRow) {
        this.fireSelectEvent(component, selectedRow);
    },
    fireSelectEvent: function (component, selectedRow) {
        var selectEvent = $A.get("e.c:BC_AccountDivisionRowSelectedEvent");
        selectEvent.setParams({
            "selectedDivision" : selectedRow
        });
        selectEvent.fire();
    },
    highlightRow: function (component, rowToHighlightId) {
        this.fireHighlightEvent(component, rowToHighlightId);
    },
    fireHighlightEvent: function (component, rowToHighlightId) {
        var highlightEvent = component.getEvent('highlightDivisionEvent');
        highlightEvent.setParams({
            "selectedRowId" : rowToHighlightId
        });
        highlightEvent.fire();
    }
})