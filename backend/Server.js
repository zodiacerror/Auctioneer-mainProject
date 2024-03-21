const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const multer = require('multer')
const moment = require('moment')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

const db =
   'mongodb+srv://anjanaks225:anjanaks225@cluster0.xveocpb.mongodb.net/dbAuctioneer'

const httpServer = createServer(app)
const io = new Server(httpServer, {
   cors: {
      origin: 'http://localhost:3000',
   },
})

httpServer.listen(port, async () => {
   console.log('server is Running')
   try {
      await mongoose.connect(db)
      console.log('DB connection established')
   } catch (err) {
      console.error(err.message)
      process.exit(1)
   }
})

const PATH = './public/images'
const upload = multer({
   storage: multer.diskStorage({
      destination: PATH,
      filename: function (req, file, cb) {
         let origialname = file.originalname
         let ext = origialname.split('.').pop()
         let filename = origialname.split('.').slice(0, -1).join('.')
         cb(null, filename + '.' + ext)
      },
   }),
})

//Admin Schema

const adminSchemaStucture = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
})

const Admin = mongoose.model('adminSchema', adminSchemaStucture)

// Admin Insert

app.post('/Admin', async (req, res) => {
   try {
      const { name, email, password } = req.body
      // let admin = await Admin.findOne({ email })

      // if (admin) {
      //     return res
      //         .status(400)
      //         .json({ errors: [{ msg: 'Admin already exists' }] })
      // }

      let admin = new Admin({
         name,
         email,
         password,
      })

      await admin.save()

      res.json({ message: 'Admin inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

// select Admin

app.get('/Admin', async (req, res) => {
   const admin = await Admin.find()
   res.send({ admin })
})

//Delete Admin

app.delete('/Admin/:id', async (req, res) => {
   try {
      const Id = req.params.id
      console.log(Id)

      const deletedAdmin = await Admin.findByIdAndDelete(Id)

      if (!deletedAdmin) {
         return res.status(404).json({ message: 'Admin not found' })
      }

      res.json({ message: 'Admin deleted successfully', deletedAdmin })
   } catch (err) {
      console.error('Error deleting Admin:', err)
      res.status(500).json({ message: 'Internal server error' })
   }
})

//Admin update

app.put('/updateAdmin/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { name, email, password } = req.body
      const updatedAdmin = await Admin.findByIdAndUpdate(
         id,
         { name, email, password },
         { new: true }
      )
      res.json(updatedAdmin)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//User Schema

const userSchemastructure = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   email: {
      type: String,
      require: true,
   },
   password: {
      type: String,
      require: true,
   },
   photo: {
      type: String,
      require: true,
   },
   contact: {
      type: String,
      require: true,
   },
   proof: {
      type: String,
      require: true,
   },
   status: {
      type: String,
      require: true,
   },
   placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'districtSchema',
      required: true,
   },
})
// Insert User
const User = mongoose.model('userSchema', userSchemastructure)

app.post(
   '/User',
   upload.fields([
      { name: 'Photo', maxCount: 1 },
      { name: 'Proof', maxCount: 1 },
   ]),
   async (req, res) => {
      const { Name, Email, Password, Contact, Place } = req.body
      try {
         // let admin = await User.findOne({ email })

         // if (user) {
         //     return res
         //         .status(400)
         //         .json({ errors: [{ msg: 'User already exists' }] })
         // }
         // if (!req.files || !req.files['photo'] || !req.files['proof']) {
         //    return res.status(400).json({
         //       errors: [{ msg: 'Photo and proof files are required' }],
         //    })
         // }

         var fileValue = JSON.parse(JSON.stringify(req.files))
         var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.Photo[0].filename}`
         var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.Proof[0].filename}`

         let user = new User({
            name: Name,
            email: Email,
            password: Password,
            photo: profileimgsrc,
            contact: Contact,
            proof: proofimgsrc,
            placeId: Place,
         })

         await user.save()

         res.json({ message: 'user inserted successfully' })
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server error')
      }
   }
)

// select User

app.get('/User', async (req, res) => {
   const user = await User.find()
   res.send({ user })
})

// select User

app.get('/User/:Id', async (req, res) => {
   const Id = req.params.Id
   const user = await User.findOne({ _id: Id })
   res.send({ user })
})

//Delete User

app.delete('/User/:id', async (req, res) => {
   try {
      const Id = req.params.id
      console.log(Id)

      const deletedUser = await User.findByIdAndDelete(Id)

      if (!deletedUser) {
         return res.status(404).json({ message: 'User not found' })
      }

      res.json({ message: 'User deleted successfully', deletedUser })
   } catch (err) {
      console.error('Error deleting User:', err)
      res.status(500).json({ message: 'Internal server error' })
   }
})

//User update

app.put('/updateUser/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { name, email, contact } = req.body
      const updatedUser = await User.findByIdAndUpdate(
         id,
         {
            name,
            email,
            contact,
         },
         { new: true }
      )
      res.json(updatedUser)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

app.put('/updateChangePasswordUser/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { password } = req.body
      const updatedUser = await User.findByIdAndUpdate(
         id,
         {
            password
         },
         { new: true }
      )
      res.json(updatedUser)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Dealer Schema

const dealerSchemastructure = new mongoose.Schema({
   Name: {
      type: String,
      require: true,
   },
   Email: {
      type: String,
      require: true,
   },
   Password: {
      type: String,
      require: true,
   },
   Contact: {
      type: String,
      require: true,
   },
   proofimgsrc: {
      type: String,
      require: true,
   },
   profileimgsrc: {
      type: String,
      require: true,
   },
   status: {
      type: String,
   },
})

//Insert Dealer

const Dealer = mongoose.model('dealerSchema', dealerSchemastructure)

app.post(
   '/Dealer',
   upload.fields([
      { name: 'Photo', maxCount: 1 },
      { name: 'Proof', maxCount: 1 },
   ]),
   async (req, res) => {
      const { Name, Email, Password, Contact } = req.body
      try {
         // let dealer = await Dealer.findOne({ email })

         // if (dealer) {
         //     return res
         //         .status(400)
         //         .json({ errors: [{ msg: 'dealer already exists' }] })
         // }

         var fileValue = JSON.parse(JSON.stringify(req.files))
         var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.Photo[0].filename}`
         var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.Proof[0].filename}`

         let dealer = new Dealer({
            Name,
            Email,
            Password,
            profileimgsrc,
            Contact,
            proofimgsrc,
         })

         await dealer.save()

         res.json({ message: 'dealer inserted successfully' })
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server error')
      }
   }
)

// select Dealer

app.get('/Dealer/:Id', async (req, res) => {
   const Id = req.params.Id
   const dealer = await Dealer.findOne({ _id: Id })
   res.send({ dealer })
})

//Delete Dealer

app.delete('/Dealer/:id', async (req, res) => {
   try {
      const Id = req.params.id
      console.log(Id)

      const deletedDealer = await Dealer.findByIdAndDelete(Id)

      if (!deletedDealer) {
         return res.status(404).json({ message: 'Dealer not found' })
      }

      res.json({ message: 'Dealer deleted successfully', deletedDealer })
   } catch (err) {
      console.error('Error deleting Dealer:', err)
      res.status(500).json({ message: 'Internal server error' })
   }
})

//Dealer update

app.put('/updateDealer/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { Name, Email, Contact } = req.body
      const updatedDealer = await Dealer.findByIdAndUpdate(
         id,
         {
            Name,
            Email,
            Contact,
         },
         { new: true }
      )
      res.json(updatedDealer)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

app.put('/updateChangePasswordDealer/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { Password } = req.body
      const updatedDealer = await Dealer.findByIdAndUpdate(
         id,
         {
            Password
         },
         { new: true }
      )
      res.json(updatedDealer)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Lot Schema

const lotSchemastructure = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   price: {
      type: String,
      require: true,
   },
   datetime: {
      type: String,
      require: true,
   },
   details: {
      type: String,
      require: true,
   },
   dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dealerSchema',
      required: true,
   },
})

const Lot = mongoose.model('lotSchema', lotSchemastructure)

//Gallery Schema

const gallerySchemastructure = new mongoose.Schema({
   lotImgsrc: {
      type: String,
      require: true,
   },
   lotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lotSchema',
      required: true,
   },
   Type: {
      type: String,
      require: true,
   },
})

const Gallery = mongoose.model('gallerySchema', gallerySchemastructure)

app.post(
   '/Lot',
   upload.fields([{ name: 'productImg', maxCount: 10 }]),
   async (req, res) => {
      try {
         const datetime = moment().format()

         const { name, price, dealerId, details } = req.body
         let lot = new Lot({
            name,
            price,
            dealerId,
            datetime,
            details,
         })

         const lotData = await lot.save()

         const files = req.files['productImg'] // Get the array of files

         // Process each file
         for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const isImage = file.mimetype.startsWith('image')
            const isVideo = file.mimetype.startsWith('video')

            // Determine the type of file
            let Type = 'other'
            if (isImage) {
               Type = 'image'
            } else if (isVideo) {
               Type = 'video'
            }

            const fileUrl = `http://127.0.0.1:${port}/images/${file.filename}`

            // Save each post individually
            const gallery = new Gallery({
               lotId: lotData._id,
               lotImgsrc: fileUrl,
               Type, // Save post type along with the file
            })
            await gallery.save()
         }

         res.json({ message: 'lot inserted successfully' })
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server error')
      }
   }
)
// select Lot

