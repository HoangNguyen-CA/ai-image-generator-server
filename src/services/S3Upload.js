// const AWS = require("aws-sdk");
// const uuid = require("uuid");
// const AppError = require("../errorHandling/AppError");

// const s3 = new AWS.S3();

// async function S3Upload(imageURL) {
//   try {
//     const res = await fetch(imageURL);
//     const buffer = await res.arrayBuffer();
//     const blob = new Uint8Array(buffer);

//     const uploadedImage = await s3
//       .upload({
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: uuid.v4(),
//         Body: blob,
//         ContentType: "image/jpeg",
//       })
//       .promise();

//     return uploadedImage.Location;
//   } catch (e) {
//     throw new AppError(400, `Could not upload user image (${imageURL}) to S3.`);
//   }
// }

// module.exports = S3Upload;
