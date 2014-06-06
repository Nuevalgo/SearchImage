$(function(){
    var xhr;
    $('#txtComment').keyup(function(){
        if(xhr && xhr.readystate != 4){
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/v1/posts?q="+$('#txtComment').val(),
            success: function(data, textStatus, jqXHR ){
                var images = fetchImages(data);
                appendImages(images);
            },
            error: function( jqXHR, textStatus, errorThrown){
                console.log(errorThrown);
            }
        });
    });

    function fetchImages(data){
        var images = [];
        $(data).each(function(index){
            images.push(data[index].image_large_url);
        });
        return images;
    }

    function appendImages(images){
        $('#kuttimama').html('');
        $(images).each(function(index){
            var src = "http://localhost:3000/"+images[index];
            var img = $('<img style="width: 150px;height: 150px;margin-right: 10px;cursor: pointer;"/>');
            img.attr('src',src);
            img.click(function(){
                chrome.tabs.create({ url: $(this).attr('src') });
//                $(inputElement).val($(this).attr('src'));
            });
            $('#kuttimama').append(img);
        });
    }
});
