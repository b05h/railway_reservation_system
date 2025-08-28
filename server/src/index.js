import createApp from "./app.js";
import config from "./utils/config.js";

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
