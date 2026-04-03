const ImageKit = require("imagekit");

const imagekitClient = new ImageKit({
    privateKey : process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
})

async function uploadFile(file){
    const result = await imagekitClient.upload({
        file,
        fileName : "book_" + Date.now(),
        folder:"bookBlog/book"
    })

    return result;
}

module.exports = uploadFile