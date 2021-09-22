let returnVal = [500, {
  success: false,
  message: "Something didn't add up. PDB",
}];

async function patch(dbModel, data, _id) {
  if (!dbModel.findByIdAndUpdate) return;
  const dbObject = await dbModel.findByIdAndUpdate({
    _id,
  }, data)
      .catch((err) => {
        returnVal = [500, {
          success: false,
          message: err,
        }];
      });
  if (!dbObject) return returnVal;

  returnVal = [201, {
    success: true,
    created: dbObject,
  }];

  return returnVal;
}

export default patch;
