function openRecipe(rID) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/uploadRecepieData/' + rID,
        success: function (data) {
            $('body').html(data);
            console.log(data);
        }
        
    });
}