({
    handleProductClick : function (component, event, helper) {
        let product = component.get('v.productWrapper');
        console.log(product);
        sessionStorage.setItem('BC_CommunityProductView--product', JSON.stringify(product));
        let navEvt = $A.get('e.force:navigateToURL');
        navEvt.setParams({
            url : '/product-view'
        });
        navEvt.fire();
    }
})