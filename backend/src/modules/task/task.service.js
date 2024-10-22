const taskModel = require("../../models/task");
const pager = require("../../utils/pager");

async function getAll() {
  return await taskModel.find().populate('user').exec();
}

async function findOneById(_id){
  return await taskModel.findById(_id).exec()
}

async function save(user){
  let _user = new taskModel(user)  
  return await _user.save()
}

async function paginated(params) {
  const perPage = params.perPage? params.perPage : 10;
  const page = Math.max(0, params.page);
  const filter = params.filter ? params.filter : {};
  const sort = params.sort ? params.sort : {};
  
  const count = await taskModel.countDocuments(filter);

  const data = await taskModel.find(filter)
    .sort(sort)
    .skip(perPage * page)
    .limit(perPage)
    .populate('user')
    .exec();
  
  return {
    total: count,
    tasks: data,
    totalPages: Math.ceil(count / perPage),
  };
}
  
async function update(id, updatedUser) {
  return await taskModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
}
  
async function remove(id) {
  return await taskModel.findOneAndDelete({ _id: id }).exec();
}
  

module.exports = { getAll, findOneById, save, paginated, update, remove };