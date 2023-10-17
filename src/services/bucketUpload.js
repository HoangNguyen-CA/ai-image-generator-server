const { createClient } = require("@supabase/supabase-js");
const uuid = require("uuid");
const AppError = require("../errorHandling/AppError");
const fetch = require("node-fetch");

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
};

const supabase = createClient(
  `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`,
  process.env.SUPABASE_API_KEY,
  options
);

async function bucketUpload(imageURL) {
  try {
    const blob = await fetch(imageURL).then((r) => r.blob());

    const imageName = uuid.v4() + ".jpg";
    const { data, error } = await supabase.storage
      .from("ai-image-generator")
      .upload(imageName, blob);
    if (error) throw error;
    const publicURL = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/ai-image-generator/${imageName}`;
    return publicURL;
  } catch (e) {
    console.log(e);
    throw new AppError(
      400,
      `Could not upload user image (${imageURL}) to supabase.`
    );
  }
}

module.exports = bucketUpload;
