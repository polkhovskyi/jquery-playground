$.fn.createNavigationAndInit = function (element) {
    $.getJSON("./Content/navigation.json", function (data) {
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

        $(element).html(items);
        $(element).accordion({
            active: activeIndex,
            heightStyle: "content"
        });

        $(element).on("accordionactivate", function (event, ui) {
            var active = $(event.currentTarget).accordion("option", "active");
            sessionStorage.setItem('activeIndex', active);
        });
    });
};
