const models = require('../models')
const Op = require('sequelize').Op
const { caching } = require('../middlewares/redis')

module.exports = {
	all: (req,res) => {
		models.Siswa.all().then(user => {
			caching('Siswa', user)
			res.status(200).json({
				message: 'Success Read Siswa',
				data: user
			})
		}).catch((err) => {
			res.status(500).json({
				message: 'Something Went Wrong'
			})
		})
	},
	find: (req,res) => {
		const { id } = req.params
		models.Siswa.findOne({
			where: {
				id: id
			}
		}).then(siswa => {
			res.status(200).json({
				message: 'Success Read Siswa',
				data: siswa
			})
		}).catch((err) => {
			res.status(500).json({
				message: 'Something Went Wrong'
			})
		})
	},
	search: (req,res) => {
	   const { npm, nama, jk, alamat, no_telp } = req.body
	   const queryPencarian = []
	   if (npm) {
	   	 queryPencarian.push(
	   	 	{ npm:{
	   	 		[Op.eq]: npm
	   		}},
	   	 )
	   }
	   if (nama) {
	   	 queryPencarian.push(
	   	 	{ nama: {
	   	 		[Op.like]: `%{nama}%`
	   	 	}},
	   	 )
	   }
	   if (jk) {
	   	 queryPencarian.push(
	   	    { jk: {
	   	    	[Op.like]: `%{jk}%`
	   	    }},
	   	 )
	   }
	   if (alamat) {
	   	 queryPencarian.push(
	   		{ alamat: {
	   			[Op.like]: `%{alamat}%`
	   		}},
	   	 )
	   }
	   if (no_telp) {
	   	 queryPencarian.push(
	   	 	{ no_telp: {
	   	 		[Op.like]: `%{no_telp}%`
	   	 	}},
	   	 )
	   }
	   models.Siswa.findAll({
	   	  where: {
	   	  	[Op.and]: queryPencarian
	   	  }
	   }).then(siswa => {
		 res.status(200).json({
		 	message: 'Success Search Siswa',
		 	data: siswa
		 })
	   }).catch((err) => {
	   	 res.status(500).json({
	   	 	message: 'Something Went Wrong'
	   	 })
	   })
	},
	index: (req,res) => {
		let { q, page } = req.query
		if (!q) {
			q = ''
		}
		if (!page) {
			page = 1
		}
		let pagination
		let limit = 10
		let offset = 0
		models.Siswa.count({
			where: {
				[Op.or]: [
				  { npm: {
				  	[Op.like]: `%${q}%`
				  }},
				  { nama: {
				  	[Op.like]: `%${q}%`
				  }},
				]
			}
		}).then(count => {
			let pages = Math.ceil(count / limit)
			offset = limit * (page - 1)
			pagination = {
				limit,
				offset,
				pages,
				page
			}
			return pagination
		}).then(pagination => {
			const { limit, offset } =  pagination
			return models.Siswa.all({
			where: {
				[Op.or]: [
				  { npm: {
				  	[Op.like]: `%${q}`
				  }},
				  { nama: {
				  	[Op.like]: `%${q}`
				  }},
				]
			},
			limit,
			offset	
		})
		}).then(data => {
			const { pages } = pagination
			res.status(200).json({
				message: 'Success Read Siswa',
				data: {
					data,
					pages
				}
			})
		}).catch((err) => {
			console.log(err)
			res.status(500).json({
				message: 'Something Went Wrong'
			})
		})
	},
	create: (req,res) => {
		const { npm, nama, jk, alamat, no_telp } = req.body
		models.Siswa.create({
			npm,
			nama,
			jk,
			alamat,
			no_telp
		}).then((siswa) => {
			res.status(201).json({
				message: 'Success Create Siswa',
				data: siswa
			})
		}).catch((err) => {
			if (err.errors[0].message) {
				const message = err.errors[0].message
				res.status(403).json({
					message: message,
				})
			} else {
				res.status(500).json({
					message: 'Something Went Wrong'
				})
			}
		})
	},
	update: (req, res) => {
	  const { id } = req.params
	  const { npm, nama, jk, alamat, no_telp } = req.body
	  models.Siswa.findOne({
	  	where: { id: id }
	  }).then((siswa) => {
	  	if (siswa) {
	  		siswa.update({
	  			npm,
	  			nama,
	  			jk,
	  			alamat,
	  			no_telp
	  		}).then((updatedSiswa) => {
	  			res.status(200).json({
	  				message: 'Success Update Siswa',
	  				data: siswa
	  			})
	  		}).catch((err) => {
	  			if (err.errors[0].message) {
	  				const message = err.errors[0].message
	  				res.status(403).json({
	  					message: message,
	  				})
	  			} else {
	  				res.status(500).json({
	  					message: 'Something Went Wrong',
	  				})
	  			}
	  		})
	  	} else {
	  		res.status(404).json({
	  			message: 'Something Went Wrong',
	  		})
	  	}
	  }).catch((err) => {
	  	if (err.errors[0].message) {
	  		const message = err.errors[0].message
	  		res.status(403).json({
	  			message: message,
	  		})
	  	} else {
	  		res.status(500).json({
	  			message: 'Something Went Wrong'
	  		})
	  	}
	  })
	},
	destroy: (req,res) => {
		const { id } = req.params
		models.Siswa.findOne({
			where: {
				id: id
			}
		}).then((siswa) => {
			siswa.destroy().then(() => {
				res.status(200).json({
					message: 'Success Delete Siswa',
					data: siswa
	    	    })
			}).catch((err) => {
				res.status(500).json({
					message: 'Something Went Wrong',
				})
			})
		}).catch((err) => {
			res.status(500).json({
				message: 'Something Went Wrong'
			})
		})
	}
}