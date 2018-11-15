const upload = require('../services/file-upload.js');

const multer = require('multer');

const singleImageUpload = upload.single('image');

const fs = require('fs');


const routes = [
{
	method: 'POST',
	path: '/upload',
	handler: function(req, res){
		console.log(req)
		upload.array('photos', 3), function(req, res, next){
			// if(req) {
   //          console.log(err)
   //        }
          // else {
            return res('Successfully Upload file '+ req.file)
          // }
		}
        // });
	}
}
]
export default routes;