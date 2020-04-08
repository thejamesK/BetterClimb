({
    goToHomepage : function (component, event, helper) {
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/'});
        navEvt.fire();

    }
})