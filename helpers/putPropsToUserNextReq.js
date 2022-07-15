const putPropsToUserNextReq = async (reqUserData, props) => {
  try {
    await Object.keys(props).forEach(prop => (reqUserData[prop] = props[prop]));
  } catch (error) {
    throw new Error('cant put props to USER_DATA for next request ');
  }
};

module.exports = putPropsToUserNextReq;
