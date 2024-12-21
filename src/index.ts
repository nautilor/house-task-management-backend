import datasource from "@config/init";
import app from "@/app";

datasource
  .initialize()
  .then(() => console.log("Connected to the database"))
  .catch((err: Error) => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
