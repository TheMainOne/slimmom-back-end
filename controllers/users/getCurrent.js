const getCurrent = async (req, res) => {
  const { email, name, userData } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        userData,
      },
    },
  });
};

module.exports = getCurrent;
