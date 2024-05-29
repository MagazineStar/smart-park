<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.name" clearable placeholder="请输入内容" class="search-main" @clear="search" />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="create-container">
      <el-button v-permission="'park:enterprise:add_edit'" type="primary" @click="$router.push('/addEnterprise')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="list" @expand-change="expandChange">
        <el-table-column type="expand">
          <template #default="scope">
            <el-table :data="scope.row.rentList">
              <el-table-column label="租赁楼宇" width="320" prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime">
                <template #default="time">
                  {{ time.row.startTime }} 至 {{ time.row.endTime }}
                </template>
              </el-table-column>
              <el-table-column label="合同状态" prop="status">
                <template #default="status">
                  <el-tag :type="formatInfoType(status.row.status)">
                    {{ formatStarts(status.row.status) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template #default="renOut">
                  <el-button v-permission="'park:rent:add_surrender'" size="mini" type="text" :disabled="renOut.row.status === 3" @click="rentingOut(renOut.row.id)">退租</el-button>
                  <el-button v-permission="'park:rent:remove'" size="mini" type="text" :disabled="renOut.row.status !== 3" @click="deleteRent(renOut.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" :index="indexMethod" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column label="联系电话" prop="contactNumber" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-permission="'park:rent:add_surrender'" size="mini" type="text" @click="addContract(scope.row.id)">添加合同</el-button>
            <el-button v-permission="'park:enterprise:query'" size="mini" type="text" @click="$router.push(`/checkEnterprise/${scope.row.id}`)">查看</el-button>
            <el-button v-permission="'park:enterprise:add_edit'" size="mini" type="text" @click="toEditPage(scope.row.id)">编辑</el-button>
            <el-button v-permission="'park:enterprise:remove'" size="mini" type="text" @click="delEnterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <!-- total和page-size是必须要配置的 总页数 = total/page-size -->
      <!-- @current-change 必须配置 切换页码用 -->
      <el-pagination
        layout="total, prev, pager, next"
        :current-page="params.page"
        :page-size="params.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹窗区域 -->
    <!-- title控制左上角的文本 -->
    <!-- visible：控制弹框的显示隐藏 -->
    <!-- close时间：弹框关闭时触发的事件 -->
    <el-dialog title="添加合同" :close-on-click-modal="false" :visible.sync="dialogVisible" width="600px" @close="closeDialog">
      <div class="form-container">
        <el-form ref="addForm" :model="rentForm" :rules="rentRules" label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in rentBuildingList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker
              v-model="rentForm.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="租赁合同" prop="contractId">
            <el-upload
              ref="upload"
              action="#"
              :http-request="httpRequest"
              :before-upload="beforeUpload"
              :limit="1"
              :on-exceed="onExceed"
              :on-remove="onRemove"
            >
              <el-button size="small" type="primary" plain>上传合同文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx .pdf, 文件大小不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getEnterpriseListAPI, deleteEnterpriseAPI, getRentBuildingAPI, addRentAPI, getEnterpriseRentBuildingAPI, outRentAPI, deleteEnterpriseRentAPI } from '@/api/enterprise'
import { uploadFile } from '@/api/common'
export default {
  name: 'Enterprise',
  data() {
    return {
      params: {
        name: '',
        page: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      dialogVisible: false, // 控制弹窗显示隐藏
      rentForm: {
        buildingId: null, // 楼宇id
        startTime: [], // 开始时间
        endTime: [], // 结束时间
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业id
        contractId: null, // 合同id
        type: 0, // 合同类型
        rentTime: []
      },
      rentRules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        rentTime: [
          { required: true, message: '请选择租赁日期', trigger: 'change' }
        ],
        contractId: [
          { required: true, message: '请选择合同', trigger: 'change' }
        ]
      },
      rentBuildingList: [], // 楼宇列表
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 禁用过去的日期
        }
      }
    }
  },
  created() {
    this.getEnterpriseList()
  },
  methods: {
    // 删除合同
    deleteRent(id) {
      this.$confirm('确认删除该合同？', '温馨提示').then(async() => {
        await deleteEnterpriseRentAPI(id)
        this.$message.success('删除成功')
        this.getEnterpriseList()
      }).catch(() => {})
    },
    // 退租
    rentingOut(id) {
      this.$confirm('确定要退租吗？', '温馨提示').then(async() => {
        await outRentAPI(id)
        this.$message.success('退租成功')
        this.getEnterpriseList()
      }).catch(() => {})
    },
    // 格式化tag类型
    formatInfoType(status) {
      const MAP = {
        0: 'warning',
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      // return 格式化之后的中文显示
      return MAP[status]
    },
    // 格式化状态
    formatStarts(status) {
      const Map = {
        0: '待生效',
        1: '生效中',
        2: '已到期',
        3: '已退租'
      }
      return Map[status]
    },
    // 展开行或关闭都会触发的事件
    // row是当前展开或关闭哪一行的数据
    // expandedRows所有展开行的数据
    async expandChange(row, expandedRows) {
      // 判断当前状态是打开还是关闭
      const isInclude = expandedRows.find(item => item.id === row.id)
      if (!isInclude) return
      const res = await getEnterpriseRentBuildingAPI(row.id)
      // eslint-disable-next-line require-atomic-updates
      row.rentList = res.data
    },
    // 移除上陈合同
    onRemove() {
      this.rentForm.contractUrl = ''
      this.rentForm.contractId = ''
      this.$refs.addForm.validateField('contractId')
    },
    // 确认添加合同
    confirmAdd() {
      this.$refs.addForm.validate(async(filg) => {
        if (!filg) return
        const [startTime, endTime] = this.rentForm.rentTime
        this.rentForm.startTime = startTime
        this.rentForm.endTime = endTime
        delete this.rentForm.rentTime
        // 提交接口
        // console.log(this.rentForm)
        await addRentAPI(this.rentForm)
        this.$message.success('添加成功')
        this.getEnterpriseList()
        // 关闭弹框+数据重置
        this.closeDialog()
      })
    },
    // 超过限制提示
    onExceed() {
      this.$message.warning('文件传输超出最大限制')
    },
    // 上传前的钩子函数
    beforeUpload({ type, size }) {
      const upType = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf'
      ]
      const result = upType.includes(type)
      const upSize = size / 1024 / 1024 < 5
      if (result && upSize) {
        return true
      } else {
        this.$message.warning('请上传正确的合同文件')
        return false
      }
    },
    // 上传合同
    async httpRequest({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 2)
      const { data: { url, id }} = await uploadFile(formData)
      this.rentForm.contractUrl = url
      this.rentForm.contractId = id
      this.$refs.addForm.validateField('contractId')
    },
    // 点击添加合同
    async addContract(id) {
      this.dialogVisible = true
      const { data } = await getRentBuildingAPI()
      this.rentBuildingList = data
      this.rentForm.enterpriseId = id
    },
    // 点击取消，控制弹窗消失
    closeDialog() {
      this.dialogVisible = false
      // 重置表单
      this.$refs.addForm.resetFields()
      this.rentForm = {
        buildingId: null, // 楼宇id
        startTime: [], // 开始时间
        endTime: [], // 结束时间
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业id
        contractId: null, // 合同id
        type: 0, // 合同类型
        rentTime: []
      }
      this.$refs.upload.clearFiles()
    },
    // 删除企业
    delEnterprise(id) {
      this.$confirm('确认删除该企业吗？', '温馨提示')
        .then(async() => {
          await deleteEnterpriseAPI(id)
          this.$message.success('删除成功')
          if (this.params.page > 1 && this.list.length === 1) {
            this.params.page--
          }
          this.getEnterpriseList()
        }).catch(() => {})
    },
    // 跳转到编辑页面
    toEditPage(id) {
      this.$router.push(
        {
          path: '/addEnterprise',
          query: { id }
        }
      )
    },
    // 查询搜索
    search() {
      // this.params.page = 1 的目的是在用户进行新的搜索时，将页码重置为第一页，以便从第一页开始展示搜索结果。这样可以确保用户每次进行新的搜索时都从第一页开始显示数据，而不会停留在上一次的搜索结果的页码上。
      this.params.page = 1
      this.getEnterpriseList()
    },
    // 配置序号
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pageSize + index + 1
    },
    // 点击切换页码
    handleCurrentChange(val) {
      this.params.page = val
      this.getEnterpriseList()
    },
    // 获取企业列表
    async getEnterpriseList() {
      const res = await getEnterpriseListAPI(this.params)
      // 给列表中的每一个添加一个额外的数据
      this.list = res.data.rows.map(item => {
        return {
          ...item,
          rentList: []
        }
      })
      this.total = res.data.total
    }
  }
}
</script>
<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
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
</style>
