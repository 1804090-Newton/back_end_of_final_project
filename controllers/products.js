import Products from '../models/Products.js'

export const getAllProd = async ( req, res, next ) => {
    try {
        if (req.query.sort === 'date') {
            const prods = await Products.find().limit(parseInt(req.query.perPage)).skip(parseInt(req.query.page*req.query.perPage)).sort({updatedAt: -1})
            res.json(prods)
        } else if (req.query.sort === 'name') {
            const prods = await Products.find().limit(parseInt(req.query.perPage)).skip(parseInt(req.query.page*req.query.perPage)).sort({productName: 1})
            res.json(prods)
        } else if (req.query.sort === 'price') {
            const prods = await Products.find().limit(parseInt(req.query.perPage)).skip(parseInt(req.query.page*req.query.perPage)).sort({price: 1})
            res.json(prods)
        } else {
            const prods = await Products.find().limit(parseInt(req.query.perPage)).skip(parseInt(req.query.page * req.query.perPage))
            res.json(prods)
        }
    } catch (err) {
        next(err)
    }
}

export const getProdById = async( req, res, next) => {
    try {
        const prod = await Products.findById(req.params.id)
        res.json(prod)
    } catch (err) {
        next(err)
    }
}

export const postProd = async ( req, res, next ) => {
    try {
        const postProd = new Products(req.body)
        const newProd = await postProd.save()
        res.json(newProd)
    } catch (err) {
        next(err)
    }
}

export const updateProd = async(req, res, next) => {
    try {
        const prod = await Products.findByIdAndUpdate(req.params.id, { $set: req.body } )
        const updatedProd = await prod.save()
        res.json(updatedProd)
      } catch (err) {
        next(err)
    }
}

export const deleteProd = async(req, res, next) => {
    try {
        await Products.findByIdAndDelete( req.params.id )
        res.json({message: 'product data deleted'})
      } catch (err) {
        next(err)
    }
}