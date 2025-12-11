import cloudinary from "../configs/cloudinary.config.js";

export const uploadToCloudinary = async (file) => {
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder: "ecobin-buddy"},
            (err, res) => err ? reject(err) : resolve(res)
        );

        stream.end(file.buffer);
    });
    

    const url = cloudinary.url(result.public_id,{
        transformation:[
            {
                quality: 'auto',
                fetch_format: 'auto',
            },
            {
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: 'face'
            }
        ]
    });

    return url;
}