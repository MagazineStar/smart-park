<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ id? '编辑企业' : '添加企业' }}</span>
      </div>
      <div class="right">
        MagazineStar
      </div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <!-- :rules :model v-model prop -->
          <el-form ref="ruleForm" label-width="100px" :model="addForm" :rules="rules">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode">
                <el-option
                  v-for="item in industryList"
                  :key="item.industryCode"
                  :label="item.industryName"
                  :value="item.industryCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseUrl">
              <!-- action 是一个必传属性。 配置的是上传文件的路径。但是不灵活一半不用 -->
              <!-- action 即使不用也需要配置。 如果没配置上传路径，需要用#代替 -->
              <el-upload
                ref="upload"
                class="upload-demo"
                action="#"
                :limit="3"
                :http-request="uploadImage"
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传.png .jpg .jpeg文件，且不超过5M</div>
              </el-upload>
              <img v-if="id" :src="addForm.businessLicenseUrl" style="width: 100px;">
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getIndustryListAPI, addEnterpriseAPI, getEnterpriseDetailAPI, updateExterpriseAPI } from '@/api/enterprise'
import { uploadFile } from '@/api/common'
export default {
  data() {
    return {
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      industryList: [], // 行业列表
      rules: {
        name: [
          { required: true, message: '企业名称为必填', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '法人为必填', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '注册地址为必填', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '所在行业为必填', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '企业联系人为必填', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '企业联系人电话为必填', trigger: 'blur' },
          { pattern: /^\d{11,15}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        businessLicenseUrl: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getIndustryList()
    if (this.id) {
      this.getEnterpriseDetail()
    }
  },
  methods: {
    // 获取企业详情
    async getEnterpriseDetail() {
      const res = await getEnterpriseDetailAPI(this.id)
      this.addForm = res.data
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
      // 清空营业执照相关字段
      this.addForm.businessLicenseUrl = ''
      this.addForm.businessLicenseId = ''
      // 清空上传组件已选择的文件(同样需要单独重置)
      this.$refs.upload.clearFiles()
    },
    // 确认添加，集体验证
    confirmAdd() {
      this.$refs.ruleForm.validate(async(flag) => {
        if (!flag) return
        if (this.id) {
          delete this.addForm.businessLicenseName
          delete this.addForm.industryName
          delete this.addForm.rent
          await updateExterpriseAPI(this.addForm)
          this.$message.success('编辑成功')
          this.$router.push('/park/enterprise')
        } else {
          await addEnterpriseAPI(this.addForm)
            .then(() => {
              this.$message.success('添加成功')
              this.$router.push('/park/enterprise')
            })
            .catch(() => {
              this.$message.error('添加失败')
            })
        }
      })
    },
    // 移除文件判定
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`, '温馨提示').then(() => {
        this.addForm.businessLicenseUrl = ''
        this.addForm.businessLicenseId = ''
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.error('已取消删除')
      })
      // 如果移除文件，则需要将图片id置空
    },
    // 上传文件前校验
    beforeUpload(file) {
      const imageType = ['image/png', 'image/jpeg', 'image/jpg']
      if (!imageType.includes(file.type)) {
        this.$message.warning('图片格式不正确，请上传.png .jpg .jpeg格式的图片')
        this.$refs.upload.clearFiles() // 手动清除文件列表
        return false
      }
      if (file.size / 1024 / 1024 > 5) {
        this.$message.warning('图片大小不能超过5M')
        this.$refs.upload.clearFiles() // 手动清除文件列表
        return false
      }
    },
    // 上传文件
    async uploadImage({ file }) {
      const formData = new FormData()
      // formData追加数据 使用append
      formData.append('file', file)
      formData.append('type', 1)
      const res = await uploadFile(formData)
      this.addForm.businessLicenseId = res.data.id
      this.addForm.businessLicenseUrl = res.data.url
      // 对上传图片进行单独校验
      this.$refs.ruleForm.validateField('businessLicenseUrl')
    },
    // 获取行业列表
    async getIndustryList() {
      const res = await getIndustryListAPI()
      this.industryList = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.add-enterprise {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;
      .title {
        height: 60px;
        line-height: 60px;
        padding-left:20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form{
          display: flex;
          flex-wrap: wrap;
          .el-form-item{
            width: 50%;
          }
        }
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
