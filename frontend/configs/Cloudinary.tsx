import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

export const cld = new Cloudinary({
  cloud: {
    cloudName: "dekyff0av",
    apiKey: "753435956175985",
  },
  url: {
    secure: true,
  },
});

export const options = {
  upload_preset: "workout-tracker-ai-preset",
  tag: "sample",
  unsigned: true,
};
