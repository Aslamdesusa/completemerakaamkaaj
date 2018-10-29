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
				var HTML = '<tr><td data-label="ID">'+json.country._id+'</td><td data-label="Country Name">'+json.country.Country+'</td><td data-label="Action" style="display: flex;"><button class="country_edit">Edit</button><button data-id="'+json.country._id+'" id="addcitydeltebutton" class="country_delete">Delete</button></td></tr>'
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
	$('.deleteserbtn').click(function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");

		$('#jobName').empty();
		$('#jobName').append(title);
	$('.deletedsuccess').click(function(){
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


// ====================================================================
// Delete Data Ragister User
$(document).ready(function(){
	$('.delteRagisteruser').click(function(){
		var val = $(this).attr("value");
		var title = $(this).attr("title");
		var trid = $(this).closest('tr').attr('id');

		$('#jobName').empty();
		$('#jobName').append(title);
	$('.deletedsuccess').click(function(){
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

// Active and in Active data using ajax it will change the addStateSubmit

 $(document).ready(function(){
	$('.changeStatusService').click(function(){
		var AgencyName = $(this).attr("title")
		var valueActive = $(this).attr("value")

		var somehtml = 'If you will active/in-active this service then then it will display/un-display for every one.'
		$('#ServiceDisplayActive').empty();
		$('#ServiceDisplayActive').append(somehtml)
	$('.dataactivate').click(function(){
		$.ajax({
				url : "/change/status/to/verify/unverify?_id="+AgencyName,
				type : "GET",
				success : function(success){
					if (valueActive == "Active") {
						$('.changeStatusService').empty()
						$('.changeStatusService').append('In Active')
						return false
					}
					if (valueActive == "In active") {
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
				alert(err);
			}  
		});
	})
});


$(document).ready(function(){
	$('.getallService').click(function(){
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
    $('.gettinguserdata').click(function(){
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

