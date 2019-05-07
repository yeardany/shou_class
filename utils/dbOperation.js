//查询
let getDatum = (tableId, cb) => {
  let Datum = new wx.BaaS.TableObject(tableId),
    query = new wx.BaaS.Query()

  Datum.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

//增加
let addDatum = (ctx, cb) => {

  let tableId = getApp().globalData.tableId,
    Datum = new wx.BaaS.TableObject(tableId),
    Data = Datum.create(),
    bookName = ctx.data.creatingBookName

  let data = {
    bookName,
  }

  Data.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

//修改
let updateDatum = (ctx, cb) => {
  let tableId = getApp().globalData.tableId,
    recordId = ctx.data.curRecordId,
    bookName = ctx.data.editingBookName

  let Datum = new wx.BaaS.TableObject(tableId),
    Data = Datum.getWithoutData(recordId)

  let data = {
    bookName
  }

  Data.set(data)
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