$.fn.createQuoteAndInit = function (element) {
    function strip(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    var errorText = "<p><span class='loveluquot'>Cannot get quote. Something bad happened!</span></p>";
    var jqelement = $(element);
    var quoteRequest = $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
    .done(function (data) {
        if (data != undefined && data.length > 0) {
            var quote = strip(data[0].content) + " - " + data[0].title;
            jqelement.html("<p><b>Quote of the day: </b><span class='loveluquot'>" + quote + "</span></p>");
        } else {
            jqelement.html(errorText);
        }
    })
    .fail(function (error) {
        jqelement.html(errorText);
    });
}