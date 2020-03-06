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
})