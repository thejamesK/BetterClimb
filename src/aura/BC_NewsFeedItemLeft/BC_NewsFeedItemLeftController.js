({
    handleGoToProduct : function (component, event, helper) {
        let productId = component.get('v.productId');
        let action = component.get('c.goToProduct');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === 'SUCCESS') {
                var ids = response.getReturnValue();
                sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(ids));
                var navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/product-view'});
                navEvt.fire();
            }
        });
        $A.enqueueAction(action);
    }
})