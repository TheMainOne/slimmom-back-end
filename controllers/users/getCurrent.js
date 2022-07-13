const getCurrent = async (req, res) => {
  const { email, name, token, userData } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        token,
        userData,
      },
    },
  });
};

module.exports = getCurrent;
