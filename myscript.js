$(function(){
    var xhr;
    $('body').append('<div id="kuttimama" style="position: absolute;top: 150px;left: 100px;width: 80%;border: 1px solid black;"><img src="#"/></div>');
    var inputElement;
    $('textarea[name="add_comment_text_text"]').keyup(function(){
        console.log('clicked');
        inputElement = this;
        if(xhr && xhr.readystate != 4){
            xhr.abort();
        }
        xhr = $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/v1/posts?q="+$(this).val(),
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
            var img = $('<img style="width: 200px;height: 200px;margin-right: 10px;cursor: pointer;"/>');
            img.attr('src',src);
            img.click(function(){
                $(inputElement).val($(this).attr('src'));
            });
            $('#kuttimama').append(img);

        });
    }

});
