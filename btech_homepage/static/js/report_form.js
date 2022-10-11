$(document).ready(function(){
    let i = 0;
    $("#insert-button").click(function(){
        let str = '<li type="1"><input type="checkbox" name="statement-' + i + '"><input type="text" name="data"></li>';
        i++;
        $("#statement").append(str);
    });
});