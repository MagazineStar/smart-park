<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header content="查看月卡" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form label-width="100px" :model="carInfoForm">
            <el-form-item label="车主姓名">
              <el-input v-model="carInfoForm.personName" :disabled="true" />
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="carInfoForm.phoneNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="车辆号码">
              <el-input v-model="carInfoForm.carNumber" :disabled="true" />
            </el-form-item>
            <el-form-item label="企业联系人">
              <el-input v-model="carInfoForm.carBrand" :disabled="true" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form :model="feeInfoForm" label-width="100px">
            <el-form-item label="有效日期">
              <el-date-picker
                v-model="feeInfoForm.payTime"
                disabled
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy/MM/dd"
              />
            </el-form-item>
            <el-form-item label="支付金额">
              <el-input v-model="feeInfoForm.paymentAmount" :disabled="true" />
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="feeInfoForm.paymentMethod" disabled>
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
  </div>
</template>

<script>
import { getCarDetailAPI } from '@/api/card'

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
      // 月卡信息
      feeInfoForm: {
        payTime: [],
        paymentAmount: '',
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
      ]
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    this.getCarDetail()
  },
  methods: {
    async getCarDetail() {
      const { data } = await getCarDetailAPI(this.id)
      console.log(data)
      const { personName, phoneNumber, carNumber, carBrand } = data
      this.carInfoForm = { personName, phoneNumber, carNumber, carBrand }
      const { cardEndDate, cardStartDate, paymentAmount, paymentMethod } = data
      this.feeInfoForm = {
        payTime: [cardStartDate, cardEndDate],
        paymentAmount,
        paymentMethod
      }
      console.log(paymentAmount)
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
}

</style>
