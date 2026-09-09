// const app = require("./src/app");
const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`DesignJudge server running on port ${PORT}`);
});
//    // "test": "echo \"Error: no test specified\" && exit 1",
