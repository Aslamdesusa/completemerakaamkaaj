// Adding Country ======================================
// Edit Country by Admin
$(document).ready(function(){
	$('table').on('click', '.getcountryDetails', function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/country-by-id?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-Country').val(json.Country);

            },
            error : function(err){
                alert(err);
            }  
        });
        $('.countryEdit').on('click', function(){
        	var contectInformation = {}
        	var country = $('input#recipient-Country').val();

            contectInformation.Country = country
            $.ajax({
            	url : "/edit/country?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditCountry').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit State by Admin
$(document).ready(function(){
	$('table').on('click', '.countryGet', function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/state-by-id?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-State').val(json.State);
                $('input#recipient-Country-state').val(json.Country);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.EditState').on('click', function(){
        	var contectInformation = {}
        	var state = $('input#recipient-State').val();
        	var country = $('input#recipient-Country-state').val();

            contectInformation.State = state
            contectInformation.Country = country
            $.ajax({
            	url : "/edit/state?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		
            		$('#ModalEditState').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit City By Admin
$(document).ready(function(){
	$('table').on('click', '.getcityDetails', function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/city-by-id?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-City').val(json.City);
                $('input#recipient-city-State').val(json.State);
                $('input#recipient-city-Country').val(json.Country);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.EditCity').on('click', function(){
        	var contectInformation = {}
        	var city = $('input#recipient-City').val();
        	var state = $('input#recipient-city-State').val();
        	var country = $('input#recipient-city-Country').val();

            contectInformation.City = city
            contectInformation.State = state
            contectInformation.Country = country
            $.ajax({
            	url : "/edit/city?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		
            		$('#ModalEditCity').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit category By Admin
$(document).ready(function(){
	$('table').on('click', '.getcategoryinfo', function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/category-by-id?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-JobCat').val(json.JobCategory);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.EditJobCat').on('click', function(){
        	var contectInformation = {}
        	var category = $('input#recipient-JobCat').val();

            contectInformation.JobCategory = category
            $.ajax({
            	url : "/edit/category?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		
            		$('#ModalEditCategory').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit Service CAt
$(document).ready(function(){
	$('table').on('click', '.getSerCatDet', function(){
    // $('.getSerCatDet').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/service-category-by-id?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-SerCat').val(json.Service);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.EditSerCat').on('click', function(){
        	var contectInformation = {}
        	var service = $('input#recipient-SerCat').val();

            contectInformation.Service = service
            $.ajax({
            	url : "/edit/services?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		
            		$('#ModalEditSerCat').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});


// Ragister Users Posted Resume users
$(document).ready(function(){
	
	$('#nextbtnRagisterdUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#previousBtnUser').val()
    	count++

    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/resumes/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextbtnRagisterdUser').val(count);
	      		$('#previousBtnUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});
// Ragister Users Posted Resume users PreBTN
$(document).ready(function(){
	
	$('#previousBtnUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#nextbtnRagisterdUser').val()
    	count--

    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/resumes/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextbtnRagisterdUser').val(count);
	      		$('#previousBtnUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});
// Ragister Users Posted Resume users GO page
$(document).ready(function(){
	
	$('#gobtnforUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#gonumberpage').val()
    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/resumes/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextbtnRagisterdUser').val(count);
	      		$('#previousBtnUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

// Service Provider User
$(document).ready(function(){
	
	$('#nextbtnSerProUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#previousBtnSerUser').val()
    	count++

    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/service/provider/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gobtnforSerUser').val(count);
	      		$('#nextbtnSerProUser').val(count);
	      		$('#previousBtnSerUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});
// Ragister Users Posted Resume users PreBTN
$(document).ready(function(){
	
	$('#previousBtnSerUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#nextbtnSerProUser').val()
    	count--

    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/service/provider/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gobtnforSerUser').val(count);
	      		$('#nextbtnSerProUser').val(count);
	      		$('#previousBtnSerUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});
// Ragister Users Posted Resume users GO page
$(document).ready(function(){
	
	$('#gobtnforSerUser').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#gonumberpage').val()
    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/service/provider/user/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		console.log(data)
	      		$('#UpdateTableUser').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gobtnforSerUser').val(count);
	      		$('#nextbtnSerProUser').val(count);
	      		$('#previousBtnSerUser').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Name">'+data[i].firstname+'</td><td data-label="Email">'+data[i].emailid+'</td><td data-label="Password">'+data[i].password+'</td><td data-label="Mobile">'+data[i].mobile+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item" data-toggle="modal" data-target="#ModalEdit" href="#">Edit</a><a class="dropdown-item GettingRegiU" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalViewForUserData" href="#">View</a><a class="dropdown-item delteRagisteruser" id="'+data[i]._id+'" value="'+data[i]._id+'" title="'+data[i].firstname+'" data-toggle="modal" data-target="#ModalDelete" href="#"><button>Delete</button></a></div></div></td></tr>'
	      		$('#UpdateTableUser').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});


// nextBtn
$(document).ready(function(){
	
	$('#nextBtn').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#previousBtn').val()
    	count++

    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/resume/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateTable').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextBtn').val(count);
	      		$('#previousBtn').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Worker ID">'+data[i].pwid+'</td><td data-label="Name">'+data[i].Name+'</td><td data-label="Mobile">'+data[i].Mobile+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditConInfoButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Contact Information</a></li><li><a class="dropdown-item EditAboutButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditAbout" href="#">About</a></li><li><a class="dropdown-item EditEduButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditEducInfo" href="#">Education Details</a></li><li><a class="dropdown-item otherdet" data-toggle="modal" data-target="#ModalEditOtherInfo" title="'+data[i]._id+'" href="#">Other Details</a></li><li><a class="dropdown-item currentworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditcurrentInfo" href="#">current Work Details</a></li><li><a class="dropdown-item pastworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditPastDetails" href="#">past work Details</a></li></ul></li><a class="dropdown-item changeStatusResume" data-toggle="modal" title="'+data[i]._id+'" value="'+data[i].verifi+'" data-target="#ModalActivateResume" href="#">'+data[i].verifi+'</a><a class="dropdown-item gettinguserdata" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item DeleteResumeMOdal" title="'+data[i].Name+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div> </td></tr>'
	      		$('#updateTable').append(HTML);
	      		// $.getScript("/js/pagination.js");
	      		$.getScript("/js/pagination.js").done(function(script, textStatus) {
				    console.log("finished loading and running pagination.js. with a status of" + textStatus);
				});
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

$(document).ready(function(){
	$('#previousBtn').on('click', function() {
		var count = $('#nextBtn').val()
		count--

		var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9
    	$.ajax({
    		url : "/posted/resume/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateTable').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextBtn').val(count);
	      		$('#previousBtn').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Worker ID">'+data[i].pwid+'</td><td data-label="Name">'+data[i].Name+'</td><td data-label="Mobile">'+data[i].Mobile+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditConInfoButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Contact Information</a></li><li><a class="dropdown-item EditAboutButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditAbout" href="#">About</a></li><li><a class="dropdown-item EditEduButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditEducInfo" href="#">Education Details</a></li><li><a class="dropdown-item otherdet" data-toggle="modal" data-target="#ModalEditOtherInfo" title="'+data[i]._id+'" href="#">Other Details</a></li><li><a class="dropdown-item currentworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditcurrentInfo" href="#">current Work Details</a></li><li><a class="dropdown-item pastworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditPastDetails" href="#">past work Details</a></li></ul></li><a class="dropdown-item changeStatusResume" data-toggle="modal" title="'+data[i]._id+'" value="'+data[i].verifi+'" data-target="#ModalActivateResume" href="#">'+data[i].verifi+'</a><a class="dropdown-item gettinguserdata" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item DeleteResumeMOdal" title="'+data[i].Name+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div> </td></tr>'
	      		$('#updateTable').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

$(document).ready(function(){
	
	$('#gobtn').on('click', function() {
	// $('#nextBtn').click(function(){
    	var count = $('#gonumberpage').val()
    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9
    	$.ajax({
    		url : "/posted/resume/json?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateTable').empty();
	      		$('#counter').empty();
	      		$('#counter').append(count);
	      		$('#gonumberpage').val(count);
	      		$('#nextBtn').val(count);
	      		$('#previousBtn').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr id="'+data[i]._id+'"><td data-label="Worker ID">'+data[i].pwid+'</td><td data-label="Name">'+data[i].Name+'</td><td data-label="Mobile">'+data[i].Mobile+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditConInfoButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Contact Information</a></li><li><a class="dropdown-item EditAboutButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditAbout" href="#">About</a></li><li><a class="dropdown-item EditEduButton" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditEducInfo" href="#">Education Details</a></li><li><a class="dropdown-item otherdet" data-toggle="modal" data-target="#ModalEditOtherInfo" title="'+data[i]._id+'" href="#">Other Details</a></li><li><a class="dropdown-item currentworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditcurrentInfo" href="#">current Work Details</a></li><li><a class="dropdown-item pastworkinfoedit" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditPastDetails" href="#">past work Details</a></li></ul></li><a class="dropdown-item changeStatusResume" data-toggle="modal" title="'+data[i]._id+'" value="'+data[i].verifi+'" data-target="#ModalActivateResume" href="#">'+data[i].verifi+'</a><a class="dropdown-item gettinguserdata" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item DeleteResumeMOdal" title="'+data[i].Name+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div> </td></tr>'
	      		$('#updateTable').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

$(document).ready(function(){
	
	$('#nextService').on('click', function() {
    	var count = $('#previousService').val()
    	count++
    	var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9
    	$.ajax({
    		url : "/posted/service/josn?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateService').empty();
	      		$('#counterSer').empty();
	      		$('#counterSer').append(count);
	      		$('#gonumberpageser').val(count);
	      		$('#nextService').val(count);
	      		$('#previousService').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);


	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr><td data-label="Service ID">'+data[i].serviceid+'</td><td data-label="Agency Name">'+data[i].Agency+'</td><td data-label="Mobile">'+data[i].MobileNumber+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditServiceDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Service Details</a></li><li><a class="dropdown-item EditProviderDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditProInfo" href="#">Provider Details</a></li></ul></li><a class="dropdown-item changeStatusService" value="'+data[i].verifi+'" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalActivate" href="#">'+data[i].verifi+'</a><a class="dropdown-item getallService" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item deleteserbtn" title="'+data[i].Agency+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div></td></tr>'
	      		$('#updateService').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

$(document).ready(function(){
	$('#previousService').on('click', function() {
		var count = $('#nextService').val()
		count--

		var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/service/josn?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateService').empty();
	      		$('#counterSer').empty();
	      		$('#counterSer').append(count);
	      		$('#gonumberpageser').val(count);
	      		$('#nextService').val(count);
	      		$('#previousService').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr><td data-label="Service ID">'+data[i].serviceid+'</td><td data-label="Agency Name">'+data[i].Agency+'</td><td data-label="Mobile">'+data[i].MobileNumber+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditServiceDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Service Details</a></li><li><a class="dropdown-item EditProviderDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditProInfo" href="#">Provider Details</a></li></ul></li><a class="dropdown-item changeStatusService" value="'+data[i].verifi+'" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalActivate" href="#">'+data[i].verifi+'</a><a class="dropdown-item getallService" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item deleteserbtn" title="'+data[i].Agency+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div></td></tr>'
	      		$('#updateService').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});
$(document).ready(function(){
	$('#gobtnSer').on('click', function() {
		var count = $(	'#gonumberpageser').val()

		var num = 10;
    	var num1 = 11;
    	var chacha = num*count
    	var _num = chacha-9

    	$.ajax({
    		url : "/posted/service/josn?count="+count,
	      	type : "GET",
	      	dataType: 'json',
	      	success : function(data){
	      		$('#updateService').empty();
	      		$('#counterSer').empty();
	      		$('#counterSer').append(count);
	      		$('#gonumberpageser').val(count);
	      		$('#nextService').val(count);
	      		$('#previousService').val(count);

	      		$('#chachavaid').empty();
	      		$('#chachavaid').append(_num);

	      		$('#chachivaid').empty();
	      		$('#chachivaid').append(chacha);

	      		var HTML = '';
	      		for (var i = 0; i < data.length; i += 1) {
	      			HTML = '<tr><td data-label="Service ID">'+data[i].serviceid+'</td><td data-label="Agency Name">'+data[i].Agency+'</td><td data-label="Mobile">'+data[i].MobileNumber+'</td><td data-label="Post Date">'+data[i].date+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle" href="#">Edit</a><ul class="dropdown-menu"><li><a class="dropdown-item EditServiceDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEdit" href="#">Service Details</a></li><li><a class="dropdown-item EditProviderDetails" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalEditProInfo" href="#">Provider Details</a></li></ul></li><a class="dropdown-item changeStatusService" value="'+data[i].verifi+'" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalActivate" href="#">'+data[i].verifi+'</a><a class="dropdown-item getallService" title="'+data[i]._id+'" data-toggle="modal" data-target="#ModalView" href="#">View</a><a class="dropdown-item deleteserbtn" title="'+data[i].Agency+'" value="'+data[i]._id+'" data-toggle="modal" data-target="#ModalDelete" href="#">Delete</a></div></div></td></tr>'
	      		$('#updateService').append(HTML);
             } 
	      },
	      error: function(err){
	      	alert(err)
	      }
	    });
    })
});

$(document).ready(function(){
	$('#addCountrySubmit').click(function(){
		var CountryModal = {};
		var Country = $('#CountryModal').val();
		if (Country == '') {
			alert("Country shouldn't be empty" )
			return false
		}
		CountryModal.Country = Country
		$.ajax({
			url : "/add/country",
			type : "POST",
			data : CountryModal,
			success : function(json){
                $('.CountryModal').val('');
				console.log(json)
				var HTML = '<tr id="'+json.country._id+'"><td data-label="ID">'+json.country._id+'</td><td data-label="Country Name">'+json.country.Country+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item getcountryDetails" title="'+json.country._id+'" data-toggle="modal" data-target="#ModalEditCountry" href="#">EDIT</a><a class="dropdown-item addcitydeltebutton" value="'+json.country._id+'" title="'+json.country.Country+'" data-toggle="modal" data-target="#ModalDeleteData"  href="#"><button>Delete</button></a></div></div> </td></tr>'
				$('#addcitytable').append(HTML);
				alert('A New Country '+json.country.Country+' Added successfully')
			},
			error : function(err){
				alert(err);
			}  
		});
		 
	})
});

$(document).ready(function(){
	$('.DeleteJobsBtn').click(function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");

		$('#jobName').empty();
		$('#jobName').append(title);
	$('.deletedsuccess').click(function(){
		$.ajax({
			url : "/delete/user/job?_id="+val,
			type : "DELETE",
			success : function(json){
				location.reload()
			},
			error : function(err){
				alert(err);
			}  
		});
	})
		 
	})
});

$(document).ready(function(){
	$('table').on('click', '.DeleteResumeMOdal', function(e){
	// $('.DeleteResumeMOdal').click(function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");
		var trid = $(this).closest('tr').attr('id');

		$('#jobName').empty();
		$('#jobName').append(title);
	$('.deletedsuccess').on('click', function(){
		$.ajax({
			url : "/delete/user/job?_id="+val,
			type : "DELETE",
			success : function(json){
				$('#'+trid).remove();
				$('#ModalDelete').modal('hide');
			},
			error : function(err){
				alert(err);
			}  
		});
	})
		 
	})
});

$(document).ready(function(){
 	$('table').on('click', '.deleteserbtn', function(){
	// $('.deleteserbtn').click(function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");
        var trid = $(this).closest('tr').attr('id');

		$('#jobName').empty();
		$('#jobName').append(title);
 	$('.deletedsuccess').on('click', function(){
	// $('.deletedsuccess').click(function(){
		$.ajax({
			url : "/delete/user/Service?_id="+val,
			type : "DELETE",
			success : function(json){
				location.reload()
			},
			error : function(err){
				alert(err);
			}  
		});
	})
		 
	})
});


$(document).ready(function(){
    $('table').on('click', '.addcitydeltebutton', function(){
    // $('.deleteserbtn').click(function(){
        var val = $(this).attr("value");
        var title = $(this).attr("title");
        var trid = $(this).closest('tr').attr('id');
        
        $('#jobName').empty();
        $('#jobName').append(title);
        $('.deletedsuccess').on('click', function(){
        // $('.deletedsuccess').click(function(){
            $.ajax({
                url : "/delete/country/"+val,
                type : "DELETE",
                success : function(json){
                    $('#ModalDeleteData').modal('hide');
                    $('#'+trid).remove();

                },
                error : function(err){
                    alert(err);
                }  
            });
        })
         
    })
});

// $(document).ready(function(){
// 	$('table').on('click','#addcitydeltebutton' ,function(e){
// 		$(this).closest('tr').remove()
// 		e.preventDefault();
// 		var dataId = $(this).attr("data-id");
// 		$.ajax({
// 			url : "/delete/country/"+dataId,
// 			type : "DELETE",
// 			success : function(result){
// 				alert('entry Deleted success');
// 			},
// 			error : function(err){
// 				alert(err);
// 			}  
// 		});
		
// 	});
// });


// ====================================================================
// Delete Data Ragister User
$(document).ready(function(){
	// $('.delteRagisteruser').click(function(){
  	$('table').on('click', '.delteRagisteruser', function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");
		var trid = $(this).closest('tr').attr('id');

		$('#jobName').empty();
		$('#jobName').append(title);
	// $('.deletedsucces){
  	$('.deletedsuccess').on('click', function(){
		$.ajax({
			url : "/delete/registered/user?_id="+val,
			type : "DELETE",
			success : function(json){
				$('#'+trid).remove(); 
				$('#ModalDelete').modal('hide');
				alert(json)
			},
			error : function(err){
				alert(err);
			}  
		});
	})
		 
	})
});


// Adding state ====================================


$(document).ready(function(){
	$('#addStateSubmit').click(function(){
		var StateModal = {};
		var Country = $('#StateCountry').val();
		var State = $('#StateNameCountry').val();
		if (Country == '') {
			alert("Country shouldn't be empty" )
			return false
		}
		if (State == '') {
			alert("State shouldn't be empty" )
			return false
		}
		StateModal.Country = Country
		StateModal.State = State
		$.ajax({
			url : "/add/state",
			type : "POST",
			data : StateModal,
			success : function(json){
				console.log(json)
                $('.CountryModal').val('');
				var HTML = '<tr id="'+json.state._id+'"><td data-label="ID">'+json.state._id+'</td><td data-label="State Name">'+json.state.State+'</td><td data-label="Country Name">'+json.state.Country+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item countryGet" title="'+json.state._id+'" data-toggle="modal" data-target="#ModalEditState" href="#">EDIT</a><a class="dropdown-item" data-id="'+json.state._id+'" id="addStateDelButton" href="#"><button>Delete</button></a></div></div></td></tr>'
				$('#addstatebody').append(HTML);
				alert('A New State '+json.state.State+' Added successfully')
			},
			error : function(err){
				alert(err);
			}  
		});
		 
	})
});

$(document).ready(function(){
    $('table').on('click', '.addStateDelButton', function(){
    // $('.deleteserbtn').click(function(){
        var val = $(this).attr("value");
        var title = $(this).attr("title");
        var trid = $(this).closest('tr').attr('id');
        
        $('#jobName').empty();
        $('#jobName').append(title);
        $('.deletedsuccess').on('click', function(){
        // $('.deletedsuccess').click(function(){
            $.ajax({
                url : "/delete/state/"+val,
                type : "DELETE",
                success : function(json){
                    $('#ModalDeleteData').modal('hide');
                    $('#'+trid).remove();

                },
                error : function(err){
                    alert(err);
                }  
            });
        })
         
    })
});


// Adding City =================================================

$(document).ready(function(){
	$('#addcitysubmit').click(function(){
		var CityModal = {};
		var Country = $('#CountryCity').val();
		var State = $('#StateCity').val();
		var City = $('#CityCity').val();
		if (Country == '') {
			alert("Country shouldn't be empty" )
			return false
		}
		if (State == '') {
			alert("State shouldn't be empty" )
			return false
		}
		if (City == '') {
			alert("City shouldn't be empty" )
			return false
		}
		CityModal.Country = Country
		CityModal.State = State
		CityModal.City = City
		$.ajax({
			url : "/add/city",
			type : "POST",
			data : CityModal,
			success : function(json){
				console.log(json)
                $('.CountryModal').val('');
				var HTML = '<tr id="'+json.city._id+'"><td data-label="ID">'+json.city._id+'</td><td data-label="City Name">'+json.city.City+'</td><td data-label="State Name">'+json.city.State+'</td><td data-label="Country Name">'+json.city.Country+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item getcityDetails" title="'+json.city._id+'" data-toggle="modal" data-target="#ModalEditCity" href="#">EDIT</a><a class="dropdown-item DeleteCityButton" value="'+json.city._id+'" title="'+json.city.City+'" data-toggle="modal" data-target="#ModalDeleteData" href="#"><button>Delete</button></a></div></div></td></tr>'
				$('#addCityBody').append(HTML);
				alert('A New City '+json.city.City+' Added Successfully')
			},
			error : function(err){
				alert(err);
			}  
		});
		 
	})
});

$(document).ready(function(){
    $('table').on('click', '.DeleteCityButton', function(){
    // $('.deleteserbtn').click(function(){
        var val = $(this).attr("value");
        var title = $(this).attr("title");
        var trid = $(this).closest('tr').attr('id');
        
        $('#jobName').empty();
        $('#jobName').append(title);
        $('.deletedsuccess').on('click', function(){
        // $('.deletedsuccess').click(function(){
            $.ajax({
                url : "/delete/city/"+val,
                type : "DELETE",
                success : function(json){
                    $('#ModalDeleteData').modal('hide');
                    $('#'+trid).remove();

                },
                error : function(err){
                    alert(err);
                }  
            });
        })
         
    })
});


// Active Jobs

$(document).ready(function(){
	$('.changeStatusJob').click(function(){
		var ID = $(this).attr("title")
		var valueActive = $(this).attr("value")

		var somehtml = 'If you will active/in-active this service then then it will display/un-display for every one.'
		$('#JobsDisplayActive').empty();
		$('#JobsDisplayActive').append(somehtml)
	$('.dataactivateJobs').click(function(){
		$.ajax({
				url : "/job/change/status/to/verify/unverify?_id="+ID,
				type : "GET",
				success : function(success){
					if (valueActive == "Active") {
						$('.changeStatusJob').empty()
						$('.changeStatusJob').append('In Active')
						alert(success.message)
						return false
					}
					if (valueActive == "In active") {
						$('.changeStatusJob').empty()
						$('.changeStatusJob').append('Active')
						alert(success.message)
						return false
					}
					// $('#example2').DataTable().ajax.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		})
	})
			
});

// Active and in Active data using ajax it will change the addStateSubmit

 $(document).ready(function(){
 	$('table').on('click', '.changeStatusService', function(){
		var ID = $(this).attr("title")
		var valueActive = $(this).html()

		var somehtml = 'If you will active/in-active this service then then it will display/un-display for every one.'
		$('#ServiceDisplayActive').empty();
		$('#ServiceDisplayActive').append(somehtml)
 	$('.dataactivate').on('click', function(){
		$.ajax({
				url : "/change/status/to/verify/unverify?_id="+ID,
				type : "GET",
				success : function(success){
					if (valueActive == "Active") {
						$('.changeStatusService').empty()
						$('.changeStatusService').append('In Active')
						return false
					}
					if (valueActive == "In Active") {
						$('.changeStatusService').empty()
						$('.changeStatusService').append('Active')
						return false
					}
					alert(success.message)
					// $('#example2').DataTable().ajax.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		})
	})
			
});
// Resume verified
 $(document).ready(function(){
 	$('table').on('click', '.changeStatusResume', function(){
 	// $('.changeStatusResume').on('click', function() {
		var ID = $(this).attr("title")
		var valueActive = $(this).attr("value")

		var somehtml = 'If you will active/in-active this service then then it will display/un-display for every one.'
		$('#ResumeDisplayActive').empty();
		$('#ResumeDisplayActive').append(somehtml)
 	$('.Resumedataactivate').on('click', function() {	
	// $('.Resumedataactivate').click(function(){
		$.ajax({
				url : "/resume/change/status/to/verify/unverify?_id="+ID,
				type : "GET",
				success : function(success){
					if (valueActive == "Active") {
						$('.changeStatusService').empty()
						$('.changeStatusService').append('In Active')
						$('#ModalActivateResume').modal('hide');
						console.log(success.message)
						return false
					}
					if (valueActive == "In active") {
						$('.changeStatusService').empty()
						$('.changeStatusService').append('Active')
						$('#ModalActivateResume').modal('hide');
						console.log(success.message)
						return false
					}
					// $('#example2').DataTable().ajax.reload();
				},
				error : function(err){
					alert(err);
				}  
			});	
		})
	})
			
});

// Adding JobCategory ==================================================

$(document).on("click", "#SubmitCatagory", function(){
	var logoImg = $('input[name="logoImg"]').get(0).files[0];
	var JobCategory = $('#JobCategory').val();
	var formData = new FormData();
	formData.append('image', logoImg);
	formData.append('JobCategory', JobCategory);
	console.log(formData)
	
	$.ajax({
	  type: "POST",
	  url: '/add/job/category',
	  data: formData,
	  contentType: false,
	  processData: false,
	  cache: false,
	  success: function(json) {
	  	console.log(json)
        $('.CountryModal').val('');
        var HTML = '<tr id="'+json.data._id+'"><td data-label="ID">'+json.data._id+'</td><td data-label="Job Category Name">'+json.data.JobCategory+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item getcityDetails" title="'+json.data._id+'" data-toggle="modal" data-target="#ModalEditCity" href="#">EDIT</a><a class="dropdown-item DeleteCat" value="'+json.data._id+'" title="'+json.data.JobCategory+'" data-toggle="modal" data-target="#ModalDeleteData" href="#"><button>Delete</button></a></div></div></td></tr>'
            $('#JobCategorying').append(HTML)
	  	alert(json.message)
	  }
	});
})

$(document).ready(function(){
    $('table').on('click', '.DeleteCat', function(){
    // $('.deleteserbtn').click(function(){
        var val = $(this).attr("value");
        var title = $(this).attr("title");
        var trid = $(this).closest('tr').attr('id');
        
        $('#jobName').empty();
        $('#jobName').append(title);
        $('.deletedsuccess').on('click', function(){
        // $('.deletedsuccess').click(function(){
            $.ajax({
                url : "/delete/category/"+val,
                type : "DELETE",
                success : function(json){
                    $('#ModalDeleteData').modal('hide');
                    $('#'+trid).remove();

                },
                error : function(err){
                    alert(err);
                }  
            });
        })
         
    })
});

// Adding Services ===================================================


$(document).on("click", "#addServiceButton", function(){
	var logoImg = $('input[name="logoImgService"]').get(0).files[0];
	var Service = $('#ServiceCat').val();
	var formData = new FormData();
	formData.append('image', logoImg);
	formData.append('Service', Service);
	console.log(formData)
	
	$.ajax({
	  type: "POST",
	  url: '/add/service',
	  data: formData,
	  contentType: false,
	  processData: false,
	  cache: false,
      success: function(json) {
        console.log(json)
        $('input.CountryModal').removeAttr('value');
        $('.CountryModal').val('');
        var HTML = '<tr id="'+json.service._id+'"><td data-label="ID">'+json.service._id+'</td><td data-label="Services Name">'+json.service.Service+'</td><td data-label="Action"><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More Option</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><a class="dropdown-item getSerCatDet" title="'+json.service._id+'" data-toggle="modal" data-target="#ModalEditSerCat" href="#">EDIT</a><a class="dropdown-item DeleteService" value="'+json.service._id+'" title="'+json.service.Service+'" data-toggle="modal" data-target="#ModalDeleteData" href="#"><button>Delete</button></a></div></div> </td></tr>'
                $('#ServiceBody').append(HTML);

	  	alert(json.message)
	  }
	});
})

$(document).ready(function(){
    $('table').on('click', '.DeleteService', function(){
    // $('.deleteserbtn').click(function(){
        var val = $(this).attr("value");
        var title = $(this).attr("title"); 
        var trid = $(this).closest('tr').attr('id');
        
        $('#jobName').empty();
        $('#jobName').append(title);
        $('.deletedsuccess').on('click', function(){
        // $('.deletedsuccess').click(function(){
            $.ajax({
                url : "/delete/service/"+val,
                type : "DELETE",
                success : function(json){
                    $('#ModalDeleteData').modal('hide');
                    $('#'+trid).remove();

                },
                error : function(err){
                    alert(err);
                }  
            });
        })
         
    })
});
// +++++++++++++++++++++++++++==================================================

$(document).ready(function(){
	$('.getallData').click(function(){
		var title = $(this).attr("title");
		$('#bodyforSingleDetails').empty()
		$.ajax({
			url : "/get/user/job?_id="+title,
			type : "GET",
			dataType: 'json',
			success : function(json){
				var HTML = '<div class="details-card"><div class="candDetails"><div class="imageUser"><img src="/img/img/Female_avatar-06-512.png" style="width: 20px; height: 30px;"></div><div class="userDetails mb5"><div class="candName"><span class="job-type" style="font-size: 16px;color: #f16024; font-weight: bold;" title="'+json.jobType+'">'+json.jobType+'</span><span class="id_verified hidden-xs hidden-sm" title="One of following Govt. ID is verified for this candidate - PAN card, Aaadhar card, Driving License, Voter Id "></span></div></div><div class="employee-name"><div class="cnctAndDwmload"></div></div><div class="employee-details"><ul class="emp-list"><li><span class="emp-heading">Specialisation/Skills</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.skills+'"><span class="brief-skills">'+json.skills+'</span><span class="morecontent"></span></span></span></li><li><span class="emp-heading">Job Description</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.jobDescription+'">'+json.jobDescription+'</span></span></li><li><span class="emp-heading">Vacancy</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.aVacancy+'">'+json.aVacancy+'</span></span></li><li><span class="emp-heading">Job Expiry date</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.expiryDate+'">'+json.expiryDate+'</span></span></li><li><span class="emp-heading">Service Providing Country</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.country+'">'+json.country+'</span></span></li><li><span class="emp-heading">Service Providing state</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.state+'">'+json.state+'</span></span></li><li><span class="emp-heading">Job Area</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.jobArea+'">'+json.jobArea+'</span></span></li><li><span class="emp-heading">Pin Code</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.pinCode+'">'+json.pinCode+'</span></span></li><li><span class="emp-heading">Job Address</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.jobAddress+'">'+json.jobAddress+'</span></span></li><li><span class="emp-heading">Salary</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.salary+'">'+json.salary+'</span></span></li><li><span class="emp-heading">Reqd. Experience</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.experience+'">'+json.experience+'</span></span></li><li><span class="emp-heading">Shift</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.shift+'">'+json.shift+'</span></span></li><li><span class="emp-heading">Gender</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.gender+'">'+json.gender+'</span></span></li><li><span class="emp-heading">Educations</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.educations+'">'+json.educations+'</span></span></li><li><span class="emp-heading">known Language</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.knownLanguage+'">'+json.knownLanguage+'</span></span></li><li><span class="emp-heading">Name of Company/Bussiness/Other</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.companyName+'">'+json.companyName+'</span></span></li><li><span class="emp-heading">Name of Representative</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.nameOfRepresentative+'">'+json.nameOfRepresentative+'</span></span></li><li><span class="emp-heading">Mobile</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.mobile+'">'+json.mobile+'</span></span></li><li><span class="emp-heading">Landline No</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.landline+'">'+json.landline+'</span></span></li><li><span class="emp-heading">Email</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.email+'">'+json.email+'</span></span></li><li><span class="emp-heading">Addhar/Voter Card No.</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.idCardNumber+'">'+json.idCardNumber+'</span></span></li><li><span class="emp-heading">Address of Employer</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.addressOfEmployer+'">'+json.addressOfEmployer+'</span></span></li><li><span class="emp-heading">Contact Timing</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.contactTiming+'">'+json.contactTiming+'</span></span></li><li><span class="emp-heading">Looking Overseas</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.lookingOverseas+'">'+json.lookingOverseas+'</span></span></li></ul></div><div class="hidden-lg hidden-md card-view pull-right hidden-xs hidden-sm"><i class="icon-basic_eye"></i><span></span></div><div class="button-div"><button data-toggle="modal" data-target="#myModal" class="ghst-btn demo-action InstantActionbuttons" type="button">Email</button><button class="download-btn ghst-btn demo-action InstantActionbuttons" data-toggle="collapse" data-target="#'+json._id+'" type="button">View all details</button></div></div></div>'
				$('#bodyforSingleDetails').append(HTML)
			},
			error : function(err){
				alert('Network Error 400');
			}  
		});
	})
});


$(document).ready(function(){
 	$('table').on('click', '.getallService', function(){
	// $('.getallService').click(function(){
		var title = $(this).attr("title");
		$('#bodyforSingleDetails').empty()
		$.ajax({
			url : "/get/user/service?_id="+title,
			type : "GET",
			dataType: 'json',
			success : function(json){
				var HTML = '<div class="details-card""><div class="candDetails"><div class="imageUser"><img src="/img/img/Female_avatar-06-512.png" style="width: 20px; height: 30px;"></div><div class="userDetails mb5"><div class="candName"><span class="TypeOfService" style="font-size: 16px;color: #f16024; font-weight: bold;" title="'+json.TypeOfService+'">'+json.TypeOfService+'</span><span class="id_verified hidden-xs hidden-sm" title="One of following Govt. ID is verified for this candidate - PAN card, Aaadhar card, Driving License, Voter Id "></span></div></div><div class="employee-name"><div class="cnctAndDwmload"></div></div><div class="employee-details"><ul class="emp-list"><li><span class="emp-heading">Service Specification</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Specification+'"><span class="brief-skills">'+json.Specification+'</span><span class="morecontent"></span></span></span></li><li><span class="emp-heading">Timing for Provide Services</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.ProvideServices+'">'+json.ProvideServices+'</span></span></li><li><span class="emp-heading">Services Provider Registered on</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.ProviderRegistered+'">'+json.ProviderRegistered+'</span></span></li><li><span class="emp-heading">Services Registered Expiry Date</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.RegisteredExpiry+'">'+json.RegisteredExpiry+'</span></span></li><li><span class="emp-heading">Service Providing Country</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Country+'">'+json.Country+'</span></span></li><li><span class="emp-heading">Service Providing state</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.State+'">'+json.State+'</span></span></li><li><span class="emp-heading">Service Providing City</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.City+'">'+json.City+'</span></span></li><li><span class="emp-heading">Services Providing Area</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Area+'">'+json.Area+'</span></span></li><li><span class="emp-heading">Services Provider Agency Name</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Agency+'">'+json.Agency+'</span></span></li><li><span class="emp-heading">Name of Representative/Service Provider</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Representative+'">'+json.Representative+'</span></span></li><li><span class="emp-heading">Mobile Number</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.MobileNumber+'">'+json.MobileNumber+'</span></span></li><li><span class="emp-heading">Landline Number</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.LandNumber+'">'+json.LandNumber+'</span></span></li><li><span class="emp-heading">Contact Timing</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Timing+'">'+json.Timing+'</span></span></li><li><span class="emp-heading">Aadhar Card/Voter Card No./Other</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.aadharcard+'">'+json.aadharcard+'</span></span></li><li><span class="emp-heading">Website</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.website+'">'+json.website+'</span></span></li><li><span class="emp-heading">Email/Mobile</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.emailMobile+'">'+json.emailMobile+'</span></span></li><li><span class="emp-heading">Address Of Services Provider</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.address+'">'+json.address+'</span></span></li><li><span class="emp-heading">Pincode</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.pincode+'">'+json.pincode+'</span></span></li><li><span class="emp-heading">Any Information About Your Services</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.information+'">'+json.information+'</span></span></li></ul></div><div class="hidden-lg hidden-md card-view pull-right hidden-xs hidden-sm"><i class="icon-basic_eye"></i><span></span></div><div class="button-div"><button data-toggle="modal" data-target="#myModal" class="ghst-btn demo-action InstantActionbuttons" type="button">Email</button><button class="download-btn ghst-btn demo-action InstantActionbuttons" data-toggle="collapse" data-target="#'+json._id+'" type="button">View all details</button></div></div></div>'
				$('#bodyforSingleDetails').append(HTML)
			},
			error : function(err){
				alert(err);
			}  
		});
	})
});

  $(document).ready(function(){
  	$('table').on('click', '.gettinguserdata', function(){
    // $('.gettinguserdata').click(function(){
        var title = $(this).attr("title");
        $('#bodyforSingleDetails').empty()
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                var HTML = '<div class="details-card" id="updatetable"><div class="candDetails"><div class="imageUser"><img src="/img/img/'+json.Gender+'.png" style="width: 54px; height: 54px;"></div><div class="userDetails mb5"><div class="candName"><span class="job-type" title="'+json.JobCat+'">'+json.JobCat+'</span><span class="id_verified hidden-xs hidden-sm" title="One of following Govt. ID is verified for this candidate - PAN card, Aaadhar card, Driving License, Voter Id "></span></div></div><div class="employee-name"><div class="cnctAndDwmload"></div></div><div class="employee-details"><ul class="emp-list"><li><span class="emp-heading">Name</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Name+'">'+json.Name+'</span></span></li><li><span class="emp-heading">Mobile</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Mobile+'">'+json.Mobile+'</span></span></li><li><span class="emp-heading">Alternate Number</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.AlternateNum+'">'+json.AlternateNum+'</span></span></li><li><span class="emp-heading">Email id/Phone</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.EmailorMobile+'">'+json.EmailorMobile+'</span></span></li><li><span class="emp-heading">Adhar /Voter Card No</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.AdharNo+'">'+json.AdharNo+'</span></span></li><li><span class="emp-heading">Country</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Country+'">'+json.Country+'</span></span></li><li><span class="emp-heading">State</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.State+'">'+json.State+'</span></span></li><li><span class="emp-heading">City</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.City+'">'+json.City+'</span></span></li><li><span class="emp-heading">Pincode</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Pincode+'">'+json.Pincode+'</span></span></li><li><span class="emp-heading">Address</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Address+'">'+json.Address+'</span></span></li><li><span class="emp-heading">Gender</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Gender+'">'+json.Gender+'</span></span></li><li><span class="emp-heading">Shift</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.shift+'">'+json.shift+'</span></span></li><li><span class="emp-heading">DOB</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.DOB+'">'+json.DOB+'</span></span></li><li><span class="emp-heading">Religin</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Religin+'">'+json.Religin+'</span></span></li><li><span class="emp-heading">known Language</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.knownLanguage+'">'+json.knownLanguage+'</span></span></li><li><span class="emp-heading">Class</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Class+'">'+json.Class+'</span></span></li><li><span class="emp-heading">Degree</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Degree+'">'+json.Degree+'</span></span></li><li><span class="emp-heading">PG</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PG+'">'+json.PG+'</span></span></li><li><span class="emp-heading">Diploma</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Diploma+'">'+json.Diploma+'</span></span></li><li><span class="emp-heading">Course</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Course+'">'+json.Course+'</span></span></li><li><span class="emp-heading">Career Objective</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.CareerObjective+'">'+json.CareerObjective+'</span></span></li><li><span class="emp-heading">Other Details</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.OtherDetails+'">'+json.OtherDetails+'</span></span></li><li><span class="emp-heading">Reference Mobile</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.ReferenceMobile+'">'+json.ReferenceMobile+'</span></span></li><li><span class="emp-heading">Looking Overseas</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.LookingOverseas+'">'+json.LookingOverseas+'</span></span></li><li><span class="emp-heading">Name of Impoloyer</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.NameofImpoloyer+'">'+json.NameofImpoloyer+'</span></span></li><li><span class="emp-heading">Position Designation</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PositionDesignation+'">'+json.PositionDesignation+'</span></span></li><li><span class="emp-heading">Main Job Category</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.MainJobCategory+'">'+json.MainJobCategory+'</span></span></li><li><span class="emp-heading">Skills</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Skills+'">'+json.Skills+'</span></span></li><li><span class="emp-heading">Experience</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Experience+'">'+json.Experience+'</span></span></li><li><span class="emp-heading">Current Salary</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.currentSalary+'">'+json.currentSalary+'</span></span></li><li><span class="emp-heading">Expected Salary</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.ExpSalary+'">'+json.ExpSalary+'</span></span></li><li><span class="emp-heading">Priferred Shift</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PriferredShift+'">'+json.PriferredShift+'</span></span></li><li><span class="emp-heading">Priferred Job Description</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PriferredJobDescription+'">'+json.PriferredJobDescription+'</span></span></li><li><span class="emp-heading">Priferred Location</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PriferredLocation+'">'+json.PriferredLocation+'</span></span></li><li><span class="emp-heading">previous Name of Impoloyer</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.NameofImpoloyer1+'">'+json.NameofImpoloyer1+'</span></span></li><li><span class="emp-heading">previous Position Designation</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.PositionDesignation1+'">'+json.PositionDesignation1+'</span></span></li><li><span class="emp-heading">previous Job Category</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.JobCategory1+'">'+json.JobCategory1+'</span></span></li><li><span class="emp-heading">previous State/City</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.State1City1+'">'+json.State1City1+'</span></span></li><li><span class="emp-heading">previous Experience</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Experience1+'">'+json.Experience1+'</span></span></li><li><span class="emp-heading">previous shift</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.shift1+'">'+json.shift1+'</span></span></li><li><span class="emp-heading">previous job Description</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.jobDescription1+'">'+json.jobDescription1+'</span></span></li><li><span class="emp-heading">Salary Withdrawn</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.SalaryWithdrawn+'">'+json.SalaryWithdrawn+'</span></span></li></ul></div><div class="hidden-lg hidden-md card-view pull-right hidden-xs hidden-sm"><i class="icon-basic_eye"></i><span></span></div><div class="button-div"><div class="container"></div></div></div></div>'
                $('#bodyforSingleDetails').append(HTML)
            },
            error : function(err){
                alert(err);
            }  
        });
    })
});

// Getting User Data

$(document).ready(function(){
  	$('table').on('click', '.GettingRegiU', function(){
	// $('.GettingRegiU').click(function(){
		var title = $(this).attr("title");
		$('#bodyforSingleDetails').empty()
		$.ajax({
			url : "/user/data/json?_id="+title,
			type : "GET",
			dataType: 'json',
			success : function(json){
				var HTML = '<div class="details-card""><div class="candDetails"><div class="imageUser"><img src="'+json.picture+'" style="width: 20px; height: 30px;"></div><div class="userDetails mb5"><div class="candName"><span class="TypeOfService" style="font-size: 16px;color: #f16024; font-weight: bold;" title="'+json.firstname+'">'+json.firstname+'</span><span class="id_verified hidden-xs hidden-sm" title="One of following Govt. ID is verified for this candidate - PAN card, Aaadhar card, Driving License, Voter Id "></span></div></div><div class="employee-name"><div class="cnctAndDwmload"></div></div><div class="employee-details"><ul class="emp-list"><li><span class="emp-heading">Mobile</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.mobile+'"><span class="brief-skills">'+json.mobile+'</span><span class="morecontent"></span></span></span></li><li><span class="emp-heading">Email</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.emailid+'">'+json.emailid+'</span></span></li><li><span class="emp-heading">Password</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.password+'">'+json.password+'</span></span></li><li><span class="emp-heading">Address</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.address+'">'+json.address+'</span></span></li><li><span class="emp-heading">State</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.state+'">'+json.state+'</span></span></li><li><span class="emp-heading">City</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.city+'">'+json.city+'</span></span></li><li><span class="emp-heading">Pin Code</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.pincode+'">'+json.pincode+'</span></span></li><li><span class="emp-heading">gender</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.gender+'">'+json.gender+'</span></span></li><li><span class="emp-heading">Looking For</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.lookingfor+'">'+json.lookingfor+'</span></span></li><li><span class="emp-heading">Status</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.Status+'">'+json.Status+'</span></span></li><li><span class="emp-heading">Created Date</span><span class="emp-rep"><span class="jsProfileItem more trucateText" title="'+json.date+'">'+json.date+'</span></span></li></ul></div><div class="hidden-lg hidden-md card-view pull-right hidden-xs hidden-sm"><i class="icon-basic_eye"></i><span></span></div><div class="button-div"></div></div></div>'
				$('#bodyforSingleDetails').append(HTML)
			},
			error : function(err){
				alert(err);
			}  
		});
	})
});

// Edit Part for resume


// Contect Info
$(document).ready(function(){
    $('.EditConInfoButton').click(function(){
        var title = $(this).attr("title");
        $('#EditContectInfo').empty()
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-name').val(json.Name);
                $('input#recipient-Mobile').val(json.Mobile);
                $('input#recipient-Alernate-numebr').val(json.AlternateNum);
                $('input#recipient-Email').val(json.EmailorMobile);
                $('input#recipient-aadhar').val(json.AdharNo);
                $('input#recipient-city').val(json.City);
                $('input#recipient-pincode').val(json.Pincode);
                $('input#recipient-Address').val(json.Address);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.contectInfo').click(function(){
        	var contectInformation = {}
        	var Name = $('input#recipient-name').val();
            var Mobile = $('input#recipient-Mobile').val();
            var AlternateNum = $('input#recipient-Alernate-numebr').val();
            var EmailorMobile = $('input#recipient-Email').val();
            var AdharNo = $('input#recipient-aadhar').val();
            var City = $('input#recipient-city').val();
            var Pincode = $('input#recipient-pincode').val();
            var Address = $('input#recipient-Address').val();

            contectInformation.Name = Name
            contectInformation.Mobile = Mobile
            contectInformation.AlternateNum = AlternateNum
            contectInformation.EmailorMobile = EmailorMobile
            contectInformation.AdharNo = AdharNo
            contectInformation.City = City
            contectInformation.Pincode = Pincode
            contectInformation.Address = Address

            $.ajax({
            	url : "/edit/contect-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEdit').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// About
$(document).ready(function(){
    $('.EditAboutButton').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-Gender').val(json.Gender);
                $('input#recipient-Dateofbirth').val(json.DOB);
                $('input#recipient-Religion').val(json.Religin);
                $('input#recipient-LanguageKnown').val(json.knownLanguage);
            },
            error : function(err){
                alert(err);
            }  
        });
         $('.aboutEdit').click(function(){
        	var aboutinfo = {}
        	var Gender = $('input#recipient-Gender').val();
            var DOB = $('input#recipient-Dateofbirth').val();
            var Religin = $('input#recipient-Religion').val();
            var knownLanguage = $('input#recipient-LanguageKnown').val();

            aboutinfo.Gender = Gender
            aboutinfo.DOB = DOB
            aboutinfo.Religin = Religin
            aboutinfo.knownLanguage = knownLanguage

            $.ajax({
            	url : "/edit/about-info?_id="+title,
            	type : "PUT",
            	data: aboutinfo,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditAbout').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

$(document).ready(function(){
    $('.EditEduButton').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-class').val(json.Class);
                $('input#recipient-degree').val(json.Degree);
                $('input#recipient-pg').val(json.PG);
                $('input#recipient-diploma').val(json.Diploma);
                $('input#recipient-Course').val(json.Course);
                $('input#recipient-objec').val(json.CareerObjective);
                $('input#recipient-otherdet').val(json.OtherDetails);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.udpateEducationIfoButton').click(function(){
        	var contectInformation = {}
        	
        	var Class = $('input#recipient-class').val();
            var Degree = $('input#recipient-degree').val();
            var PG = $('input#recipient-pg').val();
            var Diploma = $('input#recipient-diploma').val();
            var Course = $('input#recipient-Course').val();
            var CareerObjective = $('input#recipient-objec').val();
            var OtherDetails = $('input#recipient-otherdet').val();

            contectInformation.Class = Class
            contectInformation.Degree = Degree
            contectInformation.PG = PG
            contectInformation.Diploma = Diploma
            contectInformation.Course = Course
            contectInformation.CareerObjective = CareerObjective
            contectInformation.OtherDetails = OtherDetails

            $.ajax({
            	url : "/edit/education-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditEducInfo').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});


// Other Details
$(document).ready(function(){
    $('.otherdet').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-ReffName').val(json.ReferenceName);
                $('input#recipient-ReffMobile').val(json.ReferenceMobile);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.updateotherDetails').click(function(){
        	var contectInformation = {}
        	
        	var ReferenceName = $('input#recipient-ReffName').val();
        	var ReferenceMobile = $('input#recipient-ReffMobile').val();

            contectInformation.ReferenceName = ReferenceName
            contectInformation.ReferenceMobile = ReferenceMobile

            $.ajax({
            	url : "/edit/other-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditOtherInfo').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Current Work Details
$(document).ready(function(){
    $('.currentworkinfoedit').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-currentName').val(json.NameofImpoloyer);
                $('input#recipient-currentPositon').val(json.PositionDesignation);
                $('input#recipient-currentJobCat').val(json.MainJobCategory);
                $('input#recipient-currentSkills').val(json.Skills);
                $('input#recipient-curretnExp').val(json.Experience);
                $('input#recipient-currentSal').val(json.currentSalary);
                $('input#recipient-currentExpected').val(json.ExpSalary);
                $('input#recipient-currentShift').val(json.PriferredShift);
                $('input#recipient-currentPreJobDes').val(json.PriferredJobDescription);
                $('input#recipient-currentPrefLocation').val(json.PriferredLocation);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.updateCurrentWorkInfo').click(function(){
        	var contectInformation = {}
        	
        	var NameofImpoloyer = $('input#recipient-currentName').val();
            var PositionDesignation = $('input#recipient-currentPositon').val();
            var MainJobCategory = $('input#recipient-currentJobCat').val();
            var Skills = $('input#recipient-currentSkills').val();
            var Experience = $('input#recipient-curretnExp').val();
            var currentSalary = $('input#recipient-currentSal').val();
            var ExpSalary = $('input#recipient-currentExpected').val();
            var PriferredShift = $('input#recipient-currentShift').val();
            var PriferredJobDescription = $('input#recipient-currentPreJobDes').val();
            var PriferredLocation = $('input#recipient-currentPrefLocation').val();

            contectInformation.NameofImpoloyer = NameofImpoloyer
            contectInformation.PositionDesignation = PositionDesignation
            contectInformation.MainJobCategory = MainJobCategory
            contectInformation.Skills = Skills
            contectInformation.Experience = Experience
            contectInformation.currentSalary = currentSalary
            contectInformation.ExpSalary = ExpSalary
            contectInformation.PriferredShift = PriferredShift
            contectInformation.PriferredJobDescription = PriferredJobDescription
            contectInformation.PriferredLocation = PriferredLocation

            $.ajax({
            	url : "/edit/current-work-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditcurrentInfo').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Current Work Details
$(document).ready(function(){
    $('.pastworkinfoedit').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/resume?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json) 
                $('input#recipient-pastName').val(json.NameofImpoloyer1);
                $('input#recipient-pastPositon').val(json.PositionDesignation1);
                $('input#recipient-pastJobCat').val(json.JobCategory1);
                $('input#recipient-pastState').val(json.State1City1);
                $('input#recipient-pastExp').val(json.Experience1);
                $('input#recipient-pastshift').val(json.shift1);
                $('input#recipient-pastjobdes').val(json.jobDescription1);
                $('input#recipient-pastsalawid').val(json.SalaryWithdrawn);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.pastworkedti').click(function(){
        	var contectInformation = {}
        	
        	var NameofImpoloyer1 = $('input#recipient-pastName').val();
            var PositionDesignation1 = $('input#recipient-pastPositon').val();
            var JobCategory1 = $('input#recipient-pastJobCat').val();
            var State1City1 = $('input#recipient-pastState').val();
            var Experience1 = $('input#recipient-pastExp').val();
            var shift1 = $('input#recipient-pastshift').val();
            var jobDescription1 = $('input#recipient-pastjobdes').val();
            var SalaryWithdrawn = $('input#recipient-pastsalawid').val();

            contectInformation.jobDescription1 = NameofImpoloyer1
            contectInformation.PositionDesignation1 = PositionDesignation1
            contectInformation.JobCategory1 = JobCategory1
            contectInformation.State1City1 = State1City1
            contectInformation.Experience1 = Experience1
            contectInformation.shift1 = shift1
            contectInformation.jobDescription1 = jobDescription1
            contectInformation.SalaryWithdrawn = SalaryWithdrawn

            $.ajax({
            	url : "/edit/past-work-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditPastDetails').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit Part for Jobs

// edit job-details
$(document).ready(function(){
    $('.editJobDetails').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/job?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-specialsationSkills').val(json.skills);
                $('input#recipient-JobDesc').val(json.jobDescription);
                $('input#recipient-AvalVac').val(json.aVacancy);
                $('input#recipient-ExpieryDate').val(json.expiryDate);
                $('input#recipient-Country').val(json.country);
                $('input#recipient-state').val(json.state);
                $('input#recipient-City').val(json.city);
                $('input#recipient-jobArea').val(json.jobArea);
                $('input#recipient-pincode').val(json.pinCode);
                $('input#recipient-jobAddress').val(json.jobAddress);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.jobinfo').click(function(){
        	var contectInformation = {}
        	var skills = $('input#recipient-specialsationSkills').val();
            var jobDescription = $('input#recipient-JobDesc').val();
            var aVacancy = $('input#recipient-AvalVac').val();
            var expiryDate = $('input#recipient-ExpieryDate').val();
            var country = $('input#recipient-Country').val();
            var state = $('input#recipient-state').val();
            var city = $('input#recipient-City').val();
            var jobArea = $('input#recipient-jobArea').val();
            var pinCode = $('input#recipient-pincode').val();
            var jobAddress = $('input#recipient-jobAddress').val();

            contectInformation.skills = skills
            contectInformation.jobDescription = jobDescription
            contectInformation.aVacancy = aVacancy
            contectInformation.expiryDate = expiryDate
            contectInformation.country = country
            contectInformation.state = state
            contectInformation.city = city
            contectInformation.jobArea = jobArea
            contectInformation.pinCode = pinCode
            contectInformation.jobAddress = jobAddress

            $.ajax({
            	url : "/edit/job/job-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEdit').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit Professional Details
$(document).ready(function(){
    $('.editProffInfo').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/job?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-offSal').val(json.salary);
                $('input#recipient-reqexp').val(json.experience);
                $('input#recipient-shift').val(json.shift);
                $('input#recipient-gender').val(json.gender);
                $('input#recipient-education').val(json.educations);
                $('input#recipient-knowLang').val(json.knownLanguage);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.ProfessionalDetails').click(function(){
        	var contectInformation = {}
        	var salary = $('input#recipient-offSal').val();
            var experience = $('input#recipient-reqexp').val();
            var shift = $('input#recipient-shift').val();
            var gender = $('input#recipient-gender').val();
            var educations = $('input#recipient-education').val();
            var knownLanguage = $('input#recipient-knowLang').val();

            contectInformation.salary = salary
            contectInformation.experience = experience
            contectInformation.shift = shift
            contectInformation.gender = gender
            contectInformation.educations = educations
            contectInformation.knownLanguage = knownLanguage

            $.ajax({
            	url : "/edit/job/Professional-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditProfessional').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit contect Details
$(document).ready(function(){
    $('.editContectDetails').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/job?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-nameOfCom').val(json.companyName);
                $('input#recipient-nameOfRep').val(json.nameOfRepresentative);
                $('input#recipient-Mobile').val(json.mobile);
                $('input#recipient-LandLine').val(json.landline);
                $('input#recipient-Email').val(json.email);
                $('input#recipient-Aadhar').val(json.idCardNumber);
                $('input#recipient-Address').val(json.addressOfEmployer);
                $('input#recipient-ContectTime').val(json.contactTiming);
                $('input#recipient-LookingO').val(json.lookingOverseas);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.updateContectDetails').click(function(){
        	var contectInformation = {}
        	var companyName = $('input#recipient-nameOfCom').val();
            var nameOfRepresentative = $('input#recipient-nameOfRep').val();
            var mobile = $('input#recipient-Mobile').val();
            var landline = $('input#recipient-LandLine').val();
            var email = $('input#recipient-Email').val();
            var idCardNumber = $('input#recipient-Aadhar').val();
            var addressOfEmployer = $('input#recipient-Address').val();
            var contactTiming = $('input#recipient-ContectTime').val();
            var lookingOverseas = $('input#recipient-LookingO').val();

            contectInformation.companyName = companyName
            contectInformation.nameOfRepresentative = nameOfRepresentative
            contectInformation.mobile = mobile
            contectInformation.landline = landline
            contectInformation.email = email
            contectInformation.idCardNumber = idCardNumber
            contectInformation.addressOfEmployer = addressOfEmployer
            contectInformation.contactTiming = contactTiming
            contectInformation.lookingOverseas = lookingOverseas

            $.ajax({
            	url : "/edit/job/contect-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditContectDetails').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit For Service Posted

// Edit Service Details
$(document).ready(function(){
    $('.EditProviderDetails').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/service?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-serProAgeName').val(json.Agency);
                $('input#recipient-NameOfRepSerPro').val(json.Representative);
                $('input#recipient-MobileNumber').val(json.MobileNumber);
                $('input#recipient-LandlindNum').val(json.LandNumber);
                $('input#recipient-ConTime').val(json.Timing);
                $('input#recipient-Aadhar').val(json.aadharcard);
                $('input#recipient-website').val(json.website);
                $('input#recipient-EmailMobile').val(json.emailMobile);
                $('input#recipient-addressofSerPr').val(json.address);
                $('input#recipient-Pinc').val(json.pincode);
                $('input#recipient-anyInfoAboutYourSer').val(json.information);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.updateProviderDetails').click(function(){
        	var contectInformation = {}
        	var Agency = $('input#recipient-serProAgeName').val();
            var Representative = $('input#recipient-NameOfRepSerPro').val();
            var MobileNumber = $('input#recipient-MobileNumber').val();
            var LandNumber = $('input#recipient-LandlindNum').val();
            var Timing = $('input#recipient-ConTime').val();
            var aadharcard = $('input#recipient-Aadhar').val();
            var website = $('input#recipient-website').val();
            var emailMobile = $('input#recipient-EmailMobile').val();
            var address = $('input#recipient-addressofSerPr').val();
            var pincode = $('input#recipient-Pinc').val();
            var information = $('input#recipient-anyInfoAboutYourSer').val();

            contectInformation.Agency = Agency
            contectInformation.Representative = Representative
            contectInformation.MobileNumber = MobileNumber
            contectInformation.LandNumber = LandNumber
            contectInformation.Timing = Timing
            contectInformation.aadharcard = aadharcard
            contectInformation.website = website
            contectInformation.emailMobile = emailMobile
            contectInformation.address = address
            contectInformation.pincode = pincode
            contectInformation.information = information

            $.ajax({
            	url : "/edit/service/Service-provider-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEditProInfo').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

// Edit Service Details
$(document).ready(function(){
    $('.EditServiceDetails').click(function(){
        var title = $(this).attr("title");
        $.ajax({
            url : "/get/user/service?_id="+title,
            type : "GET",
            dataType: 'json',
            success : function(json){
                console.log(json)
                $('input#recipient-serviceSpec').val(json.Specification);
                $('input#recipient-TimingforServicePro').val(json.ProvideServices);
                $('input#recipient-ProvRegisOn').val(json.ProviderRegistered);
                $('input#recipient-RegisExpirDate').val(json.RegisteredExpiry);
                $('input#recipient-SerProState').val(json.State);
                $('input#recipient-SerProCity').val(json.City);
                $('input#recipient-SerProArea').val(json.Area);
            },
            error : function(err){
                alert(err);
            }  
        });
        $('.UpdateServiceDetails').click(function(){
        	var contectInformation = {}
        	var Specification = $('input#recipient-serviceSpec').val();
        	var ProvideServices = $('input#recipient-TimingforServicePro').val();
        	var ProviderRegistered = $('input#recipient-ProvRegisOn').val();
        	var RegisteredExpiry = $('input#recipient-RegisExpirDate').val();
            var State = $('input#recipient-SerProState').val();
            var City = $('input#recipient-SerProCity').val();
            var Area = $('input#recipient-SerProArea').val();

            contectInformation.Specification = Specification
            contectInformation.ProvideServices = ProvideServices
            contectInformation.ProviderRegistered = ProviderRegistered
            contectInformation.RegisteredExpiry = RegisteredExpiry
            contectInformation.State = State
            contectInformation.City = City
            contectInformation.Area = Area

            $.ajax({
            	url : "/edit/service/Service-info?_id="+title,
            	type : "PUT",
            	data: contectInformation,
            	success: function(json){
            		console.log(json)
            		$('#ModalEdit').modal('hide');
            	},
            	error: function(err){
            		alert(err)
            	}
            });
        })
    })
});

