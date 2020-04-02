({
    init : function (component, event, helper) {
        console.log('init');
        let action = component.get('c.getUserInfo');
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let userInfo = response.getReturnValue();
                component.set('v.userDetails', userInfo);
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    handleShippingDetailsEvt : function (component, event, helper) {
        console.log('odbieram event');
        let productList = event.getParam('productList');
        let userDetails = component.get('v.userDetails');
        component.set('v.productList', productList);
        let productListJSON = JSON.stringify(productList);
        let userDetailsJSON = JSON.stringify(userDetails);
        console.log(productListJSON);
        console.log(userDetailsJSON);
        let action = component.get('c.createOrder');
        action.setParams({
            productList: productListJSON,
            userDetails: userDetailsJSON
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if(state === "SUCCESS") {
                let cartEvt = $A.get("e.c:BC_CartEvent");
                cartEvt.fire();
                let navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/thank-you'});
                navEvt.fire();
            } else {
                let resultsToast = $A.get("e.force:showToast");
                if (resultsToast) {
                    resultsToast.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": $A.get('$Label.c.BC_ErrorToastMessage')
                    });
                    resultsToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
})