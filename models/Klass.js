import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
const Klass = mongoose.model('Klass',
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            require: true,
            validate: {
                validator: () => this.name.lenght > 3,
                message: 'Class name must be at least 4 character. Eg: C2111'
            }
        }
    })
)
export default Klass