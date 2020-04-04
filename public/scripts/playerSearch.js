$(document).ready(function(){
    $("#player_search").on('keyup', function(e){
        let txt = $(this).val();

        $.ajax({
            url: "/user/player/search",
            type: "POST",
            data: {search: txt},
            dataType: "text",
            success: (data) => {
                $("#playersResult").html(" ")
                if(txt == ""){
                    $("#playersResult").append(
                        $('<p/>', {class: 'h4 text-secondary mx-auto', text: 'No Results'})
                    )
                } else if(JSON.parse(data).length == 0){
                    $("#playersResult").append(
                        $('<p/>', {class: 'h4 text-secondary mx-auto', text: 'No Results'})
                    )
                } else {
                    // loadSkeleton();
                    // setTimeout(buildPlayerCard(data), 4000);
                    buildPlayerCard(data);
                }
            }
        });
    })
})

function loadSkeleton() {
    $("#playersResult").append(
        $('<div/>', {class: 'col-sm-12 col-md-4'}).append(
            $('<div/>', {class: 'card mt-4', 'style': 'width: 100%;'}).append(
                $('<div/>', {class: 'card-header  bg-primary'}).append()  
            ).append(
                $('<div/>', {'class': 'card-body'}).append()
            ).append(
                $('<div/>', {'class': 'card-footer bg-danger text-white text-center'}).append()
            )
        )
    )
}

function buildPlayerCard(data){
    $("#playersResult").html(" ");
    JSON.parse(data).forEach(function(player){
        // Build Cards with player name
        $("#playersResult").append(
            $('<div/>', {class: 'col-sm-12 col-md-4'}).append(
                $('<div/>', {class: 'card mt-4', 'style': 'width: 100%;'}).append(
                    $('<div/>', {class: 'card-header'}).append(
                        $('<span/>', {class: 'h5', text: player.firstName+" "+player.lastName})
                    ).append(
                        // h5.text-primary #{player.jerseyNumber}
                        $('<span/>', {class: 'h5 float-right', text: player.jerseyNumber})           
                    )
                ).append(
                    $('<div/>', {'class': 'card-body'}).append(
                        $('<div/>', {class: 'row'}).append(
                            $('<div/>', {class: 'col-sm-12 text-center'}).append(
                                $('<img/>', {height: '200px', src: player.photo, class:"images"})
                            )
                        )
                    )
                ).append(
                    $('<div/>', {'class': 'card-footer bg-primary text-white text-center'}).append(
                        $('<a/>', {href: "/player/"+player._id, text: 'View Profile', class: 'text-white h5 text-decoration-none stretched-link'})
                    )
                )
            )
        );
    })
}