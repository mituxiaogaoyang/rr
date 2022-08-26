<template>
  <div id="noticeDetail">
    <div class="title2">{{typeName + '数据库'}}</div>
    <div class="line">
        标题 ：
        <el-input v-model="title" autocomplete="off"></el-input>
    </div>
    <div class="line">
        <div class="word">序号</div>
        <el-input-number v-model="sort"  :min="1" label="排序"></el-input-number>
    </div>
    <div class="line">
        内容：
        <rich-text :content="contentText" ref="richText2"></rich-text>
    </div>
    <div class="btn_box">
        <el-button plain @click="cancelAdd">取消</el-button>
        <el-button type="primary" plain @click="submitNotice">确认</el-button>
        <!-- <el-button type="warning" plain @click="submitNews(1)">发布</el-button> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import {getDatabaseDetail,addDatabase, updateDatabase} from '@/apis/home';
import richText from '../app/richTextSingle.vue';
export default {
  name: "databaseDetail",
  components: {richText},
  data() {
    return {
      title: '',
      contentText:'',
      sort:'',
      typeName: '新增',
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if(id) {
      this.typeName = '编辑';
      this.getDatabaseDetail(id);
    }else{
      this.typeName = '新增';
    }
  },
  methods: {
    getDatabaseDetail(id){
      getDatabaseDetail(id).then(res =>{
        this.title = res.data.name;
        this.contentText = res.data.content;
        this.sort = res.data.sort;
      })
    },
    submitNotice(){
      const name = this.title;
      const sort = this.sort;
      const content = this.$refs.richText2.editorContent;
      const id = this.$route.query.id;
      if(name &&  content){
        if(id){ //update
          updateDatabase({content,name,id,sort}).then(res =>{
              this.$message.success('修改成功');
              this.$router.go(-1);
          });
        }else{
          addDatabase({content,name,sort}).then(res =>{
              this.$message.success('新添成功');
              this.$router.go(-1);
          });
        }
      }
    },
    cancelAdd(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" >
#noticeDetail{
  padding:20px;
  .title2{
    color:#000;
    margin:15px 0 30px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .line{
    margin:15px 0;
  }
}
</style>
