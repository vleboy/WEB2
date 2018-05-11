<template>
    <div class="addLineMerchant">
        <Row>
            <Col span="12">
            <div class="basic">
                <h2>基本信息</h2>
                <Form ref='addform' :model="basic" :label-width="120" :rules="ruleValidate">
                    <FormItem label="线路商标识" prop="suffix">
                        <Row>
                            <Col span="20">
                            <Input v-model="basic.suffix" placeholder="2~6 位,只能输入英文和数字(以字母开头)"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="线路商昵称" prop="adminName">
                        <Row>
                            <Col span="20">
                            <Input v-model="detail.sn" placeholder="2~10 位,只能输入中英文及数字"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="上级线路商" prop="adminName">
                        <Row>
                            <Col span="20">
                            <Select v-model="basic.subRole" placeholder="请选择">
                                <Option v-for="item in subRoleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                        </Row>
                    </FormItem>
                     <FormItem label="初始线路商点数" prop="suffix">
                        <Row>
                            <Col span="20">
                            <Input v-model="basic.suffix" placeholder="请输入"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                     
                    <!-- <FormItem> -->
                    <!-- <Button type="primary" @click="addAdmin('addform')">提交</Button>
          <Button type="primary" class="reset" @click="reset('addform')">重置</Button> -->
                    <!-- </FormItem> -->
                </Form>
            </div>
            <div class="admin">
                <h2>线路商后台管理员</h2>
                 <Form ref='addform' :model="detail" :label-width="110" :rules="ruleValidate">
                    <FormItem label="管理员用户名">
                        <Row>
                            <Col span="20">
                            <Input v-model="basic.white"  placeholder="5~16位,只能输入英文及数字"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="管理员密码">
                        <Row>
                            <Col span="20">
                            <Input v-model="basic.white"  placeholder="6~16位,包含字母、数字及符号中任意三种组合"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="备注" prop="note">
                        <Row>
                            <Col span="20">
                            <Input v-model="basic.note" type="textarea" :rows="4" placeholder="请输入备注,最多不超过200个字符"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
            </Col>
            <Col span="12">
            <div class="detail">
                <h2>线路商信息</h2>
                <Form ref='addform' :model="basic" :label-width="120" :rules="ruleValidate">
                    <FormItem label="线路商拥有的游戏" prop="note">
                        <Row>
                            <Col span="10">
                            <Select v-model="detail.gameType" placeholder="请选择">
                                <Option v-for="item in gameType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                            <Col span="10">
                            <Select v-model="detail.gamelist" placeholder="请选择">
                                <Option v-for="item in gameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <Table :columns="columns" :data="gameDetail" class="table" size="small" no-data-text="暂无数据"></Table>
                </Form>
            </div>
            </Col>
        </Row>
        <Row>
            <div class="btn">
                <Button type="primary">提交</Button>
                <Button type="primary" class="reset">重置</Button>
            </div>
        </Row>
    </div>
</template>
<script>
import { avalibleManager } from "../service/index";
export default {
  data() {
    return {
      basic: {
        suffix: "",
        username: "",
        subRole: "",
        note: ""
      },
      columns: [
        {
          title: "公司",
          key: "company"
        },
        {
          title: "游戏",
          key: "game"
        },
        {
          title: "商家占成",
          key: "rate"
        },
        {
          title: "操作",
          key: "opreate"
        }
      ],
      selected: true,
      detail: {
        balance: "",
        msn: "",
        sn: "",
        gameType: "",
        gamelist: "",
        rate: "",
        white: "",
        httpType: "",
        url: "",
        chargeUrl: "",
        registUrl: "",
        serviceUrl: ""
      },
      game: "",
      gameType: [],
      gameList: [],
      subRoleList: [],
      ruleValidate: {},
      gameDetail: [],
      defaultBrower: ""
    };
  },
  beforeCreate() {
    avalibleManager().then(res => {
      if (res.code == 0) {
        this.subRoleList = res.payload;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.addLineMerchant {
  min-height: 89vh;
  .basic,
  .admin,
  .detail {
    margin: 20px 60px;
    width: 500px;
  }
  .btn {
    width: 250px;
    margin: 0 auto;
    .reset {
      margin-left: 50px;
    }
  }
  .random,
  .add,
  .check,
  .create {
    color: #20a0ff;
    margin-left: 15px;
    cursor: pointer;
  }
  .table {
    margin-bottom: 24px;
  }
}
</style>