app.get('/LotVerification', async (req, res) => {
   console.log('hi')
   const lot = await Lot.find({ __v: 0 })
   res.send({ lot })
})

app.get('/Lot/:Did', async (req, res) => {
   const Did = req.params.Did
   const lot = await Lot.find({ dealerId: Did })
   res.send({ lot })
})

app.get('/lots', async (req, res) => {
   try {
      const lots = await Gallery.aggregate([
         {
            $lookup: {
               from: 'lotschemas', // Collection name of Lot model
               localField: 'lotId',
               foreignField: '_id',
               as: 'lot',
            },
         },
         {
            $unwind: '$lot', // Deconstructs the lot array created by $lookup
         },
         {
            $lookup: {
               from: 'dealerschemas', // Collection name of Dealer model
               localField: 'lot.dealerId',
               foreignField: '_id',
               as: 'dealer',
            },
         },
         {
            $unwind: '$dealer', // Deconstructs the dealer array created by $lookup
         },
         {
            $group: {
               _id: '$lotId', // Group galleries by their own _id
               lot: { $first: '$lot' }, // Take the first lot object in each group
               dealer: { $first: '$dealer' }, // Take the first dealer object in each group
               galleries: { $push: '$$ROOT' }, // Push all galleries in the group into an array
            },
         },
         {
            $project: {
               _id: '$lot._id',
               name: '$lot.name',
               price: '$lot.price',
               minprice: '$lot.minprice',
               quantity: '$lot.quantity',
               datetime: '$lot.datetime',
               dealerId: '$lot.dealerId',
               dealer: {
                  _id: '$dealer._id',
                  Name: '$dealer.Name',
                  Email: '$dealer.Email',
                  Contact: '$dealer.Contact',
                  proofimgsrc: '$dealer.proofimgsrc',
                  profileimgsrc: '$dealer.profileimgsrc',
                  status: '$dealer.status',
               },
               galleries: {
                  $map: {
                     input: '$galleries',
                     as: 'gallery',
                     in: {
                        _id: '$$gallery._id',
                        lotId: '$$gallery.lotId',
                        lotImgsrc: '$$gallery.lotImgsrc',
                        Type: '$$gallery.Type',
                     },
                  },
               },
            },
         },
      ])

      console.log({ lots })

      if (!lots || lots.length === 0) {
         return res.json({ lots: 'no data' })
      } else {
         res.status(200).json({ lots })
      }
   } catch (err) {
      console.error('Error', err)
      res.status(500).json({ msg: 'Server Error' })
   }
})

