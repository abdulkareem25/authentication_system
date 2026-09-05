const dashboardController = (req, res) => {
  res.json({
    success: true,
    message: "Protected dashboard",
    user: req.user,
  });
}

export default dashboardController;