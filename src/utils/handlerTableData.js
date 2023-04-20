// export function handlerTableDate() {
//   var timer
//   return function () {
//     var context = this
//     var args = arguments
//     clearTimeout(timer)
//     timer = setTimeout(function () {
//       fn.apply(context, args)
//     }, delay)
//   }
// }

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
