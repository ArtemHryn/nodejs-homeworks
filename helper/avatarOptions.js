const fs = require("fs").promises;
const Jimp = require("jimp");

const resizeAvatar = async (path) => {
  const image = await Jimp.read(path);
  await image.resize(250, 250);
  await image.quality(60);
  await image.write(path);
};

const copyAvatar = async ({ originalname, path }, { avatarURL }) => {
  const [, extension] = originalname.split(".");
  const avatarNameArray = avatarURL.split("/");
  const newFile = `${avatarNameArray[avatarNameArray.length - 1]}.${extension}`;
  await resizeAvatar(path);
  await fs.rename(path, `./public/avatars/${newFile}`);
};

module.exports = {
  copyAvatar,
};
