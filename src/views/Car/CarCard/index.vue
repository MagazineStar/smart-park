<template>
  <div class="card-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <span class="search-label">车牌号码：</span>
      <el-input v-model="params.carNumber" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">车主姓名：</span>
      <el-input v-model="params.personName" clearable placeholder="请输入内容" class="search-main" />
      <span class="search-label">状态：</span>
      <el-select v-model="params.cardStatus">
        <el-option v-for="item in statusList" :key="item.value" :label="item.text" :value="item.value" />
      </el-select>
      <el-button type="primary" class="search-btn" @click="search">查询</el-button>
    </div>
    <!-- 新增删除操作区域 -->
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/car/addMonthCard')">添加月卡</el-button>
      <el-button @click="batchDeleteCard">批量删除</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column type="index" label="序号" prop="id" :index="indexMethod" />
        <el-table-column label="车主名称" prop="personName" />
        <el-table-column label="联系方式" prop="phoneNumber" />
        <el-table-column label="车牌号码" prop="carNumber" />
        <el-table-column label="车辆品牌" prop="carBrand" />
        <el-table-column label="剩余有效天数" prop="totalEffectiveDate" />
        <el-table-column label="状态" prop="cardStatus" :formatter="formatStatus" />
        <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button size="mini" type="text">续费</el-button>
            <el-button size="mini" type="text" @click="checkCard(scope.row.id)">查看</el-button>
            <!-- 在Vue.js的<el-table>组件中，scope.row是指当前行的数据对象。如果在表格中使用scope.row.id，那么它代表当前行的id属性值。 -->
            <el-button size="mini" type="text" @click="editCard(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="deleteCard(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <!-- current-page： 表示当前页码 -->
      <!-- page-sizes： 可选择的每页页容量 -->
      <!-- page-size： 当前页页容量 page-size 的值通常和 page-sizes 值保持一致-->
      <!-- total: 表示一共有多少页 -->
      <!-- layout: 表示 分页的样式，有 total, sizes, prev, pager, next, jumper -->
      <!-- size-change: 页容量发生变化时, 会触发这个事情 -->
      <!-- current-change: 页码发生变化时， 会触发这个事情 -->
      <el-pagination
        :current-page="params.page"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="params.pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加楼宇 -->
    <el-dialog title="添加楼宇" width="580px">
      <!-- 表单接口 -->
      <div class="form-container">
        <!-- <el-form ref="addForm" :model="addForm" :rules="addFormRules">
          <el-form-item label="楼宇名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="楼宇层数" prop="floors">
            <el-input v-model="addForm.floors" />
          </el-form-item>
          <el-form-item label="在管面积" prop="area">
            <el-input v-model="addForm.area" />
          </el-form-item>
          <el-form-item label="物业费" prop="propertyFeePrice">
            <el-input v-model="addForm.propertyFeePrice" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCardListAPI, deleteCardAPI } from '@/api/card'
export default {
  name: 'Card',
  data() {
    return {
      // 获取月卡列表的传参
      params: {
        page: 1,
        pageSize: 10,
        carNumber: '',
        personName: '',
        cardStatus: null
      },
      // 接收月卡列表数据
      list: [],
      // 接收总条数
      total: 0,
      // 状态列表
      statusList: [
        {
          text: '全部',
          value: null
        },
        {
          text: '可用',
          value: 0
        },
        {
          text: '已过期',
          value: 1
        }
      ],
      // 用户选择的数据
      selectionVal: []
    }
  },
  created() {
    this.getCardList()
    // console.log('你好', this.params)
  },
  methods: {
    // 查看月卡
    checkCard(id) {
      this.$router.push({
        path: '/car/checkMonthCard',
        query: {
          id
        }
      })
    },
    // 批量删除月卡
    batchDeleteCard() {
      if (this.selectionVal.length <= 0) {
        this.$message.warning('请选择你要删除的月卡')
        return
      }
      const ids = this.selectionVal.map(item => {
        return item.id
      })
      this.$confirm('确认要删除这些月卡吗？', '温馨提示').then(async() => {
        await deleteCardAPI(ids)
        this.$message.success('删除成功')
        this.getCardList()
      }).catch(() => {})
    },
    // 用户选择的数据
    handleSelectionChange(val) {
      this.selectionVal = val
    },
    // 删除月卡
    deleteCard(id) {
      this.$confirm('确认删除该月卡吗？', '温馨提示').then(async() => {
        await deleteCardAPI(id)
        this.$message.success('删除成功!')
        // 如果删除的是最后一条数据, 获取列表时 应该让page--
        if (this.list.length === 1 && this.params.page > 1) {
          this.params.page--
        }
        this.getCardList()
      }).catch(() => {})
    },
    // 编辑月卡
    editCard(id) {
      // console.log(id)
      this.$router.push({
        path: '/car/addMonthCard',
        query: {
          // 使用query属性来传递查询参数。查询参数是附加在URL路径后面的键值对，用于向目标页面传递数据。以下是一个简单的例子来说明如何使用query属性：
          id
        }
      })
    },
    // 点击查询
    search() {
      this.params.page = 1
      this.getCardList()
    },
    // 计算序号
    indexMethod(index) {
      // 当前页之前所有数据+index+1
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    // 页容量发生变化
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getCardList()
    },
    // 页码发生变化
    handleCurrentChange(val) {
      this.params.page = val
      this.getCardList()
    },
    // 获取月卡列表
    async getCardList() {
      const res = await getCardListAPI(this.params)
      this.list = res.data.rows
      this.total = res.data.total
      // console.log(this.list)
    },
    // 格式化状态
    formatStatus(row, column, cellValue, index) {
      // 第一种
      // if (cellValue === 1) {
      //   return '已过期'
      // }
      // if (cellValue === 0) {
      //   return '可用'
      // }
      // 第二种
      // switch (cellValue) {
      //   case 1:
      //     return '已过期'
      //   case 0:
      //     return '可用'
      // }
      // 第三种
      const Map = {
        0: '可用',
        1: '已过期'
      }
      return Map[cellValue]
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
  background-color: #fff;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  padding-bottom: 20px;

  .search-main {
    width: 220px;
    margin-right: 10px;
  }

  .search-btn {
    margin-left: 20px;
  }
}

.create-container {
  margin: 10px 0px;
}

.page-container {
  padding: 4px 0px;
  text-align: right;
}

.form-container {
  padding: 0px 80px;
}
</style>