//Lot update

app.put('/updateLot/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { name, price, minprice, antique, quantity, datetime } = req.body
      const updatedLot = await Lot.findByIdAndUpdate(
         id,
         {
            name,
            price,
            minprice,
            antique,
            quantity,
            datetime,
         },
         { new: true }
      )
      res.json(updatedLot)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Lot update

app.put('/acceptLot/:id', async (req, res) => {
   const id = req.params.id
   try {
      let lot = await Lot.findOne({ _id: id })
      lot.__v = 1
      const updatedLot = await Lot.findByIdAndUpdate(id, lot, { new: true })
      res.json(updatedLot)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Lot update

app.put('/rejectLot/:id', async (req, res) => {
   const id = req.params.id
   try {
      let lot = await Lot.findOne({ _id: id })
      lot.__v = 2
      const updatedLot = await Lot.findByIdAndUpdate(id, lot, { new: true })
      res.json(updatedLot)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//AuctionHead Schema

app.put('/ChangeLot/:id', async (req, res) => {
   const id = req.params.id;
   console.log(id);
   try {
      const updatedAuctionhead = await Auctionhead.findByIdAndUpdate(id, { __v: 2 }, { new: true });
      console.log(updatedAuctionhead);
      res.json(updatedAuctionhead);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
   }
});


const auctionheadSchemastructure = new mongoose.Schema({
   token: {
      type: String,
   },
   date: {
      type: String,
      require: true,
   },
   price: {
      type: String,
      require: true,
   },
   lotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lotSchema',
      required: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
   },
})

//Insert AuctionHead

const Auctionhead = mongoose.model(
   'auctionheadSchema',
   auctionheadSchemastructure
)

app.post('/Auctionhead', async (req, res) => {
   try {
      const { Id } = req.body

      // Find the latest assigned day
      const latestAssignedDay = await Auctionhead.findOne({
         date: { $gte: moment().startOf('day').toDate() }
      })
         .sort({ date: -1 }) // Sort by date in descending order to get the latest date
         .select('date')

      // If no records found, set the latest assigned day to tomorrow
      let dateToAssign = latestAssignedDay
         ? moment(latestAssignedDay.date)
         : moment().add(1, 'day')

      // Check if latestAssignedDay is today
      if (
         latestAssignedDay &&
         latestAssignedDay.date === moment().startOf('day').format('YYYY-MM-DD')
      ) {
         dateToAssign.add(1, 'day')
      }

      let lotCount = await Auctionhead.countDocuments({
         date: dateToAssign.format('YYYY-MM-DD'),
      })

      // Add a day to the latest assigned day
      if (lotCount === 10) {
         dateToAssign.add(1, 'day')
         lotCount = await Auctionhead.countDocuments({
            date: dateToAssign.format('YYYY-MM-DD'),
         })
      }

      // If the day to assign is Sunday, move to the next day
      if (dateToAssign.day() === 0) {
         dateToAssign.add(1, 'day')
      }

      // Create a new Auctionhead document with the chosen date
      const auctionhead = new Auctionhead({
         lotId: Id,
         date: dateToAssign.format('YYYY-MM-DD'),
         token: lotCount,
      })

      // Save the Auctionhead document
      await auctionhead.save()

      res.json({ message: 'Auctionhead inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

app.get('/AuctionheadWon/:Id', async (req, res) => {
   const Id = new mongoose.Types.ObjectId(req.params.Id)

   const auctionhead = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date
      {
         $match: {
            userId: Id,
         },
      },
      // Stage 2: Lookup auctionheads for each lot
      {
         $lookup: {
            from: 'lotschemas',
            localField: 'lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'dealerschemas',
            localField: 'lot.dealerId',
            foreignField: '_id',
            as: 'dealer',
         },
      },
      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$dealer',
      },

      // // // Stage 4: Lookup galleries for each lot
      {
         $lookup: {
            from: 'galleryschemas',
            localField: 'lot._id',
            foreignField: 'lotId',
            as: 'galleries',
         },
      },
      // // Stage 5: Unwind the galleries array
      {
         $unwind: '$galleries',
      },
      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            details: { $first: '$lot.details' },
            dealerId: { $first: '$dealer._id' },
            dealerName: { $first: '$dealer.Name' },
            dealerProfile: { $first: '$dealer.profileimgsrc' },
            auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
            auctionheadDate: { $first: '$date' }, // Include the auctionhead date
            auctionheadStatus: { $first: '$__v' }, // Include the auctionhead date
            auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            galleries: { $push: '$galleries' },
         },
      },
   ])
   console.log(auctionhead)
   res.send({ auctionhead })
})

// select Auction Head

app.get('/Auctionhead', async (req, res) => {
   const currentDate = moment().startOf('day') // Get the current date at the start of the day

   const auctionhead = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date
      {
         $match: {
            date: { $gt: currentDate.format('YYYY-MM-DD') },
         },
      },
      // Stage 2: Lookup auctionheads for each lot
      {
         $lookup: {
            from: 'lotschemas',
            localField: 'lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'dealerschemas',
            localField: 'lot.dealerId',
            foreignField: '_id',
            as: 'dealer',
         },
      },
      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$dealer',
      },

      // // // Stage 4: Lookup galleries for each lot
      {
         $lookup: {
            from: 'galleryschemas',
            localField: 'lot._id',
            foreignField: 'lotId',
            as: 'galleries',
         },
      },
      // // Stage 5: Unwind the galleries array
      {
         $unwind: '$galleries',
      },
      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            minprice: { $first: '$lot.minprice' },
            details: { $first: '$lot.details' },
            dealerId: { $first: '$dealer._id' },
            dealerName: { $first: '$dealer.Name' },
            dealerProfile: { $first: '$dealer.profileimgsrc' },
            auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
            auctionheadDate: { $first: '$date' }, // Include the auctionhead date
            auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            galleries: { $push: '$galleries' },
         },
      },
   ])
   console.log(auctionhead)
   res.send({ auctionhead })
})



app.get('/AuctionheadWonTotal/:uId/:Id', async (req, res) => {
   const uId = new mongoose.Types.ObjectId(req.params.uId)
   const Id = new mongoose.Types.ObjectId(req.params.Id)
   const currentDate = moment().startOf('day') // Get the current date at the start of the day

   const auctionhead = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date
      {
         $match: {
            userId: uId,
         },
      },
      {
         $match: {
            _id: Id,
         },
      },
      {
         $match: {
            date: currentDate.format('YYYY-MM-DD'),
         },
      },
      // Stage 2: Lookup auctionheads for each lot

      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            totalPrice: { $sum: { $toInt: "$price" } } // Assuming price is stored as string, converting to integer for summation
         },
      },
   ])
   console.log(auctionhead)
   res.send({ auctionhead: auctionhead[0] })
})
// select Auction Head

