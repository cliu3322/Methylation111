import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import Config from './config';
import { authenticate, authError } from './middleware';
import multer from 'multer';

const { port, secretKey, expiredAfter } = Config;
const app = express();

function doesUserExists(username, password) {
	const user = {
		id: 1,
		username: 'demo@gmail.com',
		password: 'demodemo',
	};
	if (username === user.username && password === user.password) {
		return true;
	}
	return false;
}

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors());

app.get('/', (req, res) => {
	res.json({ status: 'OK' });
});

app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	const response = {};
	// You can use DB checking here

	if (doesUserExists(username, password)) {
		response.token = jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				username,
				id: 1,
			},
			secretKey
		);
	} else {
		response.error = 'Not found';
	}
	res.json(response);
});
app.use('/api/secret', [authenticate, authError]);
app.post('/api/secret/test', (req, res) => {
	res.json({
		status: 200,
		message: 'succcesful',
	});
});

app.listen(port, () => {
	console.log('Isomorphic JWT login ' + port);
});


const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, cb) {
		console.log(file.mimetype)
		var ext='';
		// Mimetype stores the file type, set extensions according to filetype
		switch (file.mimetype) {
			case 'application/octet-stream':
				ext = '.fastq';
				break;
			case 'image/png':
				ext = '.png';
				break;
			case 'image/gif':
				ext = '.gif';
				break;
		}

		cb(null, file.originalname);
	}
});
const upload = multer({storage: storage});

app.post('/pipeline/UploadFastQC', upload.single('file'), function (req, res, next) {

	if (req.file && req.file.originalname) {
		console.log(`Received file ${req.file.originalname}`);
	}

	res.send({ responseText: req.file.path }); // You can send any response to the user here
});
