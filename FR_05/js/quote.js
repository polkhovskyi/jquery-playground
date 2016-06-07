$.fn.createQuoteAndInit = function (element) {
    function strip(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    var quoteRequest = $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
    .done(function (data) {
        var quote = strip(data[0].content) + " - " + data[0].title;
        $(element).html("<p><b>Quote of the day: </b><span class='loveluquot'>" + quote + "</span></p>");
    })
    .fail(function (error) {
        $(element).html("<p><span class='loveluquot'>Cannot get quote. Something bad happened!</span></p>");
    });
}