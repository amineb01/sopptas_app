var Point = require("../models/Point");

var { setPoint, findByZoneId } = require("../middlewares/points");
var { verifyToken, isCollaboratorToken } = require("../middlewares/token");

const pointController = (express) => {
  const router = express.Router();

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log(
      "Time to access points route: ",
      new Date().toLocaleDateString("en-US")
    );
    next();
  });

  router.post(
    "/",
    function (req, res, next) {
      verifyToken(req, res, next)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      setPoint(req)
        .then((result) => {
          return res.status(200).json({
            result: result,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  router.get(
    "/by_zone/:zoneId",
    function (req, res, next) {
      verifyToken(req, res, next)
        .then((decodedToken) => {
          req.headers.id = decodedToken.id;
          req.headers.role = decodedToken.role;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      isCollaboratorToken(req, res)
        .then((result) => {
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: error,
            error: "invalid token",
          });
        })
        .done();
    },

    function (req, res, next) {
      findByZoneId(req)
        .then((points) => {
          return res.status(200).json({
            points: points,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "An error has occured",
            error: error,
          });
        })
        .done();
    }
  );

  return router;
};

module.exports = pointController;
