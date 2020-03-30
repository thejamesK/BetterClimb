({
    handleGoToProduct : function (component, event, helper) {
        let productId = component.get('v.productId');
        let action = component.get('c.goToProduct');
        action.setParams({
            productId: productId
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            switch(state) {
                case "SUCCESS":
                    let ids = response.getReturnValue();
                    sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(ids));
                    let navEvt = $A.get('e.force:navigateToURL');
                    navEvt.setParams({url: '/product-view'});
                    navEvt.fire();
                    break;
                case "INCOMPLETE":
                    console.log('Incomplete');
                    break;
                case "ERROR":
                    console.log(response.getError());
                    break;
            }
        });
        $A.enqueueAction(action);
    }
})