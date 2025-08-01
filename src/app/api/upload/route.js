import { S3 } from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { NextResponse } from "next/server";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert request to a Node.js-style readable stream
function getNodeRequest(request) {
  const readable = request.body;
  readable.headers = request.headers;
  readable.method = request.method;
  readable.url = request.url;
  return readable;
}

// Handle POST upload
export async function POST(request) {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  const parseForm = promisify(form.parse);

  try {
    const nodeReq = getNodeRequest(request);
    const [fields, files] = await parseForm(nodeReq);

    const file = files.file;

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = Date.now() + "_" + file.originalFilename;

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    return NextResponse.json({ success: true, url: uploadResult.Location });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
