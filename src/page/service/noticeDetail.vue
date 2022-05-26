<template>
  <div id="noticeDetail">
    <div class="line">
        标题 ：
        <el-input v-model="title" autocomplete="off"></el-input>
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
import {getNoticeDetail,addNotice, updateNotice} from '@/apis/home';
import richText from '../app/richTextSingle.vue';
export default {
  name: "noticeDetail",
  components: {richText},
  data() {
    return {
      title: '',
      contentText:''
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if(id) this.getNoticeDetail(id);
  },
  methods: {
    getNoticeDetail(id){
      const type =  this.$route.query.type;
      getNoticeDetail(id,type).then(res =>{
        this.title = res.data.title;
        this.contentText = res.data.content;
      })
    },
    submitNotice(){
      const title = this.title;
      const content = this.$refs.richText2.editorContent;
      const id = this.$route.query.id;
      const type =  this.$route.query.type;
      if(title &&  content){
        if(id){ //update
          updateNotice({content,title,id},type).then(res =>{
              this.$message.success('修改成功');
              this.$router.go(-1);
          });
        }else{
          addNotice({content,title},type).then(res =>{
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
  .line{
    margin:15px 0;
  }
}
</style>
