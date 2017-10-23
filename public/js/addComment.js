$('#comment-form #submit').click(function() {
    event.preventDefault();
    const postid = window.location.href.slice(window.location.href.indexOf('=') + 1);
    $.ajax({
        type: "POST",
        url: `/api/post/${postid}/comment`,
        data: {
            text: $("#comment").val()
        },
        success: function(newComment) {
            $('#comments').append(`<div class="comment"><p>${newComment.text}</p></div>`);
        }
    });
});