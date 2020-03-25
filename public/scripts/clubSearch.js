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
                                    $('<div/>', {'class': 'card-footer bg-primary text-white text-center'}).append(
                                        $('<a/>', {href: "/club/"+club._id, text: 'View Club', class: 'text-white h5 text-decoration-none stretched-link'})
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

// clubName: String,
// homeGround: String,
// stadiumCapacity: Number,
// logo: String,
// primaryColor: String,
// secondaryColor: String,
// email: String,
// phoneNumber: String,
// contactName: String,
// officeAddress: String