({
    init : function (component, event, helper) {
        console.log(sessionStorage.getItem('BC_CommunityProductView--product'));
        console.log('halo product view here');
        let productJSON = sessionStorage.getItem('BC_CommunityProductView--product');
        console.log('product---->>>>' + productJSON);
        if(!$A.util.isUndefinedOrNull(productJSON)) {
            let product = JSON.parse(productJSON);
            console.log('ids inside ->>>>>> ' + product);
            component.set('v.productWrapper', product);
            sessionStorage.removeItem('BC_CommunityProductView--product');
        }
    }
})