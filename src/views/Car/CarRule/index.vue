<template>
  <div class="rule-container">
    <div class="create-container">
      <el-button type="primary" @click="addFeeRule">增加停车计费规则</el-button>
      <el-button @click="exportExcel">导出Excel</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table :data="ruleList" style="width: 100%">
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="计费规则编号" prop="ruleNumber" />
        <el-table-column label="计费规则名称" prop="ruleName" />
        <el-table-column label="免费时长(分钟)" prop="freeDuration" />
        <el-table-column label="收费上线(元)" prop="chargeCeiling" />
        <el-table-column label="计费方式" prop="chargeType">
          <template #default="{ row }">
            {{ formateChargeType(row.chargeType) }}
          </template>
        </el-table-column>
        <el-table-column label="计费规则" prop="ruleNameView" />
        <el-table-column label="操作" fixed="right" width="120">
          <!-- <template #default="scope"> -->
          <template>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagecs">
        <el-pagination
          :page-size="params.pageSize"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <AddRule :dialog-visible.sync="dialogVisible" @getList="getRuleList" />
  </div>
</template>

<script>
import { getRuleListAPI } from '@/api/carrule'
import { utils, writeFileXLSX } from 'xlsx'
import AddRule from './components/AddRule'
export default {
  name: 'Building',
  components: {
    AddRule
  },
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10
      },
      ruleList: [],
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getRuleList()
  },
  methods: {
    // 增加计费规则
    addFeeRule() {
      this.dialogVisible = true
    },
    // 定义收费类型函数
    formateChargeType(chargeType) {
      const Map = {
        duration: '时常收费',
        turn: '按次收费',
        partition: '分段收费'
      }
      return Map[chargeType]
    },
    // 导出Excel
    async exportExcel() {
      // 调用当前导出数据的接口
      const res = await getRuleListAPI(this.params)
      // 要导出的字段名
      const tableHeaderKeys = ['ruleNumber', 'ruleName', 'freeDuration', 'chargeCeiling', 'chargeType', 'ruleNameView']
      // 要导出的字段值
      const list = res.data.rows.map(item => {
        const obj = {}
        tableHeaderKeys.forEach(key => {
          obj[key] = item[key]
        })
        return obj
      })
      // 要导出的表头（表头字段名一一对应）
      const tableHeaderValues = ['计费规则编号', '计费规则名称', '免费时长(分钟)', '收费上线(元)', '计费方式', '计费规则']
      // 以excel表格的顺序调整后端数据
      // 创建一个新的工作簿
      const workbook = utils.book_new()
      // 创建一个工作表 要求一个对象数组格式
      const worksheet = utils.json_to_sheet(list)
      // 把工作表添加到工作簿  Data为工作表名称
      utils.book_append_sheet(workbook, worksheet, 'Data')
      // 改写表头
      utils.sheet_add_aoa(worksheet, [tableHeaderValues], { origin: 'A1' })
      // 导出方法进行导出
      writeFileXLSX(workbook, 'SheetJSVueAoO.xlsx')
    },
    // 自定义索引
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    // 表格分页点击事件
    handleCurrentChange(data) {
      this.params.page = data
      this.getRuleList()
    },
    async getRuleList() {
      const res = await getRuleListAPI(this.params)
      this.ruleList = res.data.rows
      this.total = res.data.total
    }
  }
}
</script>

<style lang="scss" scoped>
.rule-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
.pagecs{
  margin-top: 20px;
  float: right;
}
.flex-container {
  display: flex;
  justify-content: space-between;
}
.duration, .turn, .partition>.item {
  display: flex;
  justify-content: space-evenly;
}
.partition>.item {
  margin-top: 20px;
}
.input-box {
  width: 160px;
}
</style>
