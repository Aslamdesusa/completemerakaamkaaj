// Adding Country ======================================

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
				console.log(json)
				var HTML = '<tr><td>'+json.country._id+'</td><td>'+json.country.Country+'</td><td style="display: flex;"><button class="country_edit">Edit</button><button data-id="'+json.country._id+'" id="addcitydeltebutton" class="country_delete">Delete</button></td></tr>'
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
	$('table').on('click','#addcitydeltebutton' ,function(e){
		$(this).closest('tr').remove()
		e.preventDefault();
		var dataId = $(this).attr("data-id");
		$.ajax({
			url : "/delete/country/"+dataId,
			type : "DELETE",
			success : function(result){
				alert('entry Deleted success');
			},
			error : function(err){
				alert(err);
			}  
		});
		
	});
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
				var HTML = '<tr><td>'+json.state._id+'</td><td>'+json.state.State+'</td><td>'+json.state.Country+'</td><td style="display: flex;"><button class="country_edit">Edit</button><button data-id="'+json.state._id+'" id="addcitydeltebutton" class="country_delete">Delete</button></td></tr>'
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
	$('table').on('click','#addStateDelButton' ,function(e){
		$(this).closest('tr').remove()
		e.preventDefault();
		var dataId = $(this).attr("data-id");
		$.ajax({
			url : "/delete/state/"+dataId,
			type : "DELETE",
			success : function(result){
				console.log(result)
				alert(result.message);
			},
			error : function(err){
				alert(err);
			}  
		});
		
	});
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
				var HTML = '<tr><td>'+json.city._id+'</td><td>'+json.city.City+'</td><td>'+json.city.State+'</td><td>'+json.city.Country+'</td><td style="display: flex;"><button class="country_edit">Edit</button><button data-id="'+json.city._id+'" id="DeleteCityButton" class="country_delete">Delete</button></td></tr>'
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
	$('table').on('click','#DeleteCityButton' ,function(e){
		$(this).closest('tr').remove()
		e.preventDefault();
		var dataId = $(this).attr("data-id");
		$.ajax({
			url : "/delete/city/"+dataId,
			type : "DELETE",
			success : function(result){
				console.log(result)
				alert(result.message);
			},
			error : function(err){
				alert(err);
			}  
		});
		
	});
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
	  	alert(json.message)
	  }
	});
})

$(document).ready(function(){
	$('table').on('click','#DeleteCat' ,function(e){
		$(this).closest('tr').remove()
		e.preventDefault();
		var dataId = $(this).attr("data-id");
		$.ajax({
			url : "/delete/category/"+dataId,
			type : "DELETE",
			success : function(result){
				console.log(result)
				alert(result.message);
			},
			error : function(err){
				alert(err);
			}  
		});
		
	});
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
	  	var HTML = '<tr><td>'+json.service._id+'</td><td>'+json.service.Service+'</td><td style="display: flex;"><button class="country_edit">Edit</button><button data-id="'+json.service._id+'" id="DeleteCityButton" class="country_delete">Delete</button></td></tr>'
				$('#ServiceBody').append(HTML);
	  	alert(json.message)
	  }
	});
})

$(document).ready(function(){
	$('table').on('click','#DeleteService' ,function(e){
		$(this).closest('tr').remove()
		e.preventDefault();
		var dataId = $(this).attr("data-id");
		$.ajax({
			url : "/delete/service/"+dataId,
			type : "DELETE",
			success : function(result){
				console.log(result)
				alert(result.message);
			},
			error : function(err){
				alert(err);
			}  
		});
		
	});
});