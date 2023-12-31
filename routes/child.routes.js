const router = require("express").Router();
const Child = require("../models/Child.model")
const isAuthenticated = require("../middlewares/isAuthenticated");

// GET /api/child/all/ - Get all children of a specific parent
router.get("/all/", isAuthenticated, async (req, res, next) => {
    // console.log(req.params.parentId)
    try {
        const AllChildsOfParent = await Child.find({ parent: req.payload._id });
        res.json(AllChildsOfParent);
    } catch (error) {
        next(error);
    }
})

//POST /api/child/new/ - Create a new children of a specific parent
router.post("/new/", isAuthenticated, async (req, res, next) => {
    try {
        const newChild = await Child.create({
            name: req.body.name,
            parent: req.payload._id,
            picture: req.body.picture
        });
        // console.log(newChild)
        res.json(newChild);
    } catch (error) {
        next(error);
    }

})

// GET /api/child/:childid - Get information about a specific child
router.get("/:childId", isAuthenticated, async (req, res, next) => {
    try {
        const childInfo = await Child.findById(req.params.childId);
        res.json(childInfo);
    } catch (error) {
        next(error);
    }
})

//DELETE /api/child/:childid - Delete a specific child
router.delete("/:childId", isAuthenticated, async (req, res, next) => {
    try {
        const deletedChild = await Child.findByIdAndDelete(req.params.childId);
        res.json(deletedChild);
    } catch (error) {
        next(error);
    }
})

//PUT /api/child/:childid - Update a specific child
router.put("/:childId", isAuthenticated, async (req, res, next) => {
    try {
        const updatedChild = await Child.findByIdAndUpdate(req.params.childId, {
            name: req.body.name,
            picture: req.body.picture
        }, { new: true });
        res.json(updatedChild);
    } catch (error) {
        next(error);
    }
})


module.exports = router;