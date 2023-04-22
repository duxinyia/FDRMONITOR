export let handlerTableDate = (rows) => {
  let obj = {}
  let tableData = []
  rows.forEach((item) => {
    obj = {}
    item.forEach((val) => {
      obj[val.columnID] = val.value
    })
    tableData.push(obj)
  })
  return tableData
}
