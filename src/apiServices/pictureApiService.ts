import axios from "axios";
import assert from "assert";
import { Definer } from "../lib/Definer";
import { Picture } from "../types/picture";

class PictureApiService {
  constructor() {}

  public async uploadImageToServer(image: any) {
    try {
      let formData = new FormData();
      formData.append("picture", image);

      // Make a POST request to the backend endpoint for handling file upload
      const response = await axios.post(
        "http://localhost:3000/payment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      assert.ok(response, Definer.general_err1);
      const picture: Picture = response.data;
      localStorage.setItem("picture_data", JSON.stringify(picture));
      return picture;
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle the error, show a message to the user, etc.
    }
  }
}
export default PictureApiService;
