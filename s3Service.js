const { S3, AutoScaling } = require('aws-sdk');
const randomID = parseInt(Math.random() * 10000000)
const sharp = require('sharp');



// const uuid = require('uuid').v4;


// UPLOAD PROFILE ICON TO S3
exports.s3UploadProfileIcon = async (file, username) => {
    if(file) {
        const s3 = new S3();
        const param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `profileIcon/${randomID}-${username}-${file.originalname}`,
            // Body = buffer
            Body: sharp(file.buffer)
            .toFormat('jpeg')
            .resize({ height: 1200, fit: 'contain' })
    };
        return await s3.upload(param).promise(), { paramKey: param.Key };
    } else {
        console.log("no file selected");
    }
}

//UPLOAD RECIPE COVER FILE TO S3
exports.s3UploadCover = async (file, username) => {
    if(file) {
        const s3 = new S3();
        const param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `coverImages/${randomID}-${file.originalname}-${username}`,
            // Body = buffer
            Body: file.buffer
    };
        return await s3.upload(param).promise(), { paramKey: param.Key };
    } else {
        console.log("no file selected");
    }
}

// DELETE IMAGE FROM S3
exports.s3Delete = async (oldFile) => {
    if(oldFile !== "uploads/default.png") {
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            Bucket: process.env.AWS_BUCKET_NAME,
        });
        s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: oldFile }, (err, data) => {
           if(err) {
               console.log("ERROR deleting image " + err)
           } else {
            console.log("oldFile deleted!");
           }
        });
    } else {
        console.log("Skipped deleting default image.")
    }    
}


// TEST UPLOAD RECIPE COVER FILE TO S3
exports.s3UploadResize = async (file, username) => {
    if(file) {
        const s3 = new S3();
        const param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `coverImages/${randomID}-${username}-${file.originalname}`,
            // Body = buffer
            Body: sharp(file.buffer)
            .toFormat('jpeg')
            .resize({ height: 1200, fit: 'contain' })
            // Body: file.buffer
    };
        return await s3.upload(param).promise(), { paramKey: param.Key };
    } else {
        console.log("no file selected");
    }
}










