let returnVal = [500, {
  success: false,
  message: "Something didn't add up. CDB",
}];

async function create(dbModel, data) {
  if (!dbModel.create) return;
  const newObj = await dbModel.create(data)
      .catch((err) => {
        returnVal = [500, {
          success: false,
          message: err,
        }];
      });
  if (!newObj) return returnVal;

  returnVal = [201, {
    success: true,
    created: newObj,
  }];

  return returnVal;
}

export default create;