app.get('/AuctionheadCurrentDate', async (req, res) => {
   const currentDate = moment().startOf('day') // Get the current date at the start of the day
   try {
      const auctionhead = await Auctionhead.aggregate([
         // Stage 1: Match lots with the current date
         {
            $match: {
               date: currentDate.format('YYYY-MM-DD'),
            },
         },
         {
            $match: {
               __v: 0,
            },
         },
         // Stage 2: Lookup auctionheads for each lot
         {
            $lookup: {
               from: 'lotschemas',
               localField: 'lotId',
               foreignField: '_id',
               as: 'lot',
            },
         },
         // // Stage 3: Filter lots with associated auctionheads

         // // Stage 4: Lookup galleries for each lot
         {
            $lookup: {
               from: 'galleryschemas',
               localField: 'lot._id',
               foreignField: 'lotId',
               as: 'galleries',
            },
         },
         // // Stage 5: Unwind the galleries array
         {
            $unwind: '$galleries',
         },
         // // Stage 6: Group by lotId to reconstruct the galleries array
         {
            $group: {
               _id: '$_id',
               name: { $first: '$lot.name' },
               price: { $first: '$lot.price' },
               datetime: { $first: '$lot.datetime' },
               auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
               auctionheadDate: { $first: '$date' }, // Include the auctionhead date
               auctionheadToken: { $first: '$token' }, // Include the auctionhead date
               galleries: { $push: '$galleries' },
            },
         },
         // Stage 7: Sort documents in ascending order based on a field
         {
            $sort: { datetime: 1 }, // Assuming you want to sort by datetime field in ascending order
         },

         // Stage 8: Skip the first document
         {
            $skip: 1,
         },
      ])
      if (auctionhead.length !== 0) {
         res.send({ auctionhead })
      } else {
         res.send({ auctionhead: null })
      }
   } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
   }
})

