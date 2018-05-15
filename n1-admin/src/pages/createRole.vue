<template>
    <div class="createRole">
        <section class="create">
            <h2>创建角色</h2>
            <Form ref='createRole' :model="admin" :label-width="80">
                <FormItem label="创建角色" prop="name">
                    <Row>
                        <Col span="20">
                        <Input v-model="admin.name" placeholder="输入创建角色名称"></Input>
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
                <Button type="primary" @click="createNew">确认创建</Button>
                <Button type="primary" class="reset" @click="reset">重置</Button>
            </div>
        </section>
    </div>
</template>
<script>
import {subRoleNew} from '../service/index'
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
          children: [
            {
              title: "个人中心",
              expand: true
            },
            {
              title: "输赢报表",
              expand: true,
              children: [
                {
                  title: "公司输赢总报表"
                },
                {
                  title: "NA游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "NA游戏总报表"
                    },
                    {
                      title: "NA电子游戏报表"
                    },
                    {
                      title: "NA街机游戏报表"
                    },
                    {
                      title: "NA棋牌游戏报表"
                    },
                    {
                      title: "NA真人游戏报表"
                    }
                  ]
                },
                {
                  title: "TTG游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "TTG游戏报表"
                    }
                  ]
                },
                {
                  title: "SA游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "SA游戏总报表"
                    },
                    {
                      title: "SA真人游戏报表"
                    },
                    {
                      title: "SA捕鱼游戏报表"
                    }
                  ]
                },
                {
                  title: "MG游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "MG电子游戏报表"
                    }
                  ]
                },
                {
                  title: "AG游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "AG真人游戏报表"
                    }
                  ]
                },
                {
                  title: "UG游戏报表",
                  expand: true,
                  children: [
                    {
                      title: "UG体育游戏报表"
                    }
                  ]
                }
              ]
            },
            {
              title: "商户中心",
              expand: true,
              children: [
                {
                  title: "线路商列表"
                },
                {
                  title: "商户列表"
                }
              ]
            },
            {
              title: "管理员中心",
              expand: true,
              children: [
                {
                  title: "管理员列表"
                },
                {
                  title: "线路号列表"
                },
                {
                  title: "管理员角色列表"
                }
              ]
            },
            {
              title: "日志中心",
              expand: true,
              children: [
                {
                  title: "线路商登录日志"
                },
                {
                  title: "商户登录日志"
                },
                {
                  title: "管理员操作日志"
                },
                {
                  title: "DEBUG日志"
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
      let permissions=[];
      for(let item of trees){
        permissions.push(item.title)
      }
      subRoleNew({
        ...this.admin,
        permissions:permissions
      }).then(res=>{
        if(res.code==0){
          this.$Message.success('创建成功')
          this.$router.push({name:'adminRole'})
        }
      })
    },
    reset(){
      this.$refs['createRole'].resetFields();
    }
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

