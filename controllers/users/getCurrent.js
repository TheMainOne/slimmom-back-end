const getCurrent = async (req, res) => {
  const { email, name, userData, token } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name,
        email,
        userData,
      },
    },
  });
};

module.exports = getCurrent;
