import B2 from "backblaze-b2";
import { NextApiRequest, NextApiResponse } from "next";

const uploadHandler = async (
  req: NextApiRequest & { body: { dataUrls: string[]; fileNames: string[] } },
  res: NextApiResponse
) => {
  try {

    const applicationKeyId = process.env.BACKBLAZE_APPLICATION_KEY_ID;
    const applicationKey = process.env.BACKBLAZE_APPLICATION_KEY;
    const bucketId = process.env.BACKBLAZE_BUCKET_ID;

    if (!applicationKeyId || !applicationKey || !bucketId) {
      throw new Error('Required environment variables are not set');
    }

    const b2 = new B2({
      applicationKeyId,
      applicationKey
    });

    const { data: authData } = await b2.authorize();
    const { data: bucketsData } = await b2.listBuckets();
    const bucket = bucketsData.buckets.find(
      (bucket: { bucketId: string }) =>
        bucket.bucketId === bucketId
    );

    const bucketName = bucket.bucketName;
    const { data: uploadData } = await b2.getUploadUrl({
      bucketId
    });

    const urls = [];

    for (let i = 0; i < req.body.dataUrls.length; i++) {
      const dataUrl = req.body.dataUrls[i];
      const fileName = req.body.fileNames[i];

      const data = Buffer.from(dataUrl.split(",")[1], "base64");

      const { data: uploadResponse } = await b2.uploadFile({
        uploadUrl: uploadData.uploadUrl,
        uploadAuthToken: uploadData.authorizationToken,
        data,
        fileName,
      });

      const downloadURL = authData.downloadUrl;
      urls.push(`${downloadURL}/file/${bucketName}/${uploadResponse.fileName}`);
    }

    res.status(200).json({ urls });
  } catch (error: any) {
    console.log("Image upload error", error);
    res.status(500).json({ error: "Image upload error" });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "200mb",
    },
  },
};

export default uploadHandler;
