({
    init : function (component, event, helper) {
        let idsJson = sessionStorage.getItem('BC_CommunitySearchBar--recordIds');
        if(!$A.util.isUndefinedOrNull(idsJson)) {
            let ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('BC_CommunitySearchBar--recordIds');
        }
    },
    openModal: function(component, event, helper) {

        component.set("v.isModalOpen", true);
    },
    closeModal: function(component, event, helper) {
        // Set isModalOpen attribute to false
        component.set("v.isModalOpen", false);
    },
    handleLoad: function(cmp, event, helper) {
        // cmp.set('v.showSpinner', false);
    },
    handleSubmit: function(cmp, event, helper) {
        cmp.set('v.disabled', true);
        // cmp.set('v.showSpinner', true);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'New Product Added',
            message: 'New Product successfully created.',
            duration:' 4000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    handleError: function(cmp, event, helper) {
        // errors are handled by lightning:inputField and lightning:messages
        // so this just hides the spinner
        // cmp.set('v.showSpinner', false);
    },
    handleSuccess: function(cmp, event, helper) {
        var params = event.getParams();
        cmp.set('v.recordId', params.response.id);
        // cmp.set('v.showSpinner', false);
        cmp.set('v.saved', true);
        cmp.set('v.isModalOpen', false);
    },
})