const models = require('../models');

module.exports = {
  index: (req, res) => {
    models.Otoritas.all().then((otoritas) => {
      res.status(200).json({
        message: "Success Read Otoritas",
        data: otoritas
      })
    }).catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong"
      })
    })
  },
  getOtoritasUser: (req, res) => {
    const { id } = req.params
    models.OtoritasUser.all({
      where: {
        user: id
      }
    }).then((otoritasUser) => {
      res.status(200).json({
        message: "Success Read Otoritas User",
        data: otoritasUser
      })
    }).catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong"
      })
    })
  },
  updateOtoritasUser: (req, res) => {
    const { id } = req.params
    const { otoritas } = req.body
    models.OtoritasUser.destroy({
      where: {
        user: id
      }
    }).then((res) => {
      otoritas.forEach((oto) => {
        models.OtoritasUser.create({
          user: id,
          otoritas: oto
        }).then((otoritasUser) => {
          res.status(200).json({
            message: "Success Update Otoritas User",
          })

        }).catch((err) => {
          res.status(500).json({
            message: "Something Went Wrong"
          })

        })
      })
    }).catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong"
      })
    })
  }
};