app.get('/SingleAuctionheadCurrentDate/:Id', async (req, res) => {
   const Id = new mongoose.Types.ObjectId(req.params.Id)
   const currentDate = moment().startOf('day') // Get the current date at the start of the day
   try {
      const auctionhead = await Auctionhead.aggregate([
         // Stage 1: Match lots with the current date
         {
            $match: {
               date: currentDate.format('YYYY-MM-DD'),
            },
         },
         {
            $match: {
               __v: 0,
            },
         },
         // Stage 2: Lookup auctionheads for each lot
         {
            $lookup: {
               from: 'lotschemas',
               localField: 'lotId',
               foreignField: '_id',
               as: 'lot',
            },
         },
         // // Stage 3: Filter lots with associated auctionheads

         // // Stage 4: Lookup galleries for each lot
         {
            $lookup: {
               from: 'galleryschemas',
               localField: 'lot._id',
               foreignField: 'lotId',
               as: 'galleries',
            },
         },
         // // Stage 5: Unwind the galleries array
         {
            $unwind: '$galleries',
         },
         // // Stage 6: Group by lotId to reconstruct the galleries array
         {
            $group: {
               _id: '$_id',
               name: { $first: '$lot.name' },
               price: { $first: '$lot.price' },
               datetime: { $first: '$lot.datetime' },
               auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
               auctionheadDate: { $first: '$date' }, // Include the auctionhead date
               auctionheadToken: { $first: '$token' }, // Include the auctionhead date
               galleries: { $push: '$galleries' },
            },
         },
         {
            $sort: { datetime: 1 },
         },

         // Stage 8: Limit to only one result
         {
            $limit: 1,
         },
      ])

      const auctionheadWondata = await Auctionhead.aggregate([
         // Stage 1: Match lots with the current date
         {
            $match: {
               userId: Id,
            },
         },
         {
            $match: {
               date: currentDate.format('YYYY-MM-DD'),
            },
         },
         // Stage 2: Lookup auctionheads for each lot
         {
            $lookup: {
               from: 'lotschemas',
               localField: 'lotId',
               foreignField: '_id',
               as: 'lot',
            },
         },
         // // Stage 3: Filter lots with associated auctionheads
         {
            $unwind: '$lot',
         },

         {
            $lookup: {
               from: 'dealerschemas',
               localField: 'lot.dealerId',
               foreignField: '_id',
               as: 'dealer',
            },
         },
         // // // Stage 3: Filter lots with associated auctionheads
         {
            $unwind: '$dealer',
         },


         // // Stage 6: Group by lotId to reconstruct the galleries array
         {
            $group: {
               _id: '$_id',
               name: { $first: '$lot.name' },
               price: { $first: '$lot.price' },
               details: { $first: '$lot.details' },
               dealerId: { $first: '$dealer._id' },
               dealerName: { $first: '$dealer.Name' },
               dealerProfile: { $first: '$dealer.profileimgsrc' },
               auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
               auctionheadDate: { $first: '$date' }, // Include the auctionhead date
               auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            },
         },
      ])
      let check;
      check = auctionheadWondata.length ? true : false
      if (auctionhead.length !== 0) {
         res.send({ auctionhead: auctionhead[0], auctionheadWondata: check })
      } else {
         res.send({ auctionhead: null, auctionheadWondata: check })
      }
   } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
   }
})



app.get('/AuctionheadForHome', async (req, res) => {
   const currentDate = moment().startOf('day') // Get the current date at the start of the day

   const auctionhead = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date
      {
         $match: {
            date: { $gt: currentDate.format('YYYY-MM-DD') },
         },
      },
      {
         $match: {
            __v: 0
         }
      },

      // Stage 2: Lookup auctionheads for each lot
      {
         $lookup: {
            from: 'lotschemas',
            localField: 'lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'dealerschemas',
            localField: 'lot.dealerId',
            foreignField: '_id',
            as: 'dealer',
         },
      },
      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$dealer',
      },

      // // // Stage 4: Lookup galleries for each lot
      {
         $lookup: {
            from: 'galleryschemas',
            localField: 'lot._id',
            foreignField: 'lotId',
            as: 'galleries',
         },
      },
      // // Stage 5: Unwind the galleries array
      {
         $unwind: '$galleries',
      },


      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            minprice: { $first: '$lot.minprice' },
            details: { $first: '$lot.details' },
            dealerId: { $first: '$dealer._id' },
            dealerName: { $first: '$dealer.Name' },
            dealerProfile: { $first: '$dealer.profileimgsrc' },
            auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
            auctionheadDate: { $first: '$date' }, // Include the auctionhead date
            auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            galleries: { $push: '$galleries' },
         },
      },
   ])
   console.log(auctionhead)
   res.send({ auctionhead })
})


app.get('/AuctionheadCurrentDateForHome', async (req, res) => {
   const currentDate = moment().startOf('day') // Get the current date at the start of the day
   try {
      const auctionhead = await Auctionhead.aggregate([
         // Stage 1: Match lots with the current date
         {
            $match: {
               date: currentDate.format('YYYY-MM-DD'),
            },
         },
         {
            $match: {
               __v: 0,
            },
         },
         // Stage 2: Lookup auctionheads for each lot
         {
            $lookup: {
               from: 'lotschemas',
               localField: 'lotId',
               foreignField: '_id',
               as: 'lot',
            },
         },
         // // Stage 3: Filter lots with associated auctionheads

         // // Stage 4: Lookup galleries for each lot
         {
            $lookup: {
               from: 'galleryschemas',
               localField: 'lot._id',
               foreignField: 'lotId',
               as: 'galleries',
            },
         },
         // // Stage 5: Unwind the galleries array
         {
            $unwind: '$galleries',
         },
         // // Stage 6: Group by lotId to reconstruct the galleries array
         {
            $group: {
               _id: '$_id',
               name: { $first: '$lot.name' },
               price: { $first: '$lot.price' },
               datetime: { $first: '$lot.datetime' },
               auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
               auctionheadDate: { $first: '$date' }, // Include the auctionhead date
               auctionheadToken: { $first: '$token' }, // Include the auctionhead date
               galleries: { $push: '$galleries' },
            },
         },

         // Stage 7: Sort documents in ascending order based on a field
         {
            $sort: { datetime: 1 }, // Assuming you want to sort by datetime field in ascending order
         },


      ])
      if (auctionhead.length !== 0) {
         res.send({ auctionhead })
      } else {
         res.send({ auctionhead: null })
      }
   } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
   }
})


app.get('AuctionPrice', async (req, res) => {
   try {
      const largestPrice = await Auctionbody.find({ auctionheadId: Id })
         .sort({ lotauctionbodyprice: -1 }) // Sort in descending order to get the highest price first
         .limit(1) // Limit the result to 1 document
   } catch (error) { }
})
//Auction head update

app.put('/updateAuctionhead/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { price, token, date } = req.body
      const updatedAuctionhead = await Auctionhead.findByIdAndUpdate(
         id,
         {
            price,
            token,
            date,
         },
         { new: true }
      )
      res.json(updatedAuctionhead)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Category Schema

const categorySchemastructure = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
})

