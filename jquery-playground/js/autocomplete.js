$.fn.createAutocompleteAndInit = function (element) {
    $.getJSON("./Content/data.json")
    .done(function (data) {
        if (data && data.titles && data.titles.length > 0) {
            $(element).autocomplete({
                source: data.titles,
                select: function (event, ui) {
                    //TODO: submit result somewhere
                    $("#searchform").submit(function (event) {
                        console.log(ui.item.value);
                    }).submit();

                    return true;
                }
            });
        }
    })
    .fail(function (error) {
        //no autocomplete
    });
};
