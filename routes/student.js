dotify = require('node-dotify');

get = (req, res, next) => {
    console.log(req.query.name);

    var query;
    if (req.query.name) {
        query = req.models.student.findOne({ 'students.name': req.query.name });
    } else {
        query = req.models.student.find();
    }

    query
        .exec()
        .then(student => {
            return res.send(student);
        })
        .catch(error => next(error));
};

post = (req, res, next) => {
    req.models.student.create({
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
        .then(student => {
            return res.status(201).send(student);
        })
        .catch(error => {
            next(error);
        });
};

getById = (req, res, next) => {
    req.models.student.findById(req.params.id)
        .then(student => {
            return res.send(student);
        })
        .catch(error => next(error));
};

deleteById = (req, res, next) => {
    req.models.student.findByIdAndDelete(req.params.id)
        .then(deleted => {
            if (deleted) return res.send(deleted).status(200);
            res.sendStatus(204);
        })
        .catch(error => next(error));
};

put = (req, res, next) => {
    req.models.student.updateOne(
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
    req.models.student.findByIdAndUpdate(
        req.params.id,
        {
            $set: dotify(req.body)
        },
        {
            returnNewDocument: true
        }
    )
        .then(student => {
            console.log(student);
            res.send(student);
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



