const express = require('express')
const router = new express.Router();
const Confess = require('../models/confess')
const ConfessPublic = require('../models/reviewed')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')

router.get('/main', async (req, res) => {
    const all = await ConfessPublic.find({}).sort({_id:-1})
    try {
    res.status(200).send(all)
    } catch (err) {
    res.status(404).send(err)
    }
})

router.post('/confess', async (req, res) => {
    const confess = new Confess(req.body)
    try {
        await confess.save()
        res.status(200).send('Confession Added')
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/admin-review', auth, async (req, res) => {
    const confess = new ConfessPublic(req.body)
    try {
        await confess.save()
        res.status(200).send('Confession Published')
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/admin-home', auth, async (req, res) => {
    const all = await Confess.find({})
    try {
    res.status(200).send(all)
    } catch (err) {
    res.send(err)
    }
})

// router.post('/login', async (req, res) => {
//     const admin = new Admin(req.body)
//     try {
        
//     } catch (err) {

//     }
// })

router.post('/admin/login', async (req, res) => {
    try {
    const user = await Admin.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (err) {
        res.status(404).send()
    }
})

router.post('/admin/signup', async (req,res) => {
    const user = new Admin(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
        
    }
})

router.delete('/confess/:id', auth, async (req, res) => {

    try {
    const confess = await Confess.findOneAndDelete({_id: req.params.id})
    if (!confess) {
        return res.status(404).send({ 'Error' : 'Not found'})
     }
    res.status(200).send(confess)

    } catch (e) {
     res.status(500).send(e)
    }
})

router.post('/logout', async (req, res) => {

})




module.exports = router;



