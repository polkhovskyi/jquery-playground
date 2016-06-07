$.fn.createAutocompleteAndInit = function (element) {
    $.getJSON("./Content/data.json", function (data) {
        $(element).autocomplete({
            source: data.titles,
            select: function (event, ui) {
                //TODO: submit result somewhere
                $("#searchform").submit(function (event) {
                    console.log(ui.item.value);
                });

                $("#searchform").submit();

                return true;
            }
        });
    });
};
