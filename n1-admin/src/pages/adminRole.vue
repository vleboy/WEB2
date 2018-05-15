<template>
  <div class="adminrole">
    <p class="create">
      <Button type="primary" @click="addRole">创建新角色</Button>
    </p>
    <Table :columns="columns" :data="subRoleList" size="small" no-data-text="暂无数据"></Table>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { getsbuRole, subRoleDelete } from "../service/index";
export default {
  data() {
    return {
      dayjs: dayjs,
      subRoleList: [],
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80
        },
        {
          title: "角色名",
          key: "name",
          maxWidth: 160,
        },
        {
          title: "权限",
          key: "",
          render: (h, params) => {
            let tags = params.row.permissions;
            return h(
              "div",
              tags.map(item => {
                return h("Tag", item);
              })
            );
          }
        },
        {
          title: "创建时间",
          key: "",
          maxWidth: 180,
          render: (h, params) => {
            return h(
              "span",
              this.dayjs(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "备注",
          key: "",
          maxWidth:60,
          render: (h, params) => {
            let remark = params.row.remark;
            let result = Object.prototype.toString.call(remark);
            if (result.includes("String")) {
              return h(
                "Tooltip",
                {
                  props: {
                    content: remark
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "search",
                      color: "#20a0ff"
                    }
                  })
                ]
              );
            } else {
              return h("span", "");
            }
          }
        },
        {
          title: "操作",
          key: "",
          maxWidth:120,
          render: (h, params) => {
            return h("p", [
              h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer",
                    paddingRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(1);
                    }
                  }
                },
                "编辑"
              ),
              h("span", "|"),
              h(
                "span",
                {
                  style: {
                    color: "#20a0ff",
                    cursor: "pointer",
                    paddingLeft: "5px"
                  },
                  on: {
                    click: () => {
                      let name = params.row.name;
                      this.$Modal.confirm({
                        title: "提示",
                        content: "<p>此操作将永久删除该角色, 是否继续?</p>",
                        onOk: () => {
                          subRoleDelete({ name: name }).then(res => {
                            if (res.code == 0) {
                              getsbuRole().then(res => {
                                if (res.code == 0) {
                                  this.subRoleList = res.payload.Items;
                                }
                              });
                            }
                          });
                        },
                        onCancel: () => {
                          this.$Message.info('已取消')
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    addRole() {
      this.$router.push({ name: "createRole" });
    }
  },
  beforeCreate() {
    getsbuRole().then(res => {
      if (res.code == 0) {
        this.subRoleList = res.payload.Items;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.adminrole {
  min-height: 89vh;
  .create {
    margin-bottom: 20px;
  }
}
</style>
