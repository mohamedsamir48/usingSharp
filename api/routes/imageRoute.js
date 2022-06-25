const router = require("express").Router();
const sharp = require("sharp");
const images = require("../imagesData")

router.get("/:id", async(req, res) =>{
    if(req.query.width & req.query.height){
       const image =  {...[ await images.find(img => img.id == parseInt(req.params.id))]};

      sharp(`./${image[0].img}`)
      .resize({width:parseInt(req.query.width), height:parseInt(req.query.height), cover:"fit"})
      .toFile(`resized_${image[0].img}`)
        .then((img)=>{console.log(img); res.sendFile(`resized_${image[0].img}`,{root:'./'})})
      .catch((err) => {console.log(err);res.status(400).json(err)})
      res
          
        }else{
        res.status(400).json("You must write width and                                           ")
    }
});
router.post("/uploadfile", async(req, res) =>{
    if(req.query.width & req.query.height){

    }
})

module.exports = router;
