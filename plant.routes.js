const router=require('express').Router(); const Plant=require('../models/Plant');
router.get('/',async(req,res)=>{try{res.json(await Plant.find().sort({name:1}));}catch(e){res.status(500).json({message:'Could not load plants'});}});
router.get('/:id',async(req,res)=>{try{const p=await Plant.findById(req.params.id);if(!p)return res.status(404).json({message:'Plant not found'});res.json(p);}catch(e){res.status(400).json({message:'Invalid plant id'});}}); module.exports=router;