//Insert category

const Category = mongoose.model('categorySchema', categorySchemastructure)

app.post('/Category', async (req, res) => {
   const { name } = req.body
   try {
      let category = new Category({
         name,
      })

      await category.save()

      res.json({ message: 'category inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})
// select Category

app.get('/Category', async (req, res) => {
   const category = await Category.find()
   res.send({ category })
})

//Delete Category

app.delete('/Category/:id', async (req, res) => {
   try {
      const Id = req.params.id
      console.log(Id)

      const deletedCategory = await Category.findByIdAndDelete(Id)

      if (!deletedCategory) {
         return res.status(404).json({ message: 'Category not found' })
      }

      res.json({ message: 'Category deleted successfully', deletedCategory })
   } catch (err) {
      console.error('Error deleting Category:', err)
      res.status(500).json({ message: 'Internal server error' })
   }
})

//AuctionBody Schema

const auctionbodySchemastructure = new mongoose.Schema({
   lotauctionbodyprice: {
      type: Number,
      require: true,
   },
   auctionheadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'auctionheadSchema',
      required: true,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userSchema',
      required: true,
   },
})

//Insert Auction Body

const Auctionbody = mongoose.model(
   'auctionbodySchema',
   auctionbodySchemastructure
)
app.post('/Auctionbody', async (req, res) => {
   const { lotauctionbodyprice } = req.body
   try {
      let auctionbody = new Auctionbody({
         lotauctionbodyprice,
      })

      await auctionbody.save()

      res.json({ message: 'auctionbody inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})
// select Auction Body

app.get('/Auctionbody', async (req, res) => {
   const auctionbody = await Auctionbody.find()
   res.send({ auctionbody })
})

//Feedback Schema

const feedbackSchemastructure = new mongoose.Schema({
   content: {
      type: String,
      require: true,
   },
})

//Insert Feedback

const Feedback = mongoose.model('feedbackSchema', feedbackSchemastructure)
app.post('/Feedback', async (req, res) => {
   const { content } = req.body
   try {
      let feedback = new Feedback({
         content,
      })

      await feedback.save()

      res.json({ message: 'feedback inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

// select Feedback

app.get('/Feedback', async (req, res) => {
   const feedback = await Feedback.find()
   res.send({ feedback })
})

//Feesback update

app.put('/updateFeedback/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { content } = req.body
      const updatedFeedback = await Feedback.findByIdAndUpdate(
         id,
         {
            content,
         },
         { new: true }
      )
      res.json(updatedFeedback)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//Complaint Schema

const complaintSchemastructure = new mongoose.Schema({
   content: {
      type: String,
      require: true,
   },
   replay: {
      type: String,
      require: true,
   },
})

//Insert Complaint

const Complaint = mongoose.model('complaintSchema', complaintSchemastructure)
app.post('/Complaint', async (req, res) => {
   const { content, replay } = req.body
   try {
      let complaint = new Complaint({
         content,
         replay,
      })

      await complaint.save()

      res.json({ message: 'complaint inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

// select Complaint

app.get('/Complaint', async (req, res) => {
   const complaint = await Complaint.find()
   res.send({ complaint })
})

//Complaint update

app.put('/updateComplaint/:id', async (req, res) => {
   const id = req.params.id
   try {
      const { content, replay } = req.body
      const updatedComplaint = await Complaint.findByIdAndUpdate(
         id,
         {
            content,
            replay,
         },
         { new: true }
      )
      res.json(updatedComplaint)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
   }
})

//State Schema

const stateSchemastructure = new mongoose.Schema({
   stateName: {
      type: String,
      require: true,
   },
})

//Insert State

const State = mongoose.model('stateSchema', stateSchemastructure)
app.post('/State', async (req, res) => {
   const { stateName } = req.body
   try {
      let state = new State({
         stateName,
      })

      await state.save()

      res.json({ message: 'state inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})
// select State

app.get('/State', async (req, res) => {
   const state = await State.find()
   res.send({ state })
})

//District Schema

const districtSchemastructure = new mongoose.Schema({
   districtName: {
      type: String,
      require: true,
   },
   stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'stateSchema',
      required: true,
   },
})

//Insert District

const District = mongoose.model('districtSchema', districtSchemastructure)
app.post('/District', async (req, res) => {
   const { districtName, stateId } = req.body
   try {
      let district = new District({
         districtName,
         stateId,
      })

      await district.save()

      res.json({ message: 'district inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

// select District

app.get('/District/:Id', async (req, res) => {
   const Id = req.params.Id
   const district = await District.find({ stateId: Id })
   res.send({ district })
})

//Place Schema

const placeSchemastructure = new mongoose.Schema({
   placeName: {
      type: String,
      require: true,
   },
   districtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'districtSchema',
      required: true,
   },
})

//Insert place

const Place = mongoose.model('placeSchema', placeSchemastructure)
app.post('/Place', async (req, res) => {
   const { placeName, districtId } = req.body
   try {
      let place = new Place({
         placeName,
         districtId,
      })

      await place.save()

      res.json({ message: 'place inserted successfully' })
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
})

// select Place

app.get('/Place', async (req, res) => {
   const place = await Place.find()
   res.send({ place })
})

// select Place

app.get('/Place/:Id', async (req, res) => {
   const Id = req.params.Id
   const place = await Place.find({ districtId: Id })
   res.send({ place })
})

app.post('/Login', async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      const dealer = await Dealer.findOne({ Email: email })
      const admin = await Admin.findOne({ email })

      if (!user && !dealer && !admin) {
         return res.status(400).json({ error: 'Invalid credential' })
      }
      if (user) {
         res.send({
            id: user._id,
            login: 'user',
         })
      } else if (dealer) {
         res.send({
            id: dealer._id,
            login: 'dealer',
         })
      } else if (admin) {
         res.send({
            id: admin._id,
            login: 'admin',
         })
      } else {
         console.log('hey ')
      }
   } catch (error) { }
})




app.get('/AuctionDealerData/:DId', async (req, res) => {
   const dealerId = new mongoose.Types.ObjectId(req.params.DId); // Convert dealer ID to ObjectId

   const auctionhead = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date

      // Stage 2: Lookup auctionheads for each lot
      {
         $lookup: {
            from: 'lotschemas',
            localField: 'lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      {
         $match: {
            'lot.dealerId': dealerId
         }
      },
      // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'dealerschemas',
            localField: 'lot.dealerId',
            foreignField: '_id',
            as: 'dealer',
         },
      },

      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$dealer',
      },

      // // // Stage 4: Lookup galleries for each lot
      {
         $lookup: {
            from: 'galleryschemas',
            localField: 'lot._id',
            foreignField: 'lotId',
            as: 'galleries',
         },
      },
      // // Stage 5: Unwind the galleries array
      {
         $unwind: '$galleries',
      },
      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            minprice: { $first: '$lot.minprice' },
            details: { $first: '$lot.details' },
            dealerId: { $first: '$dealer._id' },
            dealerName: { $first: '$dealer.Name' },
            dealerProfile: { $first: '$dealer.profileimgsrc' },
            auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
            auctionheadDate: { $first: '$date' }, // Include the auctionhead date
            auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            galleries: { $push: '$galleries' },
         },
      },
   ])
   console.log(auctionhead)
   res.send({ auctionhead })
})

//Report of Auction by date
app.get('/DailyReportData', async (req, res) => {

   const dailyreport = await Auctionhead.aggregate([
      // Stage 1: Match lots with the current date

      // Stage 2: Lookup auctionheads for each lot
      {
         $match: {
            __v: 2
         }
      },
      {
         $lookup: {
            from: 'lotschemas',
            localField: 'lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'dealerschemas',
            localField: 'lot.dealerId',
            foreignField: '_id',
            as: 'dealer',
         },
      },

      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$dealer',
      },

      // // // Stage 4: Lookup galleries for each lot
      {
         $lookup: {
            from: 'galleryschemas',
            localField: 'lot._id',
            foreignField: 'lotId',
            as: 'galleries',
         },
      },
      // // Stage 5: Unwind the galleries array
      {
         $unwind: '$galleries',
      },
      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            minprice: { $first: '$lot.minprice' },
            details: { $first: '$lot.details' },
            dealerId: { $first: '$dealer._id' },
            dealerName: { $first: '$dealer.Name' },
            dealerProfile: { $first: '$dealer.profileimgsrc' },
            auctionheadId: { $first: '$_id' }, // Include the auctionhead ID
            auctionheadDate: { $first: '$date' }, // Include the auctionhead date
            auctionheadToken: { $first: '$token' }, // Include the auctionhead date
            galleries: { $push: '$galleries' },
         },
      },
   ])
   console.log(dailyreport)
   res.send({ dailyreport })
})

//Report of Auction by Lot

app.get('/LotReportData/:Id', async (req, res) => {

   const Id = new mongoose.Types.ObjectId(req.params.Id); // Convert dealer ID to ObjectId


   const lotreport = await Auctionbody.aggregate([
      // Stage 1: Match lots with the current date

      // Stage 2: Lookup auctionheads for each lot
      {
         $match: {
            'auctionheadId': Id
         }
      },



      {
         $lookup: {
            from: 'auctionheadschemas',
            localField: 'auctionheadId',
            foreignField: '_id',
            as: 'auctionHead',
         },
      },

      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$auctionHead',
      },

      {
         $lookup: {
            from: 'lotschemas',
            localField: 'auctionHead.lotId',
            foreignField: '_id',
            as: 'lot',
         },
      },
      {
         $unwind: '$lot',
      },

      {
         $lookup: {
            from: 'userschemas',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
         },
      },

      // // // Stage 3: Filter lots with associated auctionheads
      {
         $unwind: '$user',
      },


      // // Stage 6: Group by lotId to reconstruct the galleries array
      {
         $group: {
            _id: '$_id',
            name: { $first: '$lot.name' },
            price: { $first: '$lot.price' },
            realPrice: { $first: '$lotauctionbodyprice' },
            details: { $first: '$lot.details' },
            auctionHeadId: { $first: '$auctionHead._id' },
            userProfile: { $first: '$user.photo' },
            userName: { $first: '$user.name' },
            auctionheadDate: { $first: '$auctionHead.date' }, // Include the auctionhead date
            auctionheadToken: { $first: '$auctionHead.token' }, // Include the auctionhead date
         },
      },
   ])
   console.log(lotreport)
   res.send({ lotreport })
})

// const calculateCountdown = () => {
//    try {
//       const currentDateIST = moment().utcOffset('+05:30')

//       // Set the target time for starting the countdown (10:00 AM IST)
//       const startTime = currentDateIST
//          .clone()
//          .set({ hour: 10, minute: 0, second: 0, millisecond: 0 })

//       // Set the target time for ending the countdown (8:00 PM IST)
//       const endTime = currentDateIST
//          .clone()
//          .set({ hour: 20, minute: 0, second: 0, millisecond: 0 })

//       // If the current time is before 10:00 AM or after 8:00 PM, return '00:00:00'
//       if (
//          currentDateIST.isAfter(startTime) &&
//          currentDateIST.isBefore(endTime)
//       ) {
//          io.sockets.emit('auctionButton')

//          return '00:00:00' // Return 00:00:00 as the countdown until the appropriate time

//       }

//       if (currentDateIST.day() === 0 && currentDateIST.isBefore(endTime)) {
//          return '00:00:00' // Return 00:00:00 as the countdown until the appropriate time
//       }
//       const auctionStartTime = currentDateIST
//          .clone()
//          .set({ hour: 10, minute: 0, second: 0, millisecond: 0 })
//       if (currentDateIST.isAfter(auctionStartTime)) {
//          auctionStartTime.add(1, 'days') // Move to the next day
//          // If the next day is Sunday, move the auction start time to the following day
//          if (auctionStartTime.day() === 0) {
//             auctionStartTime.add(1, 'day')
//          }
//       }

//       const countdown = moment.duration(auctionStartTime.diff(currentDateIST))

//       const formattedCountdown = `${countdown
//          .hours()
//          .toString()
//          .padStart(2, '0')}:${countdown
//          .minutes()
//          .toString()
//          .padStart(2, '0')}:${countdown.seconds().toString().padStart(2, '0')}`

//       return formattedCountdown
//    } catch (error) {
//       console.error(error)
//    }
// }

// const emitCountdown = () => {
//    const countdown = calculateCountdown() // Replace this with your countdown calculation logic
//    io.sockets.emit('auctionTimerFormServer', { countdown })
// }
// emitCountdown() // Replace this with your countdown calculation logic

// //  socket
// io.on('connection', (socket) => {})

// setInterval(emitCountdown, 1000) // Update the countdown every second
const dateCurrent = moment().format('YYYY-MM-DD')

const calculateCountdown = async () => {
   try {
      const currentDateUTC = moment().utcOffset('+05:30')
      const startTime = currentDateUTC.clone().startOf('day').add({ hours: 10 })

      const AuctionAvailable = await Auctionhead.countDocuments({
         __v: 0,
         date: dateCurrent,
      })
      // console.log(AuctionAvailable);

      if (currentDateUTC.isAfter(startTime) && AuctionAvailable !== 0) {
         io.sockets.emit('auctionButton')
         return '00:00:00'
      }

      const auctionStartTime = startTime.clone()
      if (currentDateUTC.isAfter(auctionStartTime)) {
         auctionStartTime.add({ days: 1 })
         if (auctionStartTime.day() === 0) {
            auctionStartTime.add({ days: 1 })
         }
      }
      // console.log(auctionStartTime.day());
      // console.log(currentDateUTC);

      if (auctionStartTime.day() === 0) {
         // If it's still Sunday, adjust to Monday
         auctionStartTime.add({ days: 1 })
      }

      const countdown = moment.duration(auctionStartTime.diff(currentDateUTC))
      // console.log(countdown);
      const formattedCountdown = `${countdown
         .hours()
         .toString()
         .padStart(2, '0')}:${countdown
            .minutes()
            .toString()
            .padStart(2, '0')}:${countdown.seconds().toString().padStart(2, '0')}`

      return formattedCountdown
   } catch (error) {
      console.error(error)
      return '00:00:00' // Return default value in case of error
   }
}

const emitCountdown = async () => {
   const countdown = await calculateCountdown()
   io.sockets.emit('auctionTimerFormServer', { countdown })
}
let countdownTimer // Variable to store the countdown timer

io.on('connection', (socket) => {
   socket.on('smallCountDownFromClient', async ({ price, Id, uid }) => {
      let pricedata = 0
      const largestPrice = await Auctionbody.find({ auctionheadId: Id })
         .sort({ lotauctionbodyprice: -1 }) // Sort in descending order to get the highest price first
         .limit(1) // Limit the result to 1 document
      if (largestPrice.length === 0) {
         const lotData = await Auctionhead.findById({ _id: Id }).populate(
            'lotId'
         )
         const priceFromLot = parseInt(lotData.lotId.price)
         pricedata = priceFromLot + price
         let insertData = new Auctionbody({
            lotauctionbodyprice: pricedata,
            userId: uid,
            auctionheadId: Id,
         })

         await insertData.save()
      } else {
         const priceFromAutionBody = largestPrice[0].lotauctionbodyprice
         pricedata = priceFromAutionBody + price
         let insertData = new Auctionbody({
            lotauctionbodyprice: pricedata,
            userId: uid,
            auctionheadId: Id,
         })

         await insertData.save()
      }
      let count = 10 // Initial countdown value

      // Function to emit countdown updates to the client
      const emitCountdownSmall = async () => {
         // const AuctionAvailable = await Auctionhead.countDocuments({__v:0,date:dateCurrent})

         io.sockets.emit('smallCountDownFromServer', {
            count,
            pricedata,
            Userid: uid,
         }) // Emit countdown value to the client
         count-- // Decrement countdown value
         if (count >= 0) {
            countdownTimer = setTimeout(emitCountdownSmall, 1000) // Schedule next update after 1 second (1000 milliseconds)
         }
         if (count === 0) {
            const updatedAuctionhead = await Auctionhead.findByIdAndUpdate(
               Id,
               {
                  price: pricedata,
                  userId: uid,
                  __v: 1,
               },
               { new: true }
            )
         }
      }
      if (countdownTimer) {
         clearTimeout(countdownTimer)
      }

      emitCountdownSmall() // Start the countdown
   })
})

setInterval(emitCountdown, 1000)
