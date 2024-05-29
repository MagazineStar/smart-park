<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header :content="id? '编辑月卡' : '新增月卡'" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <!-- 表单校验的四要素 -->
          <!-- 1. el-form :model 对应的值 是表单对应的数据对象 -->
          <!-- 2. el-form :rules 对应的校验规则 -->
          <!-- 3. el-from-item prop 表示要校验哪个字段 -->
          <!-- 4. 表单元素 (el-input,el-checkbox...) v-model -->
          <el-form ref="carInfoForm" label-width="100px" :model="carInfoForm" :rules="carInfoRules">
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form ref="feeInfoForm" :model="feeInfoForm" label-width="100px" :rules="feeFormRules">
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker
                v-model="feeInfoForm.payTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeInfoForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeInfoForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.text"
                />
              </el-select>
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
import { addCardAPI, getCarDetailAPI, editCardAPI } from '@/api/card'
export default {
  data() {
    return {
      // 车辆信息表单
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      // 最新一次月卡缴费信息表单
      feeInfoForm: {
        // 有效日期
        payTime: [],
        // 支付金额
        paymentAmount: '',
        // 支付方式
        paymentMethod: ''
      },
      // 支付方式列表
      payMethodList: [
        {
          text: '支付宝',
          value: 'Alipay'
        },
        {
          text: '微信',
          value: 'Wechat'
        },
        {
          text: '线下',
          value: 'Cash'
        }
      ],
      // 车辆信息表单校验规则
      carInfoRules: {
        personName: [
          { required: true, message: '车主姓名不可为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '联系方式不可为空', trigger: 'blur' },
          // 正则校验
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        carNumber: [
          { required: true, message: '车牌号码不可为空', trigger: 'blur' },
          // 自定义校验 validator:校验方法
          { validator: this.validatorCarNumber, trigger: 'blur' }
        ],
        carBrand: [
          { required: true, message: '车辆品牌不可为空', trigger: 'blur' }
        ]
      },
      // 最新一次月卡缴费信息表单校验规则
      feeFormRules: {
        payTime: [
          { required: true, message: '有效日期不可为空', trigger: 'blur' }
        ],
        paymentAmount: [
          { required: true, message: '支付金额不可为空', trigger: ['blur', 'change'] }
        ],
        paymentMethod: [
          { required: true, message: '支付方式不可为空', trigger: ['blur', 'change'] }
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
    if (this.id) {
      this.getCarDetail()
    }
  },
  methods: {
    // 月卡详情二次封装
    async getCarDetail() {
      const { data } = await getCarDetailAPI(this.id)
      const { personName, phoneNumber, carNumber, carBrand, carInfoId } = data
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand, carInfoId }
      const { cardStartDate, cardEndDate, paymentAmount, paymentMethod, rechargeId } = data
      this.feeInfoForm = {
        payTime: [cardStartDate, cardEndDate],
        paymentAmount,
        paymentMethod,
        rechargeId
      }
    },
    // 重置表单
    resetForm() {
      // 只能清空加了 prop表单域的内容
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeInfoForm.resetFields()
    },
    // 点击校验总体表单
    confirmAdd() {
      this.$refs.carInfoForm.validate((flag) => {
        if (!flag) return
        this.$refs.feeInfoForm.validate(async(flag) => {
          if (!flag) return
          // 全部校验通过
          // 把以上变量对象中的数据合并到下边对象中
          const requestData = {
            ...this.carInfoForm,
            ...this.feeInfoForm,
            cardStartDate: this.feeInfoForm.payTime[0],
            cardEndDate: this.feeInfoForm.payTime[1]
          }
          // 因为接口做了很多校验 多字段不行, 所以提交之前把多余的字段删掉
          delete requestData.payTime
          if (this.id) {
            // 编辑月卡
            await editCardAPI(requestData)
            this.$message.success('月卡编辑成功')
          } else {
            // 新增月卡
            await addCardAPI(requestData)
            this.$message.success('月卡添加成功')
          }
          this.$router.push('/parking/card')
        })
      })
    },
    // rule value callback
    // rule 用不到
    // value 用户输入的数据
    // callback 不管校验成功还是失败都要调用 失败: callback(new Error('错误信息')) 成功: callback()
    validatorCarNumber(rule, value, callback) {
      // 自定义校验规则
      const plateNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/
      if (plateNumber.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的车牌号码'))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
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
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
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
