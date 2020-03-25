$(document).ready(function(){
    $("#club_search").on('keyup', function(e){
        let txt = $(this).val();

        $.ajax({
            url: "/user/club/search",
            type: "POST",
            data: {search: txt},
            dataType: "text",
            success: (data) => {
                
                $("#clubsResult").html(" ")
                if(txt == ""){
                    $("#clubsResult").append(
                        $('<p/>', {class: 'h4 text-secondary mx-auto', text: 'No Results'})
                    )
                } else if(JSON.parse(data).length == 0){
                    $("#clubsResult").append(
                        $('<p/>', {class: 'h4 text-secondary mx-auto', text: 'No Results'})
                    )
                } else {
                    JSON.parse(data).forEach(function(club){
                        // Build Cards with player name
                        $("#clubsResult").append(
                            $('<div/>', {class: 'col-sm-12 col-md-4'}).append(
                                $('<div/>', {class: 'card mt-4 ', 'style': 'width: 100%;'}).append(
                                    $('<div/>', {class: 'card-header'}).append(
                                        $('<span/>', {class: 'h5', text: club.clubName})
                                    )
                                ).append(
                                    $('<div/>', {'class': 'card-body'}).append(
                                        $('<div/>', {class: 'row'}).append(
                                            $('<div/>', {class: 'col-sm-12 text-center'}).append(
                                                $('<img/>', {width: 'auto', height: '100px', src: club.logo})
                                            )
                                        )
                                    )
                                ).append(
                                    $('<div/>', {'class': 'card-footer bg-warning text-white text-center'}).append(
                                        $('<a/>', {href: "/dashboard/clubs/edit/"+club._id, text: 'Edit Club', class: 'text-white h5 text-decoration-none stretched-link'})
                                    )
                                )
                            )
                        );
                    })
                }
            }
        });
    })
})