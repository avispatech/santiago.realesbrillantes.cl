///<reference path="jquery.d.ts" />

class TOCRenderer {
  tocContainer: JQuery;
  contentContainer: JQuery;
  titles: JQuery;

  contructor(){
    this.tocContainer = $('.markdown-toc');
    this.contentContainer = $('.markdown-content');
  }

  start(){
    this.tocContainer = $('.markdown-toc');
    this.contentContainer = $('.markdown-content');
    let titles = this.contentContainer.find("h1").toArray();
    let anchors:any[] = [];
    for(let _title of titles){
      let title = $(_title);
      let titleText = title.text();
      let titleId   = title.attr("id");
      let anchor = $("<a>").attr("name", titleId).data("title", titleText);
      anchors.push(anchor);
      anchor.insertBefore(title);
    }
    if(anchors.length == 0){ return; }
    let listGroup = $('<div class="list-group">');
    
    for(let anchor of anchors){
      let link = $("<a  class='list-group-item list-group-item-action'>").attr("href", "#" + anchor.attr("name"));
      let title = anchor.data("title").split(":")[0];
      let text  = anchor.data("title").split(":")[1];
      let h5   = $("<h5 class='list-group-item-heading'>").text(title);
      let p    = $("<p  class='list-group-item-text'>").text(text);
      link.append(h5).append(p);
      listGroup.append(link);
    }

    this.tocContainer.append(listGroup);
   
  }
}


$(function(){
  $('.sticky')['Stickyfill']();
  new TOCRenderer().start()

})

