$(function() {

    var animals = ["puppies", "kittens", "monkeys", "bunnies", "horses",
    "snakes", "lizards", "pandas", "koalas"];

    function addButtons() {

        $("#gif-btns").empty();

        for(i = 0; i < animals.length; i++){
        var newBtn = $("<button>");
        newBtn.addClass("animal-btn");
        newBtn.attr("data-type", animals[i]);
        newBtn.text(animals[i]);
        $("#gif-btns").append(newBtn);
        }
    }

    $(document).on("click", ".animal-btn", function(){

        $("#gif-area").empty();

        var tAnimal = $(this).attr("data-type");
        var apiKey = "EFhpttYIFi5HvzhiszetR1QVvDTpURaE"
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tAnimal + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            var info = response.data;
            console.log(info);

            for(i = 0; i < response.data.length; i++){

                var animalDiv = $("<div>");   
                var gifItem = $("<img>");
                gifItem.addClass("animal-img");

                var gifStill = response.data[i].images.fixed_height_still.url;
                var gifMoving = response.data[i].images.fixed_height.url;

                gifItem.css({
                    "padding" : "20px",
                    "float" : "left"
                });
                gifItem.attr({
                    "src" : gifStill,
                    "data-still" : gifStill,
                    "data-animate" : gifMoving
                });
                
                gifItem.appendTo(animalDiv);
                $("#gif-area").append(gifItem);

            }
        });
    });

    $(document).on("click", ".animal-img", function(){

        var gifState = $(this).attr("data-state");

        if(gifState === gifStill){
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
        }

    });

    $("#submit-btn").on("click", function(event){
        event.preventDefault();

        var newAnimal = $("#user-input").val().trim();

        animals.push(newAnimal);
        addButtons(newAnimal);
        $("#user-input").val("");

        // for(i = 0; i < animals.length; i++) {
        //     newAnimal = newAnimal.toLowerCase();
        //     // if(i = animals.length - 1 && newAnimal !== animals[i]){
        //     //     animals.push(newAnimal);
        //     //     addButtons(newAnimal);
        //     //     $("#user-input").empty();
        //     // }
        //     // else if(newAnimal === animals[i]){
        //     //     $("#user-input").empty();
        //     // }
        // }
        

    });

    addButtons();


});


    


