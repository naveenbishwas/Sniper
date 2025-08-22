export const dynamic = "force-dynamic";

import { S3 } from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";

// Required to disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form using a Promise
function parseFormData(req) {
  const form = formidable({ multiples: false, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req) {
  try {
    const { fields, files } = await parseFormData(req);

    const file = files.file;

    const fileContent = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}_${file.originalFilename}`;

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const upload = await s3.upload(params).promise();

    return NextResponse.json({ success: true, url: upload.Location });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
