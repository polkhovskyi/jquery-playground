$.views.converters("date", function (val) {
    return new Date(val * 1000).toUTCString();
});
$.fn.createNews = function (options) {
    $(document).ready(function () {
        var newItem = ([
        '<div id="newsitem">',
            '<h2><a href="#">{{:title}}</a></h2>',
            '<p>{{:description}}</p>',
            '<p class="date">',
                '<span id="author">Posted by: <i>{{if user}} {{:user.name}} {{/if}}</i></span>',
                '<span>',
                    '<img src="images/more.gif" alt="" /> <a href="{{:link}}">Read more</a>',
                '</span>',
                '<span>',
                    '<img src="images/comment.gif" alt="" /> <a href="{{:href}}">Comments({{:comments}})</a>',
                '</span>',
                '<span>',
                    '<img src="images/timeicon.gif" alt="" /> {{date:submit_date}}',
                '</span>',
            '</p>',
        '</div>'
        ].join('\n'));

        var settings = $.extend({
            dataContainer: "data-container",
            paginationContainer: "pagination-container",
            pageSize: 7,
            itemTemplate: newItem
        }, options);

        var paginationContainer = ("#" + settings.paginationContainer);
        var dataContainer = ("#" + settings.dataContainer);
        var getNewsItems = function (items) {
            var result = [];
            var tmpl = $.templates(settings.itemTemplate);
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
            var pageNum = $(paginationContainer).pagination('getSelectedPageNum');
            var location = window.location.href.split("#")[1];
            $(paginationContainer).pagination(location);
        });

        var quoteRequest = $.getJSON("./Content/news.json")
           .done(function (data) {
               var items = getNewsItems(data.stories);

               $(paginationContainer).pagination({
                   dataSource: items,
                   pageSize: settings.pageSize,
                   pageNumber: getPageIndexFromHref(),
                   showPageNumbers: false,
                   showNavigator: true,
                   callback: function (data, pagination) {
                       document.location.href = document.location.href.split("#")[0] + "#" + pagination.pageNumber;
                       $(dataContainer).html(data);
                   }
               });
           })
           .fail(function (error) {
           });
    });

}