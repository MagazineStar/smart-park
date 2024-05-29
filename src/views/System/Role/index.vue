<template>
  <div class="role-container">
    <div class="left-wrapper">
      <div
        v-for="(item, index) in roleList"
        :key="item.roleId"
        class="role-item"
        :class="{active: index === activeIndex}"
        @click="menuChange(index)"
      >
        <div class="role-info">
          <svg-icon
            :icon-class="activeIndex === index ? 'user-active' : 'user'"
            class="icon"
          />
          {{ item.roleName }}
        </div>
        <div class="more">
          <el-dropdown>
            <span class="el-dropdown-link">
              <svg-icon icon-class="more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toEdit(item.roleId)">编辑角色</el-dropdown-item>
              <el-dropdown-item @click.native="deleteRole(item.roleId)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-button class="addBtn" size="mini" @click="$router.push('/sys/addRole')">添加角色</el-button>
    </div>
    <div class="right-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="功能权限" name="permisssion">
          <div class="tree-wrapper">
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <div class="tree-title"> {{ item.title }} </div>
              <el-tree
                ref="tree"
                :data="item.children"
                :props="defaultProps"
                :default-expand-all="true"
                node-key="id"
                show-checkbox
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="`成员（${total}）`" name="employee">
          <div class="user-wrapper">
            <el-table
              :data="userList"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="250"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="员工姓名"
              />
              <el-table-column
                prop="userName"
                label="登录账号"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRoleListAPI, getTreeListAPI, getRoleDetailAPI, getRoleUserListAPI, delRoleUserAPI } from '@/api/system'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      activeIndex: 0,
      // 存储所有权限列表
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      activeName: 'permisssion',
      params: {
        page: 1,
        pageSize: 10
      },
      total: 1,
      userList: []
    }
  },
  async created() {
    // 依然是异步任务
    await this.getRoleList()
    await this.getTreeList()
    await this.menuChange(0)
  },
  methods: {
    // 删除角色
    deleteRole(id) {
      this.$confirm('确认删除该角色吗？', '温馨提示').then(async() => {
        await delRoleUserAPI(id)
        this.$message.success('删除成功')
        this.getRoleList()
      }).catch(() => {})
    },
    // 编辑角色,跳转到编辑页
    toEdit(id) {
      this.$router.push({
        path: '/sys/addRole',
        query: {
          id
        }
      })
    },
    // 获取角色成员信息
    async getRoleUserList(roleId) {
      const res = await getRoleUserListAPI(roleId, this.params)
      this.total = res.data.total
      this.userList = res.data.rows
    },
    // 获取角色对应的权限列表
    async getRoleDetail(roleId) {
      return await getRoleDetailAPI(roleId)
    },
    // 获取所有权限列表
    async getTreeList() {
      const res = await getTreeListAPI()
      this.treeList = res.data
      this.addDisabledProp(this.treeList)
    },
    // 递归调用添加禁用效果
    addDisabledProp(treeList) {
      treeList.forEach(item => {
        item.disabled = true
        if (item.children) {
          this.addDisabledProp(item.children)
        }
      })
    },
    // 点击高亮事件
    async menuChange(index) {
      this.activeIndex = index
      // 设置选中节点
      const roleId = this.roleList[index].roleId
      const res = await this.getRoleDetail(roleId)
      const perms = res.data.perms
      // 遍历数组并选中节点
      this.$refs.tree.forEach((tree, index) => {
        tree.setCheckedKeys(perms[index])
      })
      // 获取角下的成员信息
      this.getRoleUserList(roleId)
    },
    // 获取所有角色
    async getRoleList() {
      const res = await getRoleListAPI()
      this.roleList = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding:20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn{
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
        padding: 0px 4px;
        text-align: center;
        .tree-title {
          background: #f5f7fa;
          text-align: center;
          padding: 10px 0;
          margin-bottom: 12px;
        }
      }
    }

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper{
      padding:20px;
    }
  }
}
</style>
