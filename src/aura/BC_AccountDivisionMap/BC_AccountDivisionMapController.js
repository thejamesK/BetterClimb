({
    onAccountsLoaded: function (component, event, helper) {
        var mapMarkers = [];
        var divisions = event.getParam('searchResult');
        if(divisions.length > 0) {
            for(var i = 0; i < divisions.length ; i++) {
                var division = divisions[i];
                var marker = {
                    'location' : {
                        'Street' : division.BillingStreet,
                        'City' : division.BillingCity,
                        'Country' : division.BillingCountry
                    },
                    'title' : division.Name,
                    'icon' : 'standard:location'
                };
                mapMarkers.push(marker);
            }
            component.set('v.mapMarkers', mapMarkers);
            component.set('v.zoomLevel', 4);
        } else {
            component.set('v.mapMarkers', mapMarkers);
            component.set('v.zoomLevel', 1);
        }

    },
    handleRowSelection: function (component, event, helper) {
        var divisionSelected = event.getParam('selectedDivision');
        var marker = {
            'location' : {
                'Street' : divisionSelected.BillingStreet,
                'City' : divisionSelected.BillingCity,
                'Country' : divisionSelected.BillingCountry
            },
            'title' : divisionSelected.Name,
            'icon' : 'standard:location'
        };
        component.set('v.mapMarkers', marker);
        component.set('v.zoomLevel', 16);
    }
})