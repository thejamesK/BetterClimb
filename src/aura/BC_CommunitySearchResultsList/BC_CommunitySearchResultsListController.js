({
    init : function (component, event, helper) {
        console.log(sessionStorage.getItem('BC_CommunitySearchBar--recordIds'));
        let idsJson = sessionStorage.getItem('BC_CommunitySearchBar--recordIds');
        if(!$A.util.isUndefinedOrNull(idsJson)) {
            let ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('BC_CommunitySearchBar--recordIds');
        }
    }
})