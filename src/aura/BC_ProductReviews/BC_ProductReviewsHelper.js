({
    onInit : function(component, event, helper) {
        let product = component.get("v.product");
        let action = component.get("c.getAllReviews");
        action.setParams({
            "productId": product.productId
        });

        action.setCallback(this, function(response) {
            let state = response.getState();
            switch(state) {
                case "SUCCESS":
                    let reviews = response.getReturnValue();
                    component.set("v.productReviews", reviews);
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