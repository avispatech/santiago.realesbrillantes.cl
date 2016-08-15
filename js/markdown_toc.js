var TOCRenderer = (function () {
    function TOCRenderer() {
    }
    TOCRenderer.prototype.contructor = function () {
        this.tocContainer = $('.markdown-toc');
        this.contentContainer = $('.markdown-content');
    };
    TOCRenderer.prototype.start = function () {
        this.tocContainer = $('.markdown-toc');
        this.contentContainer = $('.markdown-content');
        var titles = this.contentContainer.find("h1").toArray();
        var anchors = [];
        for (var _i = 0, titles_1 = titles; _i < titles_1.length; _i++) {
            var _title = titles_1[_i];
            var title = $(_title);
            var titleText = title.text();
            var titleId = title.attr("id");
            var anchor = $("<a>").attr("name", titleId).data("title", titleText);
            anchors.push(anchor);
            anchor.insertBefore(title);
        }
        if (anchors.length == 0) {
            return;
        }
        var listGroup = $('<div class="list-group">');
        for (var _a = 0, anchors_1 = anchors; _a < anchors_1.length; _a++) {
            var anchor = anchors_1[_a];
            var link = $("<a  class='list-group-item list-group-item-action'>").attr("href", "#" + anchor.attr("name"));
            var title = anchor.data("title").split(":")[0];
            var text = anchor.data("title").split(":")[1];
            var h5 = $("<h5 class='list-group-item-heading'>").text(title);
            var p = $("<p  class='list-group-item-text'>").text(text);
            link.append(h5).append(p);
            listGroup.append(link);
        }
        this.tocContainer.append(listGroup);
    };
    return TOCRenderer;
}());
$(function () {
    $('.sticky')['Stickyfill']();
    new TOCRenderer().start();
});
//# sourceMappingURL=markdown_toc.js.map