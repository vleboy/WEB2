<template>
    <div class="createRole">
        <section class="create">
            <h2>编辑角色</h2>
            <Form ref='createRole' :model="admin" :label-width="80">
                <FormItem label="角色名称" prop="name">
                    <Row>
                        <Col span="20">
                        <Input v-model="admin.name" disabled placeholder="角色名称"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="角色权限" prop="authority">
                    <Row>
                        <Col span="20">
                        <Tree :data="treeData" show-checkbox ref='tree'></Tree>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="备注" prop="remark">
                    <Row>
                        <Col span="20">
                        <Input v-model="admin.remark" :maxlength='200' type="textarea" class="remark" :rows="4" placeholder="请输入备注(如没有可不填),最多不超过200个字符"></Input>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            <div class="btn">
                <Button type="primary" @click="createNew">保存</Button>
                <!-- <Button type="primary" class="reset" @click="reset">重置</Button> -->
            </div>
        </section>
    </div>
</template>
<script>
import { subRoleUpdate } from "../service/index";
export default {
  data() {
    return {
      admin: {
        name: "",
        remark: ""
      },
      treeData: [
        {
          title: "所有权限",
          expand: true,
          checked: false,
          children: [
            {
              title: "个人中心",
              expand: true,
              checked: false
            },
            {
              title: "输赢报表",
              expand: true,
              checked: false,
              children: [
                {
                  title: "公司输赢总报表",
                  checked: false
                },
                {
                  title: "NA游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "NA游戏总报表",
                      checked: false
                    },
                    {
                      title: "NA电子游戏报表",
                      checked: false
                    },
                    {
                      title: "NA街机游戏报表",
                      checked: false
                    },
                    {
                      title: "NA棋牌游戏报表",
                      checked: false
                    },
                    {
                      title: "NA真人游戏报表",
                      checked: false
                    }
                  ]
                },
                {
                  title: "TTG游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "TTG游戏报表",
                      checked: false
                    }
                  ]
                },
                {
                  title: "SA游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "SA游戏总报表",
                      checked: false
                    },
                    {
                      title: "SA真人游戏报表",
                      checked: false
                    },
                    {
                      title: "SA捕鱼游戏报表",
                      checked: false
                    }
                  ]
                },
                {
                  title: "MG游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "MG电子游戏报表",
                      checked: false
                    }
                  ]
                },
                {
                  title: "AG游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "AG真人游戏报表",
                      checked: false
                    }
                  ]
                },
                {
                  title: "UG游戏报表",
                  expand: true,
                  checked: false,
                  children: [
                    {
                      title: "UG体育游戏报表",
                      checked: false
                    }
                  ]
                }
              ]
            },
            {
              title: "商户中心",
              expand: true,
              checked: false,
              children: [
                {
                  title: "线路商列表",
                  checked: false
                },
                {
                  title: "商户列表",
                  checked: false
                }
              ]
            },
            {
              title: "管理员中心",
              checked: false,
              expand: true,
              children: [
                {
                  title: "管理员列表",
                  checked: false
                },
                {
                  title: "线路号列表",
                  checked: false
                },
                {
                  title: "管理员角色列表",
                  checked: false
                }
              ]
            },
            {
              title: "日志中心",
              expand: true,
              checked: false,
              children: [
                {
                  title: "线路商登录日志",
                  checked: false
                },
                {
                  title: "商户登录日志",
                  checked: false
                },
                {
                  title: "管理员操作日志",
                  checked: false
                },
                {
                  title: "DEBUG日志",
                  checked: false
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    createNew() {
      let trees = this.$refs.tree.getCheckedNodes();
      let permissions = [];
      for (let item of trees) {
        permissions.push(item.title);
      }
      subRoleUpdate({
        ...this.admin,
        permissions: permissions
      }).then(res => {
        if (res.code == 0) {
          this.$Message.success("保存成功");
          this.$router.push({ name: "adminRole" });
        }
      });
    }
    // reset() {
    //   this.$refs["createRole"].resetFields();
    // }
  },
  computed: {
    roleDetail() {
      return this.$store.state.add.subRoleDetail;
    }
  },
  created() {
    let name = this.$store.state.add.name;
    console.log(name);
    this.$store.dispatch("getSubRoleDetail", {
      name: name
    });
    let detail=this.roleDetail;
    console.log(detail);
    this.admin.name=detail.name;
    this.admin.remark=detail.remark;
    let permissions = detail.permissions;
    let treeData=this.treeData[0]
    console.log(permissions);
    console.log(treeData);
    // if(permissions.includes(treeData.title)){
    //   treeData.checked=true;
    // }
  }
};
</script>
<style lang="less" scoped>
.createRole {
  min-height: 89vh;
  .create {
    width: 40rem;
    margin: 0 auto;
    margin-top: 1rem;
    .remark {
      width: 21rem;
    }
    .btn {
      margin-left: 60px;
      .reset {
        margin-left: 100px;
      }
    }
  }
}
</style>

