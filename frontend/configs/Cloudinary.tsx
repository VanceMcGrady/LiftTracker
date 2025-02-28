import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
  },
  url: {
    secure: true,
  },
});

export const options = {
  uploadPreset: "workout-traker-ai",
  tag: "sample",
  unsigned: true,
};
