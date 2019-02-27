$.ajax({
    url: '/files',
    dataType: 'json',
    jsonpCallback: 'MyJSONPCallback', // specify the callback name if you're hard-coding it
    success: function(data){
        console.log(data);
    }
});

