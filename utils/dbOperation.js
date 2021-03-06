//查询
let getDatum = (tableId, cb, query) => {
  let Datum = new wx.BaaS.TableObject(tableId)

  Datum.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

//增加
let addDatum = (tableId, data, cb) => {
  let Datum = new wx.BaaS.TableObject(tableId)

  Datum.create().set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

//修改
let updateDatum = (tableId, recordId, key, data, cb) => {
  let Datum = new wx.BaaS.TableObject(tableId),
    Data = Datum.getWithoutData(recordId)

  Data.uAppend(key, data)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

//删除
let deleteDatum = (ctx, cb) => {
  let tableId = getApp().globalData.tableId,
    recordId = ctx.data.curRecordId

  let Datum = new wx.BaaS.TableObject(tableId)

  Datum.delete(recordId)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

module.exports = {
  getDatum,
  addDatum,
  updateDatum,
  deleteDatum
}