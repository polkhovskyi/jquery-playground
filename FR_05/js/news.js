$.views.converters("date", function (val) {
    return new Date(val * 1000).toUTCString();
});
$.fn.createNews = function (options) {
    $(document).ready(function () {       
        var settings = $.extend({
            dataContainer: "data-container",
            paginationContainer: "pagination-container",
            pageSize: 7,
            itemTemplate:"newsitem"
        }, options);

        var paginationContainer = $("#" + settings.paginationContainer);
        var dataContainer = $("#" + settings.dataContainer);
        var getNewsItems = function (items) {
            var result = [];
            
            var tmpl = $("#" + settings.itemTemplate);
            $.each(items, function (key, val) {
                result.push(tmpl.render(val));
            });

            return result;
        }

        var getPageIndexFromHref = function () {
            var result = 1;
            var hrefArray = document.location.href.split("#");
            if (hrefArray.length > 1 && hrefArray[1].length > 0) {
                result = parseInt(hrefArray[1]);
            }

            return result;
        }

        $(window).bind('hashchange', function () {
            var pageNum = paginationContainer.pagination('getSelectedPageNum');
            var location = window.location.href.split("#")[1];
            paginationContainer.pagination(location);
        });

        var quoteRequest = $.getJSON("./Content/news.json")
           .done(function (data) {
               if (!data || !data.stories || data.stories.length == 0) {
                   return;
               }

               var items = getNewsItems(data.stories);

               paginationContainer.pagination({
                   dataSource: items,
                   pageSize: settings.pageSize,
                   pageNumber: getPageIndexFromHref(),
                   showPageNumbers: false,
                   showNavigator: true,
                   callback: function (data, pagination) {
                       document.location.href = document.location.href.split("#")[0] + "#" + pagination.pageNumber;
                       dataContainer.html(data);
                   }
               });
           })
           .fail(function (error) {
           });
    });

}