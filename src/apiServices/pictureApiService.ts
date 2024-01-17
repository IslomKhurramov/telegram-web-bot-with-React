import axios from "axios";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { Picture } from "../types/picture";

class PictureApiService {
  constructor() {}

  public async uploadImageToServer(image: any) {
    try {
      console.log("IMAGE", image);
      let formData = new FormData();
      formData.append("picture", image);

      // Make a POST request to the backend endpoint for handling file upload
      const result = await axios(`http://localhost:3000/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response data:", result); // Add this line for debugging

      assert.ok(result?.data, Definer.general_err1);
      const picture: string = result.data.data;
      return picture;
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle the error, show a message to the user, etc.
    }
  }
}
export default PictureApiService;
