({
    init : function (component, event, helper) {
        console.log(sessionStorage.getItem('BC_CommunitySearchBar--recordIds'));
        var idsJson = sessionStorage.getItem('BC_CommunitySearchBar--recordIds');
        console.log('ids->>>>>' + idsJson);
        if(!$A.util.isUndefinedOrNull(idsJson)) {
            var ids = JSON.parse(idsJson);
            console.log('ids inside ->>>>>> ' + ids);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('BC_CommunitySearchBar--recordIds');
        }

    }
})