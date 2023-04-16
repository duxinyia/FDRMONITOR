<template>
  <el-table-column :label="coloumnHeader.label" :prop="coloumnHeader.label" align="center">
    <template v-for="item in coloumnHeader.children">
      <tableColumn
        v-if="item.children && item.children.length"
        :key="item.id"
        :coloumn-header="item"
      >
      </tableColumn>
      <el-table-column :key="item.name" :label="item.label" :prop="item.prop" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="500" trigger="click">
            <el-table :data="gridData" border height="200px">
              <el-table-column
                width="200"
                property="sn"
                align="center"
                label="SN"
              ></el-table-column>
              <el-table-column
                width="300"
                property="name"
                align="center"
                label="不良名称"
              ></el-table-column>
            </el-table>
            <span slot="reference">{{ scope.row[item.prop] }}</span>
          </el-popover>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "tableColumn",
  props: {
    coloumnHeader: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      gridData: [
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        },
        {
          sn: "DNM3062000K81QDC1X",
          name: "GetDPFileFromMIS（10003-0009）"
        }
      ]
    }
  }
}
</script>

<style scoped></style>
