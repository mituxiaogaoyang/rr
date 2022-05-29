import $ from 'jquery';
var selectedElements = [];
// generate element block
function genEl(e, container) {

    var c = e.group.toLowerCase().split(' ');

    var html = $('<a class="element"></a>').addClass(c[0]);

    if (c[1] && c[1] != 'innerborder') html.addClass(c[1]);
    if (e.number == 1) html.addClass('nonmetal');
    if (e.molar) html.attr('href', 'javascript:void(0)');
    if (e.molar) {
        html.attr('id', 'el' + e.number)
            .attr('title', e.name)
            .append('<span class="id">' + e.number + '</span>')
            .append('<span class="symbol">' + e.small + '</span>')
            // .append('<span class="mass">' + parseFloat(e.molar).toFixed(3) + '</span>');
    } else {
        html.attr('id', 'el' + e.small)
            .append('<span class="id">' + e.small + '</span>');
    }

    container.append(html);
}

// add clearfix
function clearfix(container) {
    container.append('<div class="clearfix"></div>');
}


// get JSON data
export function deal(data) {
    console.log($('#table'));

    // build main table
    for (var i = 0; i < data.table.length; i++) {
        for (var j = 0; j < data.table[i].elements.length; j++) {
            genEl(data.table[i].elements[j], $('#table'));
        }
        clearfix($('#table'));
    }

    // build lanthanoids table
    for (var i = 0; i < data.lanthanoids.length; i++) {
        genEl(data.lanthanoids[i], $('#table-lanthanoids'));
    }
    clearfix($('#table-lanthanoids'));

    // build actinoids table
    for (var i = 0; i < data.actinoids.length; i++) {
        genEl(data.actinoids[i], $('#table-actinoids'));
    }
    clearfix($('#table-actinoids'));
};

// $('body').on('click', '.element', function(e) {
//     var _this = $(this);
//     var wordsBox = $("#selected"), words;
//     var element = _this.children('.symbol').text();
//     if(_this.hasClass('selected')){
//         for(var i= 0,len= selectedElements.length;i<len;i++){
//             if(selectedElements[i] === element){
//                 selectedElements.splice(i,1);
//                 _this.removeClass('selected');
//                 words = selectedElements.join('-');
//                 wordsBox.text(words);
//             }
//         }
        
//     }else{
        
//         _this.addClass('selected');
//         selectedElements.push(element);
//         words = selectedElements.join('-');
//         wordsBox.text(words);
//     }
    
// });
export function select(_this,selectedElements){
    console.log(_this,selectedElements)
    var wordsBox = $("#selected"), words;
    var element = _this.children('.symbol').text();
    if(_this.hasClass('selected')){
        for(var i= 0,len= selectedElements.length;i<len;i++){
            if(selectedElements[i] === element){
                selectedElements.splice(i,1);
                _this.removeClass('selected');
                words = selectedElements.join('-');
                wordsBox.text(words);
            }
        }
        
    }else{
        
        _this.addClass('selected');
        selectedElements.push(element);
        words = selectedElements.join('-');
        wordsBox.text(words);
    }
}
export function removeSelectedClass(){
    $(".selected").removeClass('selected');
}
