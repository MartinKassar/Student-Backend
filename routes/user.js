dotify = require('node-dotify');

get = (req, res, next) => {
    console.log(req.query.name);

    var query;
    if (req.query.name) {
        query = req.models.User.findOne({ 'name': req.query.name });
    } else {
        query = req.models.User.find();
    }

    query
        .exec()
        .then(user => {
            return res.send(user);
        })
        .catch(error => next(error));
};

post = (req, res, next) => {
    req.models.User.create({
        students: {
            email: req.body.students.email,
            name: req.body.students.name,
            address: {
                street: req.body.students.address.street,
                zipcode: req.body.students.address.zipcode,
                city: req.body.students.address.city
            }
        }
    })
        .then(user => {
            return res.status(201).send(user);
        })
        .catch(error => {
            next(error);
        });
};

getById = (req, res, next) => {
    req.models.User.findById(req.params.id)
        .then(user => {
            return res.send(user);
        })
        .catch(error => next(error));
};

deleteById = (req, res, next) => {
    req.models.User.findByIdAndDelete({ _id: req.params.id })
        .then(deleted => {
            if (deleted) return res.send(deleted).status(200);
            res.sendStatus(204);
        })
        .catch(error => next(error));
};

put = (req, res, next) => {
    req.models.User.updateOne(
        { _id: req.params.id },
        {
            students: {
                email: req.body.students.email,
                name: req.body.students.name,
                address: {
                    street: req.body.students.address.street,
                    zipcode: req.body.students.address.zipcode,
                    city: req.body.students.address.city
                }

            }
        },
        {
            new: true,
            upsert: true,
            runvalidators: true
        }
    )
        .then(status => {
            console.log('status: ', status);
            if (status.upserted) res.status(201);
            else if (status.nModified) res.status(200);
            else res.status(204);
            res.send();
        })
        .catch(error => next(error));
};

patch = (req, res, next) => {
    req.models.User.findByIdAndUpdate(
        req.params.id,
        {
            $set: dotify(req.body)
        },
        {
            returnNewDocument: true
        }
    )
        .then(user => {
            console.log(user);
            res.send(user);
        })
        .catch(error => next(error));
};

module.exports = {
    get,
    post,
    getById,
    deleteById,
    put,
    patch
};



// students: {
//     "email": "pelle.kanin@ecut.com"
//     "name": "Pelle kanin",
//     "address": {
//        "gata": " Framtidsvägen 10A",
//        "postnummer": "352 57",
//        "ort": "Växjö"   
//        }
//     }
// curl -X POST "localhost:3000/users" -H "accept: application/json" -H "Content-Type: application/json" -d 'students: {
//         "email": "pelle.kanin@ecut.com",
//         "name": "Pelle kanin",
//         "address": {
//            "gata": " Framtidsvägen 10A",
//            "postnummer": "352 57",
//            "ort": "Växjö"   
//            }
//         }' | jq

// curl -X PUT "localhost:3000/users" -H "accept: application/json" -H "Content-Type: application/json" -d '{"students":{"email":"student@mai.com", "name":"Martin", "address":{"street":"Smedsängen", "zipcode":"12231", "city":"växjö"}}}' | jq
