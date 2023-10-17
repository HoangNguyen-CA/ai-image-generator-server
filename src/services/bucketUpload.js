const { createClient } = require('@supabase/supabase-js');
const uuid = require('uuid');
const AppError = require('../errorHandling/AppError');

const options = {
  schema: 'public',
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
    const blob = await fetch(url).then((r) => r.blob());

    const imageName = uuid.v4 + '.jpg';
    await supabase.storage.from('ai-image-generator').upload(imageName, blob);

    const publicURL = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/ai-image-generator/${imageName}`;

    return publicURL;
  } catch (e) {
    throw new AppError(400, `Could not upload user image (${imageURL}) to S3.`);
  }
}

module.exports = bucketUpload;
