({
    handleGoToBasket : function (component, event, helper) {
        document.getElementById('basket').style.visibility="hidden";
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({url: '/basket-view'});
        navEvt.fire();
    },
    handleGoToOrderSummary : function (component, event, helper) {
        let checkoutEvent = $A.get('e.c:BC_CheckoutFromIcon');
        checkoutEvent.fire();
    }
})