$.fn.createNavigationAndInit = function (element) {
    $.getJSON("./Content/navigation.json")
    .done(function (data) {
        if (!data || data.length == 0) {
            return;
        }

        var activeIndex = parseInt(sessionStorage.activeIndex);
        var items = "";

        if (!activeIndex) {
            activeIndex = -1;
        }

        $.each(data, function (key, val) {
            if (val.id == "advertisment" && activeIndex < 0) {
                activeIndex = key;
            }

            var item = "<h3 class='" + val.id + "'>";
            item += "<a href='#'>" + val.title + "</a>";
            item += "</h3>";
            item += "<div>";
            item += "<ul>";
            $.each(val.subitems, function (key, val) {
                item += "<li>";
                item += "<a href='" + val.url + "'>";
                item += val.title;
                item += "</a>";
                if (val.description) {
                    item += "<div class='description'>" + val.description + "</div>";
                }

                item += "</li>";
            });
            item += "</ul>";
            item += "</div>";
            items += item;
        });

        $(element).html(items).accordion({
            active: activeIndex,
            heightStyle: "content"
        }).on("accordionactivate", function (event, ui) {
            var active = $(event.currentTarget).accordion("option", "active");
            sessionStorage.setItem('activeIndex', active);
        });
    })
    .fail(function (error) {
        //no navigation
    });
};
